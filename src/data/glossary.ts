/**
 * Keyword definitions shown as hover/tap tooltips across the site's main content.
 * Source: client document "WP US Keywords definition" — copy definitions verbatim; don't reword.
 *
 * `term` is the heading shown in bold in the tooltip. `match` lists the text variants to find on
 * the page (case-insensitive, whole words); it defaults to `[term]`.
 */
export type GlossaryEntry = {
  term: string;
  definition: string;
  match?: string[];
};

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "U.S. Tax and Compliance",
    definition:
      "Preparation, Planning and Filing federal and state tax forms, documentation and reporting obligations that individuals and businesses must follow.",
  },
  {
    term: "Individual Tax",
    definition:
      "Tax obligations relating to an individual's income, deductions, credits, and annual tax return filings.",
  },
  {
    term: "U.S. Business Tax",
    definition:
      "Taxes applicable to businesses operating in the United States, depending on their entity structure, income and activities.",
  },
  {
    term: "U.S. Tax",
    definition:
      "The system of federal, state and local taxes applicable to individuals and businesses operating or earning income in the United States.",
  },
  {
    term: "U.S. Individuals",
    definition:
      "People who have U.S. tax filing or reporting responsibilities, including citizens, residents and certain non-residents.",
  },
  {
    term: "Tax Compliance",
    definition:
      "The process of meeting applicable tax laws, filing requirements, payment deadlines and reporting obligations.",
  },
  {
    term: "U.S. Tax Compliance",
    definition:
      "Meeting U.S. federal and state tax requirements through accurate reporting, timely filings, proper planning and payment of applicable taxes.",
  },
  {
    term: "Business Taxation",
    definition:
      "The taxes applicable to businesses based on their legal structure, income and business activities.",
  },
  {
    term: "Tax Planning",
    definition:
      "The process of reviewing financial activities and applying legitimate tax strategies to manage tax liabilities effectively.",
  },
  {
    term: "IRS-Related Matters",
    definition:
      "Tax issues involving the Internal Revenue Service (IRS), including notices, correspondence, audits and tax-related enquiries.",
  },
  {
    term: "Business Formation in the U.S.",
    definition:
      "The process of legally establishing a business in the United States, including selecting an entity type and completing applicable state registration requirements.",
  },
  {
    term: "LLC (Limited Liability Company)",
    definition:
      "A U.S. business structure that generally separates the owner's personal assets from business liabilities while offering flexible tax treatment.",
    match: ["LLC (Limited Liability Company)", "Limited Liability Company", "LLC", "LLCs"],
  },
  {
    term: "C Corporation (C Corp)",
    definition:
      "A business structure that is legally separate from its owners and is generally taxed independently on its profits.",
    match: [
      "C Corporation (C Corp)",
      "C Corporation",
      "C Corporations",
      "C Corp",
      "C Corps",
      "C-Corp",
    ],
  },
  {
    term: "S Corporation (S Corp)",
    definition:
      "A corporation that meets IRS eligibility requirements and elects pass-through federal tax treatment, with income generally reported by its shareholders.",
    match: [
      "S Corporation (S Corp)",
      "S Corporation",
      "S Corporations",
      "S Corp",
      "S Corps",
      "S-Corp",
    ],
  },
  {
    term: "Entity structure considerations",
    definition:
      "Choosing the appropriate legal and tax structure for a business based on ownership, liability, taxation and operational requirements.",
  },
  {
    term: "Bookkeeping",
    definition:
      "The systematic recording and organization of business financial transactions to maintain accurate and up-to-date financial records.",
  },
  {
    term: "Accounting Services",
    definition:
      "Professional services involve the preparation, analysis, and reporting of financial information to support business decisions and compliance.",
  },
  {
    term: "QuickBooks",
    definition:
      "An accounting software platform used by businesses to manage income, expenses, invoices, payroll, and financial records.",
  },
  {
    term: "Odoo",
    definition:
      "An integrated business management software platform that includes accounting, invoicing, inventory, and other business management tools.",
  },
  {
    term: "Zoho Books",
    definition:
      "Cloud-based accounting software that helps businesses manage transactions, invoices, expenses, and financial reporting.",
  },
  {
    term: "U.S. Payroll",
    definition:
      "The process of calculating employee wages, processing payments and managing payroll taxes and reporting requirements under U.S. regulations.",
  },
  {
    term: "W-2 Preparation",
    definition:
      "The preparation of Form W-2, which reports an employee's annual wages and taxes withheld by their employer.",
  },
  {
    term: "1099 Reporting",
    definition:
      "The process of reporting certain payments made to independent contractors and other eligible recipients to the IRS using applicable Form 1099 filings.",
  },
  {
    term: "Audit",
    definition:
      "An independent examination of financial records, statements or processes to assess their accuracy and compliance with applicable standards.",
  },
  {
    term: "SOC 2 Type 1",
    definition:
      "A report evaluating whether an organization's controls related to security and other applicable trust services criteria are suitably designed at a specific point in time.",
  },
  {
    term: "SOC 2 Type 2",
    definition:
      "A report evaluating the design and operating effectiveness of an organisation's relevant controls over a defined period.",
  },
  {
    term: "IRS Notice",
    definition:
      "An official communication from the Internal Revenue Service regarding a tax return, payment, discrepancy, balance or other tax-related matter.",
    match: ["IRS Notice", "IRS Notices"],
  },
  {
    term: "IRS Audit",
    definition:
      "An examination by the Internal Revenue Service to verify the accuracy of a taxpayer's financial information and tax return.",
    match: ["IRS Audit", "IRS Audits"],
  },
  {
    term: "FBAR (Foreign Bank Account Report)",
    definition:
      "A report filed with FinCEN by certain U.S. persons who have qualifying financial interests in or authority over foreign financial accounts exceeding applicable reporting thresholds.",
    match: ["FBAR (Foreign Bank Account Report)", "Foreign Bank Account Report", "FBAR"],
  },
  {
    term: "FATCA (Foreign Account Tax Compliance Act)",
    definition:
      "A U.S. law designed to identify and report certain foreign financial accounts and assets held by U.S. taxpayers.",
    match: [
      "FATCA (Foreign Account Tax Compliance Act)",
      "Foreign Account Tax Compliance Act",
      "FATCA",
    ],
  },
  {
    term: "BOIR (Beneficial Ownership Information Report)",
    definition:
      "A report concerning the individuals who ultimately own or control a reporting company, where filing is required under applicable Corporate Transparency Act rules.",
    match: [
      "BOIR (Beneficial Ownership Information Report)",
      "Beneficial Ownership Information Report",
      "BOIR",
    ],
  },
  {
    term: "ITIN (Individual Taxpayer Identification Number)",
    definition:
      "A tax processing number issued by the IRS to eligible individuals who need a U.S. taxpayer identification number but are not eligible for a Social Security Number.",
    match: [
      "ITIN (Individual Taxpayer Identification Number)",
      "Individual Taxpayer Identification Number",
      "ITIN",
      "ITINs",
    ],
  },
  {
    term: "ITIN Applications",
    definition:
      "The process of applying for an Individual Taxpayer Identification Number by submitting Form W-7 and the required supporting documentation to the IRS.",
    match: ["ITIN Applications", "ITIN Application"],
  },
  {
    term: "ITIN Renewal",
    definition:
      "The process of renewing an ITIN when required under IRS rules so it can continue to be used for applicable federal tax purposes.",
    match: ["ITIN Renewal", "ITIN Renewals"],
  },
  {
    term: "Amended Tax Returns",
    definition:
      "Tax returns filed to correct errors, omissions or changes in information reported on a previously filed tax return.",
    match: ["Amended Tax Returns", "Amended Tax Return"],
  },
  {
    term: "Form 1040-X",
    definition:
      "The IRS form used by individual taxpayers to correct or amend a previously filed Form 1040 tax return.",
    match: ["Form 1040-X", "1040-X"],
  },
  {
    term: "Form 1120-X",
    definition:
      "The form used by eligible corporations to amend a previously filed Form 1120 tax return.",
    match: ["Form 1120-X", "1120-X"],
  },
  {
    term: "Form 1120S",
    definition:
      "The U.S. federal income tax return filed by S corporations to report income, deductions, credits and other tax information.",
    match: ["Form 1120S", "Form 1120-S", "1120S", "1120-S"],
  },
  {
    term: "Form 1065",
    definition:
      "The U.S. federal tax return used by partnerships to report their income, deductions and other financial information.",
    match: ["Form 1065", "1065"],
  },
  {
    term: "Legal and Commercial Document Drafting",
    definition:
      "The preparation of business-related legal and commercial documents that clearly outline terms, responsibilities, obligations and agreements between parties.",
  },
  {
    term: "Memorandum of Understanding (MoU)",
    definition:
      "A written document outlining the mutual understanding, intentions and proposed responsibilities of two or more parties before or alongside a formal agreement.",
    match: ["Memorandum of Understanding (MoU)", "Memorandum of Understanding", "MoU", "MoUs"],
  },
];
