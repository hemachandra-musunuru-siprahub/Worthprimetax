export const LINKS = {
  pay: "https://worthprimetax.com/Payment.aspx",
  login: "https://worthprimetax.com/Login.aspx",
  irs: "https://sa.www4.irs.gov/irfof/lang/en/irfofgetstatus.jsp",
  linkedin: "https://www.linkedin.com/company/worthprime-tax-legal-and-compliance-services-inc/",
  instagram: "https://www.instagram.com/worthprimetax/",
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

/**
 * Insights articles come from the company page's LinkedIn posts, read from the data file behind
 * our SociableKIT widget (see src/lib/linkedin-insights.ts). Free plan: a new post reaches the
 * site only after someone clicks Sync in the SociableKIT dashboard.
 */
export const LINKEDIN_FEED = {
  embedId: "25726654",
  /**
   * Festival greetings and staff award/recognition posts are not articles. A post is skipped when a
   * word in it starts with any of these (so "congratulat" matches "congratulations").
   */
  excludeKeywords: [
    // Festivals and holidays
    "eid",
    "mubarak",
    "independence day",
    "republic day",
    "new year",
    "thanksgiving",
    "diwali",
    "christmas",
    "happy holi",
    "ramadan",
    "easter",
    "festival",
    // Staff awards and recognition
    "congratulat",
    "recognition",
    "award",
  ],
  /** Any other post to hide, by its SociableKIT post `id`. */
  excludePostIds: [
    "7399854485201838080", // staff award ("A person with a never-give-up attitude…"), no keyword
  ],
};

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
  /** Every image in the LinkedIn post; the first is the cover. Hand-written articles use INSIGHT_IMAGES. */
  images?: { src: string; alt: string }[];
  /** The original LinkedIn post, linked from the article page. */
  sourceUrl?: string;
};

/**
 * Hand-written articles, shown only when the LinkedIn feed can't be read (see
 * src/lib/linkedin-insights.ts). Live articles come from LinkedIn posts.
 */
