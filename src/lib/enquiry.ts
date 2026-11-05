import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getCountryCode } from "@/data/countryCodes";
import { SERVICES } from "@/data/services";

/** Dropdown value for a service not in the list; the visitor then describes it in `otherService`. */
export const OTHER_SERVICE = "other";

const serviceSlugs: [string, ...string[]] = [OTHER_SERVICE, ...SERVICES.map((s) => s.slug)];

/**
 * Checks the phone number against the chosen country and returns what is wrong, or null when it
 * looks valid. These are length and prefix checks, not proof the line exists. A number typed
 * with its own "+" code is checked as a full international (E.164) number instead.
 */
function phoneNumberProblem(iso: string, phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (phone.trim().startsWith("+")) {
    return digits.length >= 8 && digits.length <= 15
      ? null
      : "Please enter the full international number (8 to 15 digits).";
  }

  const country = getCountryCode(iso);
  if (!country) return "Please choose a country code.";
  const dialDigits = country.dial.replace(/\D/g, "");

  // United States and Canada: 10 digits; area code and exchange never start with 0 or 1.
  if (iso === "US" || iso === "CA") {
    const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
    if (/^[2-9]\d{2}[2-9]\d{6}$/.test(national)) return null;
    return iso === "US"
      ? "Please enter a valid 10-digit U.S. phone number."
      : "Please enter a valid 10-digit Canadian phone number.";
  }
  // Other "+1 xxx" countries: the dial code already includes the area code.
  if (dialDigits.length === 4 && dialDigits.startsWith("1")) {
    return digits.length === 7 ? null : "Please enter the 7-digit local number.";
  }

  // Elsewhere a leading 0 is the local trunk prefix and is not part of the number.
  const national = digits.replace(/^0/, "");
  if (iso === "IN") {
    return /^[1-9]\d{9}$/.test(national)
      ? null
      : "Please enter a valid 10-digit Indian phone number.";
  }
  if (iso === "AE") {
    return /^\d{8,9}$/.test(national)
      ? null
      : "Please enter a valid UAE phone number (8 or 9 digits).";
  }
  const maxNational = 15 - dialDigits.length;
  return national.length >= 6 && national.length <= maxNational
    ? null
    : "Please enter a valid phone number for the selected country.";
}

/** Shared by the form (instant feedback) and the server function (the real check). */
export const enquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name.")
      .max(100, "Please keep your name under 100 characters."),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email address.")
      .email("Please enter a valid email address.")
      .max(200, "Please keep your email under 200 characters."),
    // ISO country code chosen beside the phone field; its dialling code is added on delivery.
    phoneCountry: z
      .string()
      .refine((iso) => getCountryCode(iso) !== undefined, "Please choose a country code."),
    phone: z
      .string()
      .trim()
      .min(1, "Please enter your phone number.")
      .regex(/^\+?[\d\s().-]+$/, "Use digits, spaces and + ( ) - only."),
    service: z.enum(serviceSlugs, { errorMap: () => ({ message: "Please choose a service." }) }),
    otherService: z.string().trim().max(200, "Please keep this under 200 characters.").optional(),
    message: z
      .string()
      .trim()
      .min(10, "Please add a few words (at least 10 characters).")
      .max(2000, "Please keep your message under 2,000 characters."),
    // Honeypot: hidden from people, so anything typed here came from a bot.
    website: z.string().max(200).optional(),
  })
  .superRefine((data, ctx) => {
    // Only once the number is filled in with allowed characters, so one error shows at a time.
    if (/^\+?[\d\s().-]+$/.test(data.phone)) {
      const problem = phoneNumberProblem(data.phoneCountry, data.phone);
      if (problem) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["phone"], message: problem });
      }
    }
    if (data.service === OTHER_SERVICE && (data.otherService ?? "").length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherService"],
        message: "Please tell us which service you need.",
      });
    }
  });

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryField = Exclude<keyof EnquiryInput, "website">;

export type EnquiryResult =
  { ok: true } | { ok: false; error: "not_configured" | "delivery_failed" };

/** Reads the SMTP settings; returns null if any are missing so we never fake a "sent". */
function readSmtpConfig() {
  const host = process.env["SMTP_HOST"];
  const port = Number(process.env["SMTP_PORT"] ?? "587");
  const user = process.env["SMTP_USER"];
  const pass = process.env["SMTP_PASS"];
  const to = process.env["ENQUIRY_TO_EMAIL"] ?? user;
  if (!host || !user || !pass || !to || !Number.isInteger(port)) return null;
  return { host, port, user, pass, to };
}

// Visitor input goes into headers (subject, reply-to name); strip line breaks so it can't inject headers.
const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

type SmtpConfig = NonNullable<ReturnType<typeof readSmtpConfig>>;
type Address = { name: string; email: string };
type Mail = {
  from: Address;
  to: Address | string;
  replyTo: Address | string;
  subject: string;
  text: string;
};
type Mailer = { send: (mail: Mail) => Promise<void>; close: () => Promise<void> };

