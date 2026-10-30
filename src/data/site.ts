export const LINKS = {
  pay: "https://worthprimetax.com/Payment.aspx",
  login: "https://worthprimetax.com/Login.aspx",
  irs: "https://sa.www4.irs.gov/irfof/lang/en/irfofgetstatus.jsp",
  linkedin: "https://www.linkedin.com/company/worthprime-tax-legal-and-compliance-services-inc/",
  phone: "+1 (646) 798-3907",
  phoneHref: "tel:+16467983907",
  email: "helpdesk@worthprimetax.com",
  whatsapp: "https://wa.me/16467983907",
};

/** LinkedIn links and icons stay hidden until the client supplies a real profile URL above. */
/**
 * Production origin for canonical tags, the sitemap, Open Graph URLs and structured data. Change it
 * here only. worthprimetax.com still serves the old site until the domain is moved to this one.
 */
export const SITE = {
  url: "https://worthprimetax.com",
  name: "WorthPrime Tax",
  // [NEED: client-approved 1200x630 social sharing image; the hero photo stands in until then]
  socialImageAlt: "WorthPrime Tax advisers at work",
};

export const HAS_LINKEDIN = LINKS.linkedin.startsWith("http");

export const OFFICES = [
  {
    label: "Headquarter (USA)",
    region: "United States",
    address: "2389 Main St, Ste. 100, Glastonbury, CT 06033",
  },
  {
    label: "Branch Office (UAE)",
    region: "United Arab Emirates",
    address: "The Meydan Hotel, Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, UAE",
  },
  {
    label: "Branch Office (India)",
    region: "India",
    address:
      "Victory plaza, Sabza Colony, Brindavan Colony, Toli Chowki, Hyderabad, Telangana 500008",
  },
];

export const TRUST_PHRASES = [
  "One stop",
  "Integrated",
  "Precise",
  "Year-round",
  "U.S. tax",
  "Accounting",
  "Compliance",
  "Perspective",
];

// USP figures from the client's content document.
export const STATS = [
  {
    value: 1000,
    prefix: "",
    suffix: "+",
    label: "Services/Tickets Prepared Since 2019",
  },
  { value: 150, prefix: "", suffix: "+", label: "IRS Notices Resolved" },
  { value: 500, prefix: "", suffix: "+", label: "Satisfied Customers" },
  {
    value: 20,
    prefix: "",
    suffix: "",
    label: "Audits/Reviews a Year on Average, Facilitating Private Equity Funding",
  },
];

export const REASONS = [
  {
    title: "Expertise That Makes Complexity Easier.",
    body: "Our experience spans tax, accounting, payroll, audit, business formation and compliance. We apply that breadth not simply to complete a task, but to understand the context in which the task matters.",
  },
  {
    title: "Compliance With Commercial Perspective",
    body: "Regulatory compliance is fundamental. But good professional advice should also recognise the commercial realities behind the numbers—cash flow, growth, structure, operations and long-term objectives.",
  },
  {
    title: "A Broader View of Tax",
    body: "We look beyond the immediate filing. Whether the matter involves an LLC, C Corp, S Corp, Partnership, Form 1040, Form 1120, Form 1120S or Form 1065, we consider the wider implications of the position.",
  },
  {
    title: "Built Around the Client",
    body: "No two businesses carry the same structure, priorities or obligations. Our approach is therefore deliberately considered—shaped around the circumstances, requirements and objectives of each engagement.",
  },
];

export const PROCESS = [
  {
    title: "Talk to Us",
    body: "Share your situation, entity type and the filings or notices in front of you.",
  },
  {
    title: "Scope and Quote",
    body: "We confirm what the work involves, who it affects and what it will cost before anything begins.",
  },
  {
    title: "We Do the Work",
    body: "Preparation, review and filing handled with the wider tax and accounting picture in mind.",
  },
  {
    title: "Stay Compliant",
    body: "Year-round support for deadlines, notices and the decisions that follow.",
  },
];

/** Home page contact section, beside the enquiry form. */
export const HOME_CONTACT = {
  heading: "Questions to resolve.",
  headingAccent: "Decisions to make.",
  intro: "We’re here to help—connect with us, we’re just a click away...",
  replyNote: "You’ll hear from us within one business day",
};

