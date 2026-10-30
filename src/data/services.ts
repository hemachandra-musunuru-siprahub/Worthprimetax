export type Audience = "Individuals" | "Businesses" | "Compliance" | "Assurance";

export type Service = {
  number: string;
  slug: string;
  name: string;
  audience: Audience;
  tagline: string;
  summary: string;
  overview: string[];
  capabilitiesLabel: string;
  capabilities: string[];
  /** How many of `capabilities` the flip side of the service card shows; all of them when unset. */
  cardCapabilityCount?: number;
  whoFor: string;
  cta: string;
  /** Lowest starting price, shown on cards and the marquee. Confirmed by the client. */
  price: string;
  included: string;
  /** Separately priced parts of the service; the pricing table shows one row per entry instead of the service row. */
  tiers?: ServiceTier[];
};

export type ServiceTier = { name: string; price: string; included: string };

export const SERVICES: Service[] = [
  {
    number: "01",
    slug: "us-tax-services",
    name: "U.S. Tax Services",
    audience: "Individuals",
    tagline: "Tax obligations managed with precision.",
    summary:
      "Individual and business tax compliance, planning and IRS matters, handled with the wider position in mind.",
    overview: [
      "Tax compliance is not simply about meeting a filing deadline. It is about understanding the rules that apply to your circumstances, identifying legitimate opportunities and maintaining a position that stands up to scrutiny.",
      "WorthPrime Tax advises individuals and businesses across U.S. tax compliance, including Individual Tax, business taxation, tax planning and IRS-related matters.",
    ],
    capabilitiesLabel: "Our tax capabilities include",
    capabilities: [
      "Form 1040 — Individual Tax Returns",
      "Form 1120 — C Corp Tax Returns",
      "Form 1120S — S Corp Tax Returns",
      "Form 1065 — Partnership Tax Returns",
      "Form 990/990EZ and 990-N — Not for Profit Organisation Returns",
      "U.S. business tax compliance",
      "Individual tax planning",
      "Tax return preparation and filing",
      "Amended Tax returns",
      "IRS correspondence and notice resolution",
      "IRS Audit assistance",
    ],
    cardCapabilityCount: 7,
    whoFor:
      "Individuals with U.S. filing obligations, and businesses filing as a C Corp, S Corp or partnership.",
    cta: "Bring greater precision to your tax position",
    price: "From $125",
    included: "Preparation, review and filing of federal and state returns",
    tiers: [
      {
        name: "U.S. Personal Tax Filing",
        price: "From $125",
        included: "Preparation, review and filing of individual federal and state returns",
      },
      {
        name: "U.S. Business Tax Filing",
        price: "From $250",
        included: "Preparation, review and filing of business federal and state returns",
      },
    ],
  },
  {
    number: "02",
    slug: "business-formation-entity-structuring",
    name: "Business Formation & Entity Structuring",
    audience: "Businesses",
    tagline: "The right structure creates room to grow.",
    summary:
      "Formation of a U.S. company with tax, governance and reporting consequences considered up front.",
    overview: [
      "The entity you establish at the outset can influence taxation, governance, liability, reporting and the way your business operates as it grows.",
      "WorthPrime Tax advises entrepreneurs and business owners on Formation of Company in the U.S., helping evaluate the considerations surrounding a Single Owner LLC, C Corp, S Corp or Partnership.",
      "From initial formation through ongoing compliance, we bring tax and accounting considerations into the structural decision—so your entity is established with the wider business picture in mind.",
    ],
    capabilitiesLabel: "Our business formation services include",
    capabilities: [
      "Single Owner LLC formation",
      "C Corp formation",
      "S Corp formation",
      "Partnership formation",
      "Entity structure considerations",
      "Change of type of entity, for example LLC to S Corp, S Corp/partnership to C Corp and vice versa",
      "EIN assistance",
      "State registration coordination",
      "Business compliance requirements",
      "Business bank account assistance",
      "Ongoing entity compliance",
    ],
    cardCapabilityCount: 7,
    whoFor: "Founders starting out, and established owners whose current structure no longer fits.",
    cta: "Build the right structure from the outset",
    price: "From $450",
    included: "Entity selection, formation filings, EIN and state registration",
  },
  {
    number: "03",
    slug: "accounting-bookkeeping",
    name: "Accounting & Bookkeeping",
    audience: "Businesses",
    tagline: "Better books. Better visibility. Better decisions.",
    summary:
      "Records kept organised, current and tax-ready, in QuickBooks or the system you already run.",
    overview: [
      "Accurate books do more than record what has already happened. They give business owners a clearer view of performance, cash flow and financial position—and create a stronger foundation for tax compliance and decision-making.",
      "WorthPrime Tax delivers bookkeeping and accounting services designed around accuracy, consistency and useful financial insight. Whether your business operates through QuickBooks/Odoo/Zoho Books or any other accounting software or ERP, we help keep financial records organised, current and tax-ready.",
    ],
    capabilitiesLabel: "Our accounting capabilities include",
    capabilities: [
      "Bookkeeping and transaction recording",
      "QuickBooks setup and support",
      "Accounts reconciliation",
      "Financial reporting",
      "Monthly accounting",
      "Year-end accounting",
      "Accounts payable and receivable reporting",
      "Tax-ready bookkeeping",
      "Financial record maintenance",
    ],
    whoFor:
      "Businesses without an in-house finance function, and those whose books have fallen behind.",
    cta: "Put your financial records to work",
    price: "From $150 per month",
    included: "Monthly bookkeeping, reconciliation and financial reporting",
  },
  {
    number: "04",
    slug: "us-payroll-services",
    name: "U.S. Payroll Services",
    audience: "Businesses",
    tagline: "Every pay cycle deserves precision.",
    summary:
      "Payroll processing, tax reporting and year-end obligations including W-2 and 1099 reporting.",
    overview: [
      "Payroll sits at the intersection of employees, taxation, reporting and regulatory compliance. Accuracy is therefore not simply desirable—it is fundamental.",
      "WorthPrime Tax manages U.S. Payroll requirements with a structured approach to payroll processing, employee records, tax reporting and year-end obligations, including W-2 preparation, 1099 reporting for Consultants and Gig Workers and related compliance.",
    ],
    capabilitiesLabel: "Our payroll capabilities include",
    capabilities: [
      "U.S. Payroll processing",
      "Payroll tax calculations",
      "Employee payroll records",
      "Federal and state payroll compliance",
      "W-2 preparation and reporting",
      "Payroll reconciliations",
      "Year-end payroll reporting",
      "Ongoing payroll administration",
    ],
    whoFor: "Employers running W-2 staff, and businesses paying consultants or gig workers.",
    cta: "Bring greater control to every pay cycle",
    price: "From $15 per month",
    included: "Pay cycle processing, payroll tax filings and year-end forms",
  },
  {
    number: "05",
    slug: "audit-financial-assurance",
    name: "Audit & Financial Assurance",
    audience: "Assurance",
    tagline: "Independent perspective. Stronger financial discipline.",
    summary:
      "Independent audits, reviews and assurance reporting with an emphasis on accurate reporting.",
    overview: [
      "An effective Audit is not simply a year-end requirement. It offers an informed perspective on financial reporting, internal processes and the quality of the information on which business decisions are based.",
      "WorthPrime Tax provides audit and financial review services with an emphasis on accurate reporting, regulatory alignment and meaningful financial insight.",
    ],
    capabilitiesLabel: "Our audit offering includes",
    capabilities: [
      "Financial statement Independent Audits",
      "Financial statement Independent Reviews",
      "Special Audit (Non US GAAP)",
      "Financial Statement Compilation and Preparation services",
      "Financial reporting and management Reviews",
      "Reporting on Effectiveness of Internal control including SOX",
      "IT Audit: SOC 2 Type 1 and Type 2 reporting",
    ],
    cardCapabilityCount: 6,
    whoFor: "Companies preparing for private equity funding, lenders or statutory reporting.",
    cta: "Strengthen the integrity of your financial reporting",
    price: "From $5,000",
    included: "Independent audit or review, reporting and management discussion",
  },
  {
    number: "06",
    slug: "irs-audit-notice-resolution",
    name: "IRS Audit & Notice Resolution",
    audience: "Compliance",
    tagline: "When the IRS comes calling, clarity matters.",
    summary:
      "A structured response to IRS correspondence, documentation and outstanding tax matters.",
    overview: [
      "An IRS notice can create uncertainty—but the right response begins with understanding exactly what is being requested, why it has been raised and how it should be addressed.",
      "WorthPrime Tax assists individuals and businesses with IRS Audit and notice resolution, bringing structure to the response process and helping clients address correspondence, documentation and outstanding tax matters with appropriate care.",
    ],
    capabilitiesLabel: "Our IRS practice extends across",
    capabilities: [
      "IRS notice review",
      "Audit assistance",
      "Response preparation",
      "Supporting documentation",
      "Tax issue analysis",
      "IRS correspondence",
      "Resolution strategy",
      "Amended filing support where applicable",
    ],
    whoFor: "Anyone holding an IRS letter, and businesses under examination.",
    cta: "Turn an IRS concern into a structured response",
    price: "From $150",
    included: "Notice review, response preparation and IRS correspondence",
  },
  {
    number: "07",
    slug: "fbar-fatca-boir-compliance",
    name: "FBAR, FATCA & BOIR Compliance",
    audience: "Compliance",
    tagline: "International reporting demands precision.",
    summary: "Cross-border and ownership reporting identified, prepared and reported accurately.",
    overview: [
      "Cross-border financial interests can create reporting obligations that extend well beyond the standard tax return. FBAR, FATCA and BOIR requirements each carry their own reporting considerations, thresholds and deadlines.",
      "WorthPrime Tax assists taxpayers and businesses with applicable international and ownership reporting obligations, helping ensure required information is identified, prepared and reported accurately.",
    ],
    capabilitiesLabel: "Our compliance services offer",
    capabilities: [
      "FBAR reporting",
      "FATCA-related reporting",
      "Foreign financial account reporting",
      "Beneficial ownership reporting",
      "BOIR compliance",
      "Foreign asset reporting",
      "International information reporting",
    ],
    whoFor:
      "Taxpayers with overseas accounts or assets, and entities with reportable beneficial owners.",
    cta: "Stay ahead of your reporting obligations",
    price: "From $50",
    included: "Threshold review, preparation and submission of required reports",
    tiers: [
      {
        name: "FBAR & BOIR",
        price: "From $50",
        included: "Threshold review, preparation and filing of FBAR and BOI reports",
      },
      {
        name: "FATCA & PFIC",
        price: "From $200",
        included:
          "Review, preparation and filing of FATCA (Form 8938) and PFIC (Form 8621) reports",
      },
    ],
  },
  {
    number: "08",
    slug: "itin-services",
    name: "ITIN Services",
    audience: "Individuals",
    tagline: "The right identification. The right filing path.",
    summary: "ITIN applications and renewals prepared with the supporting documentation in order.",
    overview: [
      "An Individual Taxpayer Identification Number (ITIN) can be essential for individuals who have U.S. tax filing obligations but are not eligible for a Social Security Number.",
      "Tax assists eligible individuals with ITIN applications and related documentation, bringing greater structure and accuracy to the process.",
    ],
    capabilitiesLabel: "Our ITIN disciplines include",
    capabilities: [
      "New ITIN applications",
      "ITIN renewal",
      "Supporting documentation",
      "Application review",
      "Tax return-related ITIN requirements",
    ],
    whoFor:
      "Individuals with U.S. filing obligations who are not eligible for a Social Security Number.",
    cta: "Get your ITIN requirements in order",
    price: "From $50",
    included: "Application preparation, document review and filing support",
  },
  {
    number: "09",
    slug: "amended-tax-returns",
    name: "Amended Tax Returns",
    audience: "Individuals",
    tagline: "When Accuracy Calls for a Second Look.",
    summary:
      "Review of a previous filing, identification of the issue and preparation of the amended return.",
    overview: [
      "Tax filings do not always tell the complete story the first time around. An omission, reporting error or newly identified information may require an amended return.",
      "WorthPrime Tax reviews the underlying filing, identifies the relevant issue and assists with the preparation and submission of applicable amended tax returns.",
    ],
    capabilitiesLabel: "Our amended tax return practice extends across",
    capabilities: [
      "Review of previously filed tax returns",
      "Identification of errors, omissions and reporting discrepancies",
      "Preparation of amended tax returns",
      "Form 1040/1120/1120S/1065-X preparation and filing",
      "Correction of income, deductions and credits",
      "Updates to taxpayer information and supporting schedules",
      "Supporting documentation and filing requirements",
      "Assistance with IRS correspondence related to amended returns",
    ],
    cardCapabilityCount: 5,
    whoFor: "Taxpayers who have spotted an error, or received new information after filing.",
    cta: "Correct the record with precision",
    price: "From $250",
    included: "Return review, amended preparation and filing",
  },
  {
    number: "10",
    slug: "legal-business-document-drafting",
    name: "Legal & Business Document Drafting",
    audience: "Businesses",
    tagline: "Clear documents. Defined obligations. Stronger business relationships.",
    summary:
      "Agreements, contracts and MoUs drafted with clear language and defined responsibilities.",
    overview: [
      "Business relationships are often shaped by the documents that govern them. Agreements, contracts and Memoranda of Understanding should therefore reflect the commercial intent of the parties with clarity and precision.",
      "WorthPrime Tax assists businesses with legal and commercial document drafting, including agreements, contracts and MoUs, with an emphasis on clear language, defined responsibilities and practical business requirements.",
    ],
    capabilitiesLabel: "Key areas of our documentation practice are",
    capabilities: [
      "Business agreements",
      "Commercial contracts",
      "Memoranda of Understanding (MoUs)",
      "Business-related documentation",
      "Contract review and refinement",
    ],
    whoFor: "Businesses formalising a commercial relationship, or reviewing one already in place.",
    cta: "Give your business arrangements greater clarity",
    price: "From $150",
    included: "Drafting, review and refinement of commercial documents",
  },
];

export const AUDIENCES: Array<"All" | Audience> = [
  "All",
  "Individuals",
  "Businesses",
  "Compliance",
  "Assurance",
];

export const HOW_THE_WORK_MOVES = [
  {
    step: "01",
    title: "Understand",
    body: "We establish the facts, the entity and the obligations that apply.",
    points: ["Facts", "Entity", "Obligations"],
  },
  {
    step: "02",
    title: "Prepare",
    body: "The work is prepared and reviewed against the wider financial position.",
    points: ["Draft", "Financial review", "Quality check"],
  },
  {
    step: "03",
    title: "Deliver",
    body: "Filed, documented and supported through anything that follows.",
    points: ["Filed", "Documented", "Supported"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