const SMTP_TIMEOUT_MS = 10_000;

/*
 * The site is built for two hosts: Lovable runs it on Cloudflare Workers, Netlify on Node.
 * Workers can't open raw TCP the Node way, and Node has no `cloudflare:sockets`, so each gets its
 * own SMTP client. Both are imported lazily so neither loads on the other runtime.
 * One connection serves both emails, so the visitor isn't kept waiting for a second handshake.
 */
async function openMailer(smtp: SmtpConfig): Promise<Mailer> {
  const onWorkers = globalThis.navigator?.userAgent === "Cloudflare-Workers";

  if (onWorkers) {
    const { WorkerMailer } = await import("worker-mailer");
    const mailer = await WorkerMailer.connect({
      host: smtp.host,
      port: smtp.port,
      secure: false,
      startTls: true,
      credentials: { username: smtp.user, password: smtp.pass },
      authType: ["plain", "login"],
      socketTimeoutMs: SMTP_TIMEOUT_MS,
      responseTimeoutMs: SMTP_TIMEOUT_MS,
    });
    return {
      send: ({ replyTo, ...mail }) => mailer.send({ ...mail, reply: replyTo }),
      close: () => mailer.close(),
    };
  }

  const nodemailer = await import("nodemailer");
  const transport = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: false,
    requireTLS: true,
    auth: { user: smtp.user, pass: smtp.pass },
    connectionTimeout: SMTP_TIMEOUT_MS,
    greetingTimeout: SMTP_TIMEOUT_MS,
    socketTimeout: SMTP_TIMEOUT_MS,
  });
  const toNode = (a: Address | string) =>
    typeof a === "string" ? a : { name: a.name, address: a.email };
  return {
    send: async (mail) => {
      await transport.sendMail({
        from: toNode(mail.from),
        to: toNode(mail.to),
        replyTo: toNode(mail.replyTo),
        subject: mail.subject,
        text: mail.text,
      });
    },
    close: async () => transport.close(),
  };
}

/*
 * Emails each enquiry to the firm's helpdesk inbox over SMTP (Mailhostbox).
 * Reply-To is the visitor, so staff can answer straight from their mail client.
 * Plain-text body only, so visitor input is never rendered as HTML.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }): Promise<EnquiryResult> => {
    // Quietly accept bot submissions without delivering them.
    if (data.website) return { ok: true };

    const smtp = readSmtpConfig();
    if (!smtp) {
      console.error("Enquiry not delivered: SMTP_* settings are not set.");
      return { ok: false, error: "not_configured" };
    }

    // A number typed with its own "+" code is kept as written; otherwise the chosen code leads it.
    const dial = getCountryCode(data.phoneCountry)?.dial ?? "";
    const fullPhone = data.phone.startsWith("+") ? data.phone : `${dial} ${data.phone}`.trim();

    const service =
      data.service === OTHER_SERVICE
        ? `Other: ${data.otherService ?? ""}`
        : (SERVICES.find((s) => s.slug === data.service)?.name ?? data.service);
    let mailer: Mailer | undefined;
    try {
      mailer = await openMailer(smtp);
      await mailer.send({
        from: { name: "WorthPrime Website", email: smtp.user },
        to: smtp.to,
        replyTo: { name: oneLine(data.name), email: data.email },
        subject: `New enquiry: ${oneLine(service)} - ${oneLine(data.name)}`,
        text: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${fullPhone}`,
          `Service: ${service}`,
          `Submitted: ${new Date().toISOString()}`,
          "",
          "Message:",
          data.message,
        ].join("\n"),
      });
    } catch (error) {
      console.error("Enquiry email failed to send.", error);
      await mailer?.close().catch(() => undefined);
      return { ok: false, error: "delivery_failed" };
    }

    // The helpdesk has the enquiry now, so a failed confirmation is logged but not shown as a failure.
    // Fixed wording, without the visitor's message, so the form can't be used to send spam to others.
    try {
      await mailer.send({
        from: { name: "WorthPrime Tax", email: smtp.user },
        to: { name: oneLine(data.name), email: data.email },
        replyTo: smtp.to,
        subject: "We've received your enquiry - WorthPrime Tax",
        text: [
          `Hello ${oneLine(data.name)},`,
          "",
          `Thank you for contacting WorthPrime Tax about ${oneLine(service)}.`,
          "We've received your enquiry and a member of our team will get back to you soon.",
          "",
          "If you need to add anything, simply reply to this email.",
          "",
          "Kind regards,",
          "WorthPrime Tax",
        ].join("\n"),
      });
    } catch (error) {
      console.error("Enquiry confirmation email failed to send.", error);
    } finally {
      await mailer.close().catch(() => undefined);
    }
    return { ok: true };
  });