export const FAQ_INTRO =
  "Find quick answers to common questions about our U.S. tax services, process, pricing and more.";

export const FAQS = [
  {
    q: "How Much Does It Cost?",
    a: "Fees depend on entity type, the number of filings and the scope of work. Audits start from $5,000. Every other engagement is quoted after a short conversation.",
  },
  {
    q: "Who Do You Work With?",
    a: "U.S. individuals, entrepreneurs and businesses—from a first Form 1040 to C Corps, S Corps and partnerships with payroll and cross-border reporting.",
  },
  {
    q: "I Have Received an IRS Notice. What Now?",
    a: "Send it to us before you respond. We review what is being requested, why it was raised and prepare a structured response with the supporting documentation.",
  },
  {
    q: "How Do I Share My Documents?",
    a: "Securely, through our client portal, after we confirm exactly which records are needed for your engagement.",
  },
  {
    q: "When Should I Start?",
    a: "Earlier is better. Structure, bookkeeping and payroll decisions made before year end shape the filing that follows.",
  },
];

export type Insight = {
  slug: string;
  tag: "Tax" | "Compliance" | "Accounting";
  /** ISO date, shown as e.g. "Oct 15, 2026". */
  date: string;
  title: string;
  excerpt: string;
  body: string[];
  takeaways: string[];
  /** Closing call to action; links to the named service page, or the contact form when absent. */
  cta: { label: string; serviceSlug?: string };
};

export const INSIGHTS: Insight[] = [
  {
    slug: "key-us-tax-changes-2026",
    tag: "Tax",
    date: "2026-10-15",
    title: "Key U.S. Tax Changes for 2026 and What They Mean for You",
    excerpt:
      "A practical overview of important tax updates and how individuals and businesses can prepare.",
    body: [
      "Stay informed about U.S. tax developments that may affect your personal finances or business operations. Understanding changes to tax rules, deductions, credits, and filing requirements can help you prepare for tax season and make informed financial decisions.",
      "Our tax specialists help individuals and businesses understand their filing obligations, organize financial records, and identify applicable tax considerations.",
    ],
    takeaways: [
      "Review your tax planning strategy for the 2026 tax year.",
      "Keep income records and supporting documents organized.",
      "Evaluate applicable deductions and credits with a qualified tax professional.",
      "Plan ahead for filing deadlines and estimated tax obligations.",
    ],
    cta: { label: "Plan Your Taxes With WorthPrime", serviceSlug: "us-tax-services" },
  },
  {
    slug: "strengthening-compliance-changing-regulatory-landscape",
    tag: "Compliance",
    date: "2026-10-08",
    title: "Strengthening Compliance in a Changing Regulatory Landscape",
    excerpt: "Insights on evolving IRS requirements and best practices for maintaining compliance.",
    body: [
      "Tax and regulatory compliance requires careful documentation, timely reporting, and an understanding of applicable requirements. Businesses operating across jurisdictions may face additional responsibilities involving financial reporting, tax filings, and regulatory disclosures.",
      "A structured compliance process helps reduce errors, improve recordkeeping, and prepare organizations for questions from regulatory authorities.",
    ],
    takeaways: [
      "Maintain accurate financial and business records.",
      "Review filing obligations regularly.",
      "Identify reporting requirements relevant to your business structure.",
      "Seek professional guidance when regulations or circumstances change.",
    ],
    cta: { label: "Strengthen Your Compliance Process" },
  },
  {
    slug: "year-end-accounting-checklist-us-businesses",
    tag: "Accounting",
    date: "2026-10-01",
    title: "Year-End Accounting Checklist for U.S. Businesses",
    excerpt: "Key steps to close the year, stay compliant and start the next year with confidence.",
    body: [
      "Year-end accounting is an opportunity to review financial performance, reconcile accounts, and prepare for the next reporting period. Completing these tasks early can help businesses identify discrepancies and organize the documentation needed for tax preparation.",
      "A consistent closing process also gives business owners a clearer picture of cash flow, expenses, and financial obligations.",
    ],
    takeaways: [
      "Reconcile bank and credit card statements.",
      "Review outstanding invoices and accounts payable.",
      "Verify payroll records and related tax documentation.",
      "Organize receipts, expense records, and supporting documents.",
      "Review financial statements before closing the books.",
    ],
    cta: { label: "Prepare for Year-End With WorthPrime", serviceSlug: "accounting-bookkeeping" },
  },
];

