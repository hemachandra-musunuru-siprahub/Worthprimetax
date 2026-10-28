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

/*
 * Delivers an enquiry to the webhook in ENQUIRY_WEBHOOK_URL (for example a Zapier, Make or
 * Formspree endpoint, or the firm's CRM). Until that is set, enquiries are rejected with
 * "not_configured" so visitors are never told a message was sent when it was not.
 */
export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => enquirySchema.parse(input))
  .handler(async ({ data }): Promise<EnquiryResult> => {
    // Quietly accept bot submissions without delivering them.
    if (data.website) return { ok: true };

    const webhookUrl = process.env["ENQUIRY_WEBHOOK_URL"];
    if (!webhookUrl) {
      console.error("Enquiry not delivered: ENQUIRY_WEBHOOK_URL is not set.");
      return { ok: false, error: "not_configured" };
    }

    // A number typed with its own "+" code is kept as written; otherwise the chosen code leads it.
    const dial = getCountryCode(data.phoneCountry)?.dial ?? "";
    const fullPhone = data.phone.startsWith("+") ? data.phone : `${dial} ${data.phone}`.trim();

    const service =
      data.service === OTHER_SERVICE
        ? `Other: ${data.otherService ?? ""}`
        : (SERVICES.find((s) => s.slug === data.service)?.name ?? data.service);
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: fullPhone,
          service,
          message: data.message,
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        console.error(`Enquiry webhook responded with HTTP ${response.status}.`);
        return { ok: false, error: "delivery_failed" };
      }
      return { ok: true };
    } catch (error) {
      console.error("Enquiry webhook request failed.", error);
      return { ok: false, error: "delivery_failed" };
    }
  });