export const FALLBACK_INSIGHTS: Insight[] = [
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

/** Reading time in whole minutes (at about 200 words a minute), never less than one. */
/** Below this many words an article page is too thin to help search, so it is kept out of Google. */
const INDEXABLE_MIN_WORDS = 150;

/**
 * Whether search engines should index an article page: only LinkedIn posts with real body text.
 * Hand-written fallback articles are placeholder copy, so they are never indexed.
 */
export function isIndexableInsight(insight: Insight) {
  const words = [insight.excerpt, ...insight.body, ...insight.takeaways].join(" ").split(/\s+/);
  return Boolean(insight.sourceUrl) && words.length >= INDEXABLE_MIN_WORDS;
}

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
    // Served from public/video; the file name's spaces are URL-encoded.
    src: "/video/What%20Clients%20Say..mp4" as string | null,
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
  /** Each entry is shown on its own line. */
  intro: [
    "Indicative starting prices to help you plan.",
    "Final pricing may vary depending on your specific requirements and scope of work.",
  ],
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
  latestHeading: "Latest Articles",
  topicsHeading: "Explore by Topic",
  latestIntro:
    "Stay informed with the latest insights on U.S. tax, accounting and compliance to help you make confident decisions.",
  linkedinHeading: "Get New Insights on LinkedIn",
  linkedinText:
    "Follow WorthPrime Tax on LinkedIn for practical insights on U.S. taxation, accounting, business compliance, and financial planning.",
  linkedinCta: "Follow WorthPrime Tax",
  postCta: "Talk to WorthPrime About This",
  viewOnLinkedIn: "View on LinkedIn",
  galleryHeading: "From the Post",
  // Article page labels [suggested copy].
  backToAll: "All Insights",
  minRead: "min read",
  takeawaysHeading: "Key Takeaways",
  helpHeading: "Have a question about this?",
  helpText: "Talk to WorthPrime Tax about how this applies to your situation.",
  relatedHeading: "More Insights",
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
  /** Optional lead paragraph under the heading. */
  intro?: string;
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
    "How WorthPrime Tax keeps client information confidential and uses it only for the services agreed with each client.",
  heading: "Privacy Policy",
  intro:
    "Client Information Confidentiality, Non-Disclosure and Permitted Use Policy (In accordance with IRC Section 7216, where applicable).",
  contactHeading: "Questions About Your Privacy?",
  sections: [
    // Client-supplied wording.
    {
      heading: "Purpose of Collecting Client Information",
      body: [
        "We collect documents, financial records, personal information, tax-related information, accounting records, and other relevant information from our clients solely for the purpose of providing the professional services requested or agreed upon under our applicable Service Agreements, Engagement Letters, and Non-Disclosure Agreements (NDAs).",
        "Such services may include, but are not limited to:",
      ],
      list: [
        "Tax preparation, tax planning, and tax-related compliance services.",
        "Accounting, bookkeeping, and financial reporting services.",
        "Audit, assurance, and related professional services.",
        "Financial statement preparation and analysis.",
        "Other accounting, taxation, consulting, compliance, or related professional services expressly agreed upon with the client.",
      ],
    },
    {
      heading: "Confidentiality and Non-Disclosure of Client Information",
      body: [
        "We maintain strict confidentiality regarding all information and documents received from our clients. We undertake that client information will not be sold, rented, traded, marketed, or disclosed to any unauthorized third party for commercial, promotional, marketing, or any unrelated purpose.",
        "All client information will be handled exclusively by authorized personnel involved in delivering the contracted services and will be protected through appropriate confidentiality obligations, internal safeguards, and applicable Non-Disclosure Agreements.",
      ],
    },
    {
      heading: "Limited and Authorized Use of Information",
      body: [
        "The information and documents provided by clients shall be used exclusively for the purposes of performing the services requested by the client and agreed upon in the relevant Service Agreement, Engagement Letter, or other contractual arrangement.",
        "We shall not use client information for any unrelated business activity, independent commercial purpose, marketing activity, solicitation, or any purpose outside the scope of the agreed professional engagement, unless expressly authorized by the client or otherwise permitted by applicable law.",
      ],
    },
    {
      heading: "No Unauthorized Third-Party Disclosure",
      body: [
        "We do not disclose or share client information with any external individual, organization, business entity, or third party without the client's prior written authorization, except where such disclosure is required or permitted under applicable laws, regulations, professional obligations, or valid legal or regulatory orders.",
        "Where any disclosure is legally required or otherwise permitted, we shall limit the disclosure to the extent necessary and take reasonable measures to safeguard the confidentiality of the information.",
      ],
    },
    {
      heading: "Compliance with IRC Section 7216",
      body: [
        "Where applicable, we comply with the requirements of Section 7216 of the Internal Revenue Code and the related Treasury Regulations governing the use and disclosure of tax return information.",
        "Tax return information shall not be used or disclosed for purposes other than those authorized by applicable law or regulations, or those specifically authorized through a valid taxpayer consent where such consent is required.",
        "Any disclosure or use requiring taxpayer consent shall be subject to the applicable legal requirements and the appropriate separate consent documentation.",
      ],
    },
    {
      heading: "Data Security and Protection",
      body: [
        "We implement reasonable administrative, technical, and organizational safeguards to protect client information against unauthorized access, misuse, alteration, loss, disclosure, or destruction.",
        "Access to client documents and information shall be restricted to authorized personnel who require such access to perform their assigned professional responsibilities.",
      ],
    },
    {
      heading: "Retention and Disposal of Client Information",
      body: [
        "Client information shall be retained only for the period necessary to fulfill the purposes for which it was collected, comply with applicable legal and regulatory requirements, and satisfy relevant professional record-retention obligations.",
        "Upon expiry of the applicable retention period, information shall be securely disposed of or deleted, subject to any legal requirements to retain such information.",
      ],
    },
    {
      heading: "Our Commitment",
      body: [
        "We respect the confidentiality and privacy of every client. Client information is entrusted to us solely for the purpose of delivering the agreed professional services, and we are committed to protecting that information against unauthorized use or disclosure.",
      ],
    },
  ],
};

export const TERMS_PAGE: LegalPage = {
  title: "Terms of Use | WorthPrime Tax",
  description:
    "How WorthPrime Tax treats the documents and information clients share, under its NDAs and service agreements.",
  heading: "Terms of Use",
  contactHeading: "Questions About These Terms?",
  sections: [
    // Client-supplied wording.
    {
      heading: "Compliance with Non-Disclosure Agreements and Service Agreements",
      body: [
        "All documents, records, and information received from clients shall be treated as confidential and shall be governed by the confidentiality, privacy, and non-disclosure provisions contained in the applicable Non-Disclosure Agreements, Service Agreements, Engagement Letters, and other contractual arrangements executed with the respective clients.",
        "Our personnel and authorized representatives shall be required to maintain the confidentiality of client information and use such information only for the fulfillment of the agreed professional obligations.",
      ],
    },
    {
      heading: "Client Acknowledgment",
      body: [
        "By submitting documents, records, or other information through our website, email, client portal, or any other authorized communication channel, the client acknowledges that the information is being provided for the purpose of receiving the professional services requested or agreed upon.",
        "The client further acknowledges that we will handle such information in accordance with this Confidentiality and Permitted Use Policy, the applicable Non-Disclosure Agreement, Service Agreement, Engagement Letter, and relevant laws and regulations.",
      ],
    },
  ],
};

/** Company video on the About page, served from public/video (spaces URL-encoded). */
export const COMPANY_VIDEO = {
  title: "WorthPrime Company Video",
  src: "/video/WorthPrime%203.mp4",
};