export function getInsight(slug: string) {
  return INSIGHTS.find((a) => a.slug === slug);
}

/** Reading time in whole minutes (at about 200 words a minute), never less than one. */
export function insightReadMinutes(insight: Insight) {
  const words = [...insight.body, ...insight.takeaways].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatInsightDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const ABOUT_STORY = {
  label: "How We Started?",
  heading: "Built on Experience. Shaped by Perspective.",
  body: "Behind every enduring enterprise lies a confluence of sound structure, considered decisions and discerning professional counsel. WorthPrime Tax was shaped by precisely that philosophy—bringing together the complementary expertise of its co-founders, with extensive experience across accounting, taxation, audit, payroll, legal and compliance services spanning the U.S., UAE and India.",
};

export const FOUNDERS = [
  {
    name: "Abuzer Ahmed Siddiqui",
    title: "Co-Founder",
    credential: "Qualified Company Secretary (ICSI) · 15+ years · Ex-PwC and Deloitte",
    summary:
      "Brings extensive experience across corporate advisory, compliance and business structuring, with a strong focus on client-centric solutions.",
    bio: [
      "A Qualified Company Secretary from ICSI, Abuzer brings more than 15 years of multifaceted experience across accounting, taxation, payroll, due diligence, legal and compliance services, with professional exposure at PwC and Deloitte across the U.S., UAE and India. His expertise extends across U.S. Corporate Tax, U.S. Payroll, Middle East Corporate Tax and VAT, alongside the incorporation and dissolution of businesses across these jurisdictions.",
      "His experience has shaped a leadership perspective grounded in strategic thinking, adaptability and decisive execution. Having led pilot projects and worked with teams exceeding 100 professionals, he has developed a distinctive understanding of building operations from the ground up, refining processes and scaling them with purpose.",
      "His entrepreneurial journey found its defining expression in the co-founding of WorthPrime Tax in 2020—an endeavour shaped by years of professional insight and a conviction that financial and compliance services should be more connected, accessible and commercially relevant. Today, he brings that vision to the firm through an approach defined by intellectual curiosity, composure and a steadfast commitment to creating meaningful value for businesses and individuals.",
    ],
  },
  {
    name: "Jafiruddin Mohammad",
    title: "Co-Founder",
    credential: "Certified Public Accountant · 15 years · Ex-PwC and PepsiCo",
    summary:
      "Combines deep expertise in audit, accounting, financial planning and tax, with an entrepreneurial perspective to help clients grow with confidence.",
    bio: [
      "A Certified Public Accountant with 15 years of experience across audit, accounting, financial planning and tax, Jafiruddin brings a distinctive blend of institutional discipline and entrepreneurial perspective to WorthPrime Tax. His professional journey includes management roles with global organisations such as PwC and PepsiCo, where he gained extensive experience across financial strategy, reporting and regulatory compliance.",
      "His transition from global corporate environments to entrepreneurship was driven by a desire to translate that experience into practical, commercially relevant financial guidance. This journey culminated in the co-founding of WorthPrime Tax in 2020, establishing a professional practice shaped by both corporate perspective and entrepreneurial agility.",
      "Today, he draws upon a wealth of institutional experience while retaining the agility and entrepreneurial conviction of a growing firm—delivering thoughtful, high-quality financial solutions and advisory services shaped around the evolving needs of businesses and individuals.",
    ],
  },
];

export type ClientReview = {
  name: string;
  /** Star rating exactly as shown on Google (1–5). */
  rating: number;
  /** Review text copied verbatim from Google; omitted for star-only ratings. */
  text?: string;
};

/*
 * Home page "What clients say" section. Only verified data goes here: reviews copied verbatim
 * from the Google Business Profile, the profile's own rating and count, the client-supplied
 * video, and credentials the client has confirmed. Anything left null or empty renders as a
 * clearly marked placeholder instead.
 */
export const CLIENT_EXPERIENCE = {
  label: "Client Experience",
  heading: "What Clients",
  headingMuted: "Say.",
  google: {
    title: "Google Reviews",
    subtitle: "Real Feedback From Our Clients",
    // From the WorthPrime Tax Google Business Profile (Victory Plaza, Hyderabad), checked
    // 21 Oct 2026. Update these and `reviews` whenever the profile changes.
    rating: 5.0 as number | null,
    reviewCount: 4 as number | null,
    // Opens the business's reviews panel on Google (checked: redirects to its Google listing).
    reviewsUrl: "https://search.google.com/local/reviews?placeid=ChIJu7DvWxWXyzsRebXJXP4isaI",
    writeReviewUrl:
      "https://search.google.com/local/writereview?placeid=ChIJu7DvWxWXyzsRebXJXP4isaI",
    ratingPlaceholder: "[Rating and review count from Google, client to supply]",
  },
  // Copied exactly as published on Google. A fourth 5-star review exists but was not visible
  // in Google's public view; add it here once its author and text can be read.
  reviews: [
    { name: "Rkives Worthy", rating: 5, text: "Very reliable and reasonable compliance services." },
    { name: "Nazrul", rating: 5 },
    { name: "MOHI", rating: 5 },
  ] as ClientReview[],
  // Placeholder cards shown while `reviews` is empty, so the carousel layout can be reviewed.
  reviewPlaceholders: 3,
  video: {
    title: "One-Minute Video Testimonial",
    body: "Hear directly from one of our clients about their experience working with WorthPrime Tax.",
    src: null as string | null, // [video file or URL, client to supply]
    pendingNote: "[Video, client to supply]",
  },
};

export type Certification = {
  /** Key of the badge image in the home page's logo map; null shows a monogram. */
  logo: "irs" | "aicpa" | null;
  monogram: string;
  issuer: string;
  name: string;
  status: string;
  /** Flip to true only once the client has confirmed the credential. */
  confirmed: boolean;
};

export const CERTIFICATIONS: Certification[] = [
  {
    logo: null,
    monogram: "QB",
    issuer: "Intuit",
    name: "QuickBooks Certified ProAdvisor",
    status: "Certified",
    confirmed: false,
  },
  {
    logo: null,
    monogram: "X",
    issuer: "Xero",
    name: "Certified Advisor",
    status: "Certified",
    confirmed: false,
  },
  {
    logo: "irs",
    monogram: "IRS",
    issuer: "IRS",
    name: "Authorized E-File Provider",
    status: "Authorized",
    confirmed: false,
  },
  {
    logo: "aicpa",
    monogram: "AICPA",
    issuer: "AICPA",
    name: "Member Firm",
    status: "Member",
    confirmed: false,
  },
];

/** Home page "Starting from, before scope." pricing section. */
export const HOME_PRICING = {
  label: "Pricing",
  heading: "Starting From,",
  headingMuted: "Before Scope.",
  intro:
    "Indicative starting prices to help you plan. Final pricing may vary depending on your specific requirements and scope of work.",
  cta: "See the Full Price Chart",
  priceLabel: "Starting From",
  /** Shown for services whose price is not confirmed yet. */
  pendingPrice: "Price TBC",
};

export const CONTACT_PAGE = {
  title: "Contact WorthPrime Tax | Talk to Our Tax Team",
  description:
    "Call, email or WhatsApp WorthPrime Tax, or send an enquiry. Offices in Glastonbury (USA), Dubai (UAE) and Hyderabad (India).",
  label: "Contact",
  heading: "From Setup to Success,",
  headingMuted: "We’re With You.",
  intro:
    "Questions to resolve. Decisions to make. We’re here to help—connect with us, we’re just a click away.",
  cta: "Talk to WorthPrime Tax",
  highlights: [
    { title: "Quick Response", text: "You’ll hear from us within one business day" },
    { title: "Trusted Experts", text: "U.S. Tax & Compliance Specialists" },
    { title: "Global Support", text: "Serving clients worldwide" },
  ],
  detailsHeading: "Contact Details",
  detailsIntro: "Reach out to our offices or connect with us directly.",
};

export const PRICING_PAGE = {
  title: "Pricing | WorthPrime Tax",
  description:
    "Starting-from prices for WorthPrime Tax's U.S. tax, accounting, payroll, audit and compliance services. Final fees depend on scope.",
  label: "Pricing",
  heading: "Transparent Pricing.",
  headingMuted: "Trusted Expertise.",
  intro:
    "Every engagement is quoted after a short conversation about your entity, filings and the work involved. The chart below shows where each service starts.",
  highlights: [
    { title: "Clear & Transparent", text: "No Hidden Fees" },
    { title: "Experienced Team", text: "U.S. Tax & Compliance Specialists" },
    { title: "Nationwide Support", text: "Serving Clients Across the U.S." },
  ],
  chartNote:
    "Audits are available to clients across U.S. states. Final fees depend on the complexity and scope of each service.",
};

export const INSIGHTS_PAGE = {
  title: "Insights | WorthPrime Tax",
  description:
    "Articles and updates from WorthPrime Tax on U.S. tax, accounting and compliance for individuals and businesses.",
  label: "Insights",
  heading: "Perspective on",
  headingMuted: "What Comes Next.",
  feedNote: "[These will later be fed from LinkedIn posts]",
  latestHeading: "Latest Articles",
  topicsHeading: "Explore by Topic",
  latestIntro:
    "Stay informed with the latest insights on U.S. tax, accounting and compliance to help you make confident decisions.",
  linkedinHeading: "Get New Insights on LinkedIn",
  linkedinText:
    "Follow WorthPrime Tax on LinkedIn for practical insights on U.S. taxation, accounting, business compliance, and financial planning.",
  linkedinCta: "Follow WorthPrime Tax",
  disclaimer:
    "This content is for general informational purposes only and does not constitute tax, legal, or accounting advice. Tax rules and filing requirements depend on individual circumstances and applicable law. Consult a qualified professional regarding your situation.",
};

/** Large closing CTA band, shown near the foot of every page. */
export const CTA_BAND = {
  label: "From Setup to Success, We're With You",
  heading:
    "Whatever the next financial decision looks like, make it with perspective. From Setup to Success, We’re With You.",
  intro: "Tax guidance, business support, and financial clarity—built around you.",
  primary: "Talk to a Tax Expert",
  secondary: "Explore Our Services",
  points: [
    { title: "Trusted", text: "Tax Guidance" },
    { title: "End-to-End", text: "Support" },
    { title: "Personalized", text: "for Individuals & Businesses" },
  ],
};

/** Smaller navy banner (ConsultationBanner); no page shows it now that every page uses CTA_BAND. */
export const CTA_BANNER = {
  label: "From Setup to Success, We're With You",
  heading: "Whatever the Next Financial Decision Looks Like,",
  headingAccent: "Make It With Perspective.",
  button: "Talk to Our Experts",
  caption: "Get a customized quote based on your needs.",
};

// Payment details are copied exactly from the client's current payment section. Do not edit
// without the client's confirmation.
export const PAYMENT_PAGE = {
  title: "Payment Methods | WorthPrime Tax",
  description: "Pay WorthPrime Tax by Zelle or PayPal. Cards accepted, no PayPal account needed.",
  // Page copy below follows the client's payment page design (2026-10-23).
  label: "Secure & Convenient",
  heading: "Pay Us",
  headingAccent: "Through",
  or: "OR",
  intro: "Choose the payment method that works best for you.",
  features: [
    { title: "Secure Transactions", text: "Your payment information is safe with us." },
    { title: "Multiple Payment Options", text: "Choose the method that suits you." },
    { title: "Need Help?", text: "Contact our support team for any payment related questions." },
  ],
  zelle: {
    label: "Zelle ID:",
    id: "helpdesk@worthprimetax.com",
    qrAlt:
      "Zelle QR code for WorthPrime Tax, Legal and Compliance Services. Scan with your banking app to send money with Zelle.",
  },
  paypal: {
    alt: "Secure payments by PayPal. Visa, Mastercard, Discover and American Express accepted. No PayPal account needed.",
    newTab: "(opens PayPal in a new tab)",
    // Supplied by the client on 2026-10-23. It carries session-style parameters
    // (flowlogging_id, mfid); [NEED: confirm with client this checkout link stays valid].
    href: "https://www.paypal.com/webapps/shoppingcart?flowlogging_id=f271965d6dfee&mfid=1792731901054_f271965d6dfee#/checkout/openButton",
  },
};

export type LegalSection = {
  heading: string;
  body: string[];
  /** Optional bullet list shown after the body paragraphs. */
  list?: string[];
  /** Optional paragraph shown after the list. */
  after?: string;
};

export type LegalPage = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  /** Heading of the contact card at the end of the page. */
  contactHeading: string;
};

/*
 * Privacy Policy and Terms of Use. [placeholder: general wording written for the site build; the
 * client must have the final text reviewed by their legal adviser before launch, and confirm the
 * effective date and governing law.]
 */
export const PRIVACY_PAGE: LegalPage = {
  title: "Privacy Policy | WorthPrime Tax",
  description:
    "How WorthPrime Tax collects, uses, shares and protects the personal information of visitors and clients.",
  heading: "Privacy Policy",
  intro:
    "Your trust matters to us. This Privacy Policy explains how WorthPrime Tax collects, uses, shares and protects personal information when you visit our website or use our services.",
  updated: "[date TBC]",
  contactHeading: "Questions About Your Privacy?",
  sections: [
    {
      heading: "Who We Are",
      body: [
        "WorthPrime Tax (“WorthPrime”, “we”, “us” or “our”) provides U.S. tax, accounting, payroll, compliance and advisory services to individuals and businesses, with offices in the United States, the United Arab Emirates and India.",
        "This policy applies to personal information we collect through this website, through enquiries and correspondence, and in the course of providing our services.",
      ],
    },
    {
      heading: "Information We Collect",
      body: ["Depending on how you interact with us, we may collect the following information:"],
      list: [
        "Contact details, such as your name, email address, phone number and postal address.",
        "Identification and tax information, such as taxpayer identification numbers, filing history and the documents you provide for tax preparation or compliance work.",
        "Financial and business information, such as income, accounts, payroll and entity records needed to deliver a service.",
        "Enquiry details, such as the service you are interested in and the message you send us.",
        "Technical information, such as your browser type, device, IP address and the pages you visit on this website.",
      ],
    },
    {
      heading: "How We Use Your Information",
      body: ["We use personal information only for legitimate business purposes, including to:"],
      list: [
        "Respond to enquiries and provide quotes.",
        "Prepare, review and file returns, reports and other documents on your behalf.",
        "Communicate with you about your engagement, deadlines and requirements.",
        "Meet our legal, regulatory and professional obligations, including record keeping.",
        "Maintain, secure and improve our website and services.",
      ],
    },
    {
      heading: "How We Share Your Information",
      body: [
        "We do not sell or rent your personal information. We share it only where necessary, for example:",
      ],
      list: [
        "With government and tax authorities, such as the IRS, when you engage us to file or correspond on your behalf.",
        "With trusted service providers who support our operations, such as secure document storage, payment processing and email services, under confidentiality obligations.",
        "Between our offices, where needed to deliver your engagement.",
        "Where required by law, regulation or legal process, or to protect our rights.",
      ],
    },
    {
      heading: "Data Retention",
      body: [
        "We keep personal information for as long as needed to provide our services and to meet legal, tax and professional record-keeping requirements. When information is no longer required, we delete or anonymise it securely.",
      ],
    },
    {
      heading: "How We Protect Your Information",
      body: [
        "We use administrative, technical and physical safeguards designed to protect personal information against unauthorised access, loss, misuse or alteration. These include access controls, secure transfer methods and confidentiality commitments from our team.",
        "No method of transmission or storage is completely secure, so we cannot guarantee absolute security, but we work continually to protect the information entrusted to us.",
      ],
    },
    {
      heading: "Cookies and Analytics",
      body: [
        "This website may use cookies and similar technologies to keep the site working, remember your preferences and understand how visitors use our pages. You can control or delete cookies through your browser settings; some parts of the site may not work as intended without them.",
      ],
    },
    {
      heading: "International Transfers",
      body: [
        "Because we operate in the United States, the United Arab Emirates and India, your information may be processed in a country other than the one where you live. Where this happens, we take reasonable steps to make sure it remains protected in line with this policy.",
      ],
    },
    {
      heading: "Your Rights and Choices",
      body: ["Subject to applicable law, you may ask us to:"],
      list: [
        "Access the personal information we hold about you.",
        "Correct information that is inaccurate or incomplete.",
        "Delete your information, where we are not required to keep it.",
        "Stop sending you marketing communications.",
      ],
      after:
        "To make a request, contact us using the details below. We may need to verify your identity before responding.",
    },
    {
      heading: "Children’s Privacy",
      body: [
        "Our website is not directed at children under 13, and we do not knowingly collect personal information from them through this website. Information about dependants is collected only from their parent or guardian as part of a tax engagement.",
      ],
    },
    {
      heading: "Changes to This Policy",
      body: [
        "We may update this Privacy Policy from time to time. The latest version will always be published on this page, with the date it was last updated.",
      ],
    },
  ],
};

export const TERMS_PAGE: LegalPage = {
  title: "Terms of Use | WorthPrime Tax",
  description: "The terms that govern your use of the WorthPrime Tax website.",
  heading: "Terms of Use",
  intro:
    "These Terms of Use govern your access to and use of the WorthPrime Tax website. Please read them carefully. By using this website, you agree to these terms.",
  updated: "[date TBC]",
  contactHeading: "Questions About These Terms?",
  sections: [
    {
      heading: "Acceptance of These Terms",
      body: [
        "By accessing or using this website, you confirm that you have read, understood and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use the website.",
      ],
    },
    {
      heading: "Use of This Website",
      body: ["You agree to use this website only for lawful purposes. You must not:"],
      list: [
        "Use the website in a way that breaches any applicable law or regulation.",
        "Attempt to gain unauthorised access to the website, its servers or connected systems.",
        "Introduce viruses or other harmful material, or interfere with the website’s operation.",
        "Copy, scrape or reproduce website content for commercial purposes without our written permission.",
      ],
    },
    {
      heading: "No Professional Advice",
      body: [
        "The content on this website, including articles and insights, is provided for general information only. It does not constitute tax, legal, accounting or financial advice, and should not be relied on as a substitute for advice tailored to your circumstances.",
        "Tax laws and regulations change frequently. Always consult a qualified professional before acting on any information.",
      ],
    },
    {
      heading: "Engagement of Services",
      body: [
        "Using this website or sending an enquiry does not create a client relationship. A professional relationship begins only when we have agreed the scope, fees and terms of an engagement with you in writing.",
      ],
    },
    {
      heading: "Fees and Payments",
      body: [
        "Prices shown on this website are starting prices. Final fees depend on the complexity and scope of each service and are confirmed in writing before work begins. Payments made through the methods listed on our Payment Methods page are subject to the terms of the relevant payment provider.",
      ],
    },
    {
      heading: "Intellectual Property",
      body: [
        "All content on this website, including text, graphics, logos and design, is owned by or licensed to WorthPrime Tax and is protected by intellectual property laws. You may view and print pages for personal, non-commercial use only.",
      ],
    },
    {
      heading: "Third-Party Links",
      body: [
        "This website may link to third-party websites, such as the IRS refund status tool or payment providers. We are not responsible for the content, availability or privacy practices of those websites, and a link does not imply endorsement.",
      ],
    },
    {
      heading: "Disclaimer",
      body: [
        "This website is provided on an “as is” and “as available” basis. While we aim to keep information accurate and up to date, we make no warranties about its completeness, accuracy or availability.",
      ],
    },
    {
      heading: "Limitation of Liability",
      body: [
        "To the fullest extent permitted by law, WorthPrime Tax is not liable for any direct, indirect or consequential loss arising from your use of, or reliance on, this website or its content.",
      ],
    },
    {
      heading: "Governing Law",
      body: [
        "These terms are governed by the laws of [jurisdiction TBC], and any disputes will be subject to the jurisdiction of its courts.",
      ],
    },
    {
      heading: "Changes to These Terms",
      body: [
        "We may update these Terms of Use from time to time. Changes take effect when they are published on this page, so please review it periodically.",
      ],
    },
  ],
};
