import { HOW_THE_WORK_MOVES, SERVICES, type Service } from "./services";

/*
 * Copy for each service's detail page, from the client's "worthprime changes" document.
 * Card-level text (name, tagline, summary, capabilities) stays in services.ts.
 */
export type ServicePage = {
  /** Hero eyebrow shown after the service number, e.g. "Individuals & Businesses". */
  label: string;
  heading: string;
  tagline: string;
  intro: string;
  start: { heading: string; body: string };
  /** Label on the hero's primary button; pages without one say "Contact us". */
  heroCta?: string;
  /**
   * Hero heading split into lines, in place of `heading`; `accent` parts are bright blue and
   * `underline` adds a curved stroke beneath.
   */
  heroBackdrop?: {
    lines: Array<Array<{ text: string; accent?: boolean; underline?: boolean }>>;
  };
  /**
   * `lead` sits under the heading and `cta` links to the enquiry form after the paragraphs; both
   * carry lines from the client's content document.
   */
  overview: {
    heading: string;
    lead?: string;
    paragraphs: string[];
    cta?: string;
  };
  included: { heading: string; intro: string; groups: Array<{ title: string; items: string[] }> };
  whoFor: { heading: string; intro: string; audiences: Array<{ title: string; body: string }> };
  /** One description per HOW_THE_WORK_MOVES step. */
  process: { heading: string; steps: [string, string, string] };
  related: { heading: string; intro: string; items: Array<{ slug: string; body: string }> };
  closing: string;
};

const SERVICE_PAGES: Record<string, ServicePage> = {
  "us-tax-services": {
    label: "Individuals & Businesses",
    heading: "U.S. Tax Preparation & Filing Services",
    tagline: "Tax Obligations Managed With Precision.",
    intro:
      "Tax compliance is not simply about meeting a filing deadline. It is about understanding the rules that apply to your circumstances, identifying legitimate opportunities and maintaining a position that stands up to scrutiny.",
    heroCta: "Bring greater precision",
    // Heading from the client's hero design (2026-10-23).
    heroBackdrop: {
      lines: [
        [{ text: "Your Taxes. Our Expertise." }],
        [
          { text: "Your Peace", accent: true },
          { text: " of " },
          { text: "Mind.", accent: true, underline: true },
        ],
      ],
    },
    start: {
      heading: "Bring Greater Precision to Your Tax Position.",
      body: "Get professional support for tax preparation, filing, planning and IRS-related matters.",
    },
    overview: {
      heading: "U.S. Tax Compliance, With the Bigger Picture in Mind.",
      lead: "Tax obligations managed with precision.",
      paragraphs: [
        "WorthPrime Tax advises individuals and businesses across U.S. tax compliance, including Individual Tax, business taxation, tax planning and IRS-related matters.",
        "WorthPrime Tax provides accurate U.S. tax preparation, filing, and planning for individuals, businesses, partnerships, and eligible nonprofits. We help you identify legitimate tax-saving opportunities while maintaining compliance and simplifying your financial reporting.",
      ],
      cta: "Bring greater precision to your tax position",
    },
    included: {
      heading: "Tax Services for Individuals, Businesses and Organisations.",
      intro: "Our U.S. tax services cover a range of federal filing and compliance requirements.",
      groups: [
        {
          title: "Individual Tax Services",
          items: [
            "Form 1040 — U.S. Individual Income Tax Returns",
            "Individual Income Tax Planning",
            "Tax Return Preparation and Filing",
          ],
        },
        {
          title: "Business Tax Services",
          items: [
            "Form 1120 — C Corporation Tax Returns",
            "Form 1120-S — S Corporation Tax Returns",
            "Form 1065 — Partnership Tax Returns",
            "U.S. Business Tax Compliance",
          ],
        },
        {
          title: "Nonprofit Tax Filing",
          items: [
            "Form 990, Form 990-EZ and Form 990-N — Applicable Tax-Exempt Organisation Reporting",
          ],
        },
        {
          title: "Additional Tax & IRS Support",
          items: [
            "Amended U.S. Tax Returns",
            "IRS Correspondence and Notice Resolution",
            "IRS Audit Assistance",
          ],
        },
      ],
    },
    whoFor: {
      heading: "U.S. Tax Support for Individuals and Businesses.",
      intro:
        "Whether you're filing an individual return or managing the tax responsibilities of an established business, WorthPrime Tax helps you understand and address the requirements that apply.",
      audiences: [
        {
          title: "Individuals & Taxpayers",
          body: "Individuals with U.S. income tax filing obligations who need assistance with accurate preparation, reporting and tax planning.",
        },
        {
          title: "Business Owners & Corporations",
          body: "C Corporations, S Corporations and partnerships seeking tax preparation, compliance and filing support.",
        },
        {
          title: "Tax-Exempt Organisations",
          body: "Eligible nonprofit organisations that must meet applicable IRS annual information reporting requirements.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From Tax Review to Filing.",
      steps: [
        "We review your financial information, filing status and applicable U.S. tax obligations to establish what is required.",
        "Tax returns and supporting schedules are prepared and reviewed for accuracy, completeness and relevant reporting requirements.",
        "Applicable returns are filed, relevant documentation is organised, and follow-up matters are addressed within the agreed service scope.",
      ],
    },
    related: {
      heading: "Financial Support Beyond Tax Filing.",
      intro:
        "Tax compliance works best when your business structure, accounting records and payroll responsibilities are considered together.",
      items: [
        {
          slug: "business-formation-entity-structuring",
          body: "Choose a business structure with taxation, liability and long-term compliance in mind.",
        },
        {
          slug: "accounting-bookkeeping",
          body: "Maintain organised, accurate and tax-ready financial records.",
        },
        {
          slug: "us-payroll-services",
          body: "Manage payroll processing, payroll taxes and employee reporting requirements.",
        },
      ],
    },
    closing: "Get support for your U.S. tax filing and compliance requirements.",
  },

  "business-formation-entity-structuring": {
    label: "Businesses",
    heading: "Business Formation & Entity Structuring",
    tagline: "The Right Structure Creates Room to Grow.",
    intro:
      "The entity you establish at the outset can influence taxation, governance, liability, reporting and the way your business operates as it grows.",
    heroCta: "Build the right structure",
    heroBackdrop: {
      lines: [[{ text: "The right structure creates room to grow." }]],
    },
    start: {
      heading: "Build the Right Structure From the Outset.",
      body: "Choose a business entity with taxation, ownership, compliance and future growth in mind.",
    },
    overview: {
      heading: "The Right Business Structure Builds a Stronger Foundation.",
      paragraphs: [
        "WorthPrime Tax advises entrepreneurs and business owners on Formation of Company in the U.S., helping evaluate the considerations surrounding a Single Owner LLC, C Corp, S Corp or Partnership.",
        "From initial formation through ongoing compliance, we bring tax and accounting considerations into the structural decision—so your entity is established with the wider business picture in mind.",
      ],
      cta: "Build the right structure from the outset",
    },
    included: {
      heading: "U.S. Business Formation Services, From Setup to Compliance.",
      intro: "Our business formation services include:",
      // Items worded as in the client's content document.
      groups: [
        {
          title: "Company Formation & Registration",
          items: [
            "Single Owner LLC formation",
            "C Corp formation",
            "S Corp formation",
            "Partnership formation",
            "State registration coordination",
          ],
        },
        {
          title: "Business Structure & Restructuring",
          items: [
            "Entity structure considerations",
            "Change of type of entity, for example from LLC to S Corp, S Corp/Partnership to C Corp and vice versa",
          ],
        },
        {
          title: "Registration & Ongoing Compliance",
          items: [
            "EIN assistance",
            "Business compliance requirements",
            "Business bank account assistance",
            "Ongoing entity compliance",
          ],
        },
      ],
    },
    whoFor: {
      heading: "Business Formation Support for Founders and Growing Companies.",
      intro:
        "Whether you're launching a new business or reconsidering an existing structure, choosing the right entity can help establish a foundation for long-term operations.",
      audiences: [
        {
          title: "Entrepreneurs & New Business Owners",
          body: "Founders planning to register a U.S. company who need guidance on LLCs, corporations, partnerships and initial compliance requirements.",
        },
        {
          title: "Existing Businesses & Growing Companies",
          body: "Established business owners reviewing whether their current entity structure continues to support their tax position, ownership arrangements and growth plans.",
        },
        {
          title: "Businesses Considering Restructuring",
          body: "Companies exploring changes to their entity classification, ownership structure or business organisation as operational needs evolve.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From Business Structure to Setup.",
      steps: [
        "We review your business goals, ownership arrangements and tax considerations to identify suitable entity options and applicable requirements.",
        "The proposed structure, formation requirements and relevant documentation are reviewed alongside tax, accounting and compliance considerations.",
        "Applicable registrations and documentation are coordinated, with guidance on relevant next steps and ongoing obligations within the agreed service scope.",
      ],
    },
    related: {
      heading: "Connected Services for Your Business.",
      intro:
        "Business formation is only the beginning. The right accounting, taxation and payroll support helps your company manage its responsibilities as operations grow.",
      items: [
        {
          slug: "us-tax-services",
          body: "Navigate business tax preparation, federal filing requirements and ongoing U.S. tax compliance.",
        },
        {
          slug: "accounting-bookkeeping",
          body: "Maintain accurate financial records and gain clearer visibility into your business performance.",
        },
        {
          slug: "us-payroll-services",
          body: "Support employee payroll, payroll tax calculations and applicable reporting requirements.",
        },
      ],
    },
    closing:
      "Starting a company or reconsidering your business structure? Get support to make your next move with clarity.",
  },

  "accounting-bookkeeping": {
    label: "Businesses",
    heading: "Accounting & Bookkeeping Services",
    tagline: "Better Books. Better Visibility. Better Decisions.",
    intro:
      "Accurate financial records are the foundation of a well-managed business. WorthPrime Tax provides accounting and bookkeeping services to help U.S. businesses maintain organised records, monitor cash flow and make informed financial decisions.",
    heroBackdrop: {
      lines: [[{ text: "Better books. Better visibility. Better decisions." }]],
    },
    start: {
      heading: "Put Your Financial Records to Work.",
      body: "From daily transactions to monthly reporting, keep your accounts accurate, current and ready for what's next.",
    },
    overview: {
      heading: "Better Financial Records. Clearer Business Decisions.",
      paragraphs: [
        "WorthPrime Tax delivers Bookkeeping and accounting services designed around accuracy, consistency and useful financial insight. Whether your business operates through QuickBooks/Odoo/Zoho Books or any other accounting software or ERP this requires a more structured accounting environment, we help keep financial records organised, current and tax-ready.",
      ],
      cta: "Put your financial records to work",
    },
    included: {
      heading: "Accounting & Bookkeeping Services That Keep Your Business on Track.",
      intro: "Our accounting capabilities include:",
      // Items worded as in the client's content document.
      groups: [
        {
          title: "Bookkeeping & Financial Records",
          items: [
            "Bookkeeping and transaction recording",
            "QuickBooks setup and support",
            "Financial record maintenance",
            "Tax-ready bookkeeping",
          ],
        },
        {
          title: "Accounting & Reconciliation",
          items: ["Accounts reconciliation", "Monthly accounting", "Year-end accounting"],
        },
        {
          title: "Financial Reporting & Business Visibility",
          items: ["Financial reporting", "Accounts payable and receivable reporting"],
        },
      ],
    },
    whoFor: {
      heading: "Bookkeeping Support for Small and Growing Businesses.",
      intro:
        "Whether you manage your finances independently or need support keeping your records up to date, WorthPrime Tax helps businesses establish more reliable accounting practices.",
      audiences: [
        {
          title: "Small Businesses & Startups",
          body: "Business owners without a dedicated finance team who need support with transaction recording, account reconciliation and financial reporting.",
        },
        {
          title: "Growing Businesses",
          body: "Companies managing increasing transaction volumes and requiring consistent bookkeeping and clearer financial information.",
        },
        {
          title: "Businesses With Outdated Records",
          body: "Businesses whose books have fallen behind and need assistance organising transactions, reconciling accounts and bringing financial records up to date.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From Financial Records to Clearer Reporting.",
      steps: [
        "We review your existing accounting records, business transactions, software and reporting requirements to understand your financial position and identify gaps.",
        "Transactions are recorded, accounts are reconciled and financial reports are prepared and reviewed for accuracy, consistency and completeness.",
        "Organised financial records and relevant reports are provided, with ongoing bookkeeping and accounting support based on your business requirements and agreed scope.",
      ],
    },
    related: {
      heading: "Connected Services for Your Business Finances.",
      intro:
        "Reliable accounting records support accurate tax filings, informed business decisions and better financial administration.",
      items: [
        {
          slug: "us-tax-services",
          body: "Support individual and business tax preparation, filing and compliance with accurate financial information.",
        },
        {
          slug: "business-formation-entity-structuring",
          body: "Establish or review your business structure with tax, accounting and compliance considerations in mind.",
        },
        {
          slug: "us-payroll-services",
          body: "Manage payroll processing, payroll tax calculations and applicable employee reporting requirements.",
        },
      ],
    },
    closing:
      "From keeping your books current to preparing for tax season, take the next step with reliable accounting support.",
  },

  "us-payroll-services": {
    label: "Businesses",
    heading: "U.S. Payroll Services",
    tagline: "Every Pay Cycle Deserves Precision.",
    intro:
      "Payroll sits at the intersection of employees, taxation, reporting and regulatory compliance. Accuracy is therefore not simply desirable—it is fundamental.",
    heroCta: "Bring greater control",
    heroBackdrop: {
      lines: [[{ text: "Every pay cycle deserves precision." }]],
    },
    start: {
      heading: "Bring Greater Control to Every Pay Cycle.",
      body: "From payroll calculations to year-end reporting, keep your payroll organised, accurate and compliant.",
    },
    overview: {
      heading: "Accurate Payroll. Confident Business Operations.",
      paragraphs: [
        "WorthPrime Tax manages U.S. Payroll requirements with a structured approach to payroll processing, employee records, tax reporting and year-end obligations, including W-2 preparation, 1099 reporting for Consultants and Gig Workers and related compliance.",
      ],
    },
    included: {
      heading: "Payroll Processing & Compliance Services for U.S. Businesses.",
      intro:
        "Our payroll services support accurate payroll calculations, regulatory reporting and ongoing payroll administration.",
      groups: [
        {
          title: "Payroll Processing & Employee Records",
          items: [
            "U.S. Payroll Processing",
            "Employee Payroll Records",
            "Ongoing Payroll Administration",
          ],
        },
        {
          title: "Payroll Tax & Compliance",
          items: [
            "Payroll Tax Calculations",
            "Federal and State Payroll Compliance",
            "Payroll Reconciliations",
          ],
        },
        {
          title: "Year-End Payroll Reporting",
          items: [
            "Form W-2 Preparation and Reporting",
            "Year-End Payroll Reporting",
            "Applicable Form 1099-NEC Reporting for Independent Contractors",
          ],
        },
      ],
    },
    whoFor: {
      heading: "Payroll Support for Employers and Growing Businesses.",
      intro:
        "Whether you're managing a small team or a growing workforce, reliable payroll processes help keep employee payments and reporting responsibilities on track.",
      audiences: [
        {
          title: "Small Businesses & Employers",
          body: "Businesses employing W-2 staff that need support with regular payroll processing, employee records and payroll tax calculations.",
        },
        {
          title: "Growing Companies",
          body: "Organisations managing expanding teams, additional payroll responsibilities and federal or state reporting requirements.",
        },
        {
          title: "Businesses Working With Independent Contractors",
          body: "Businesses paying consultants, freelancers or gig workers that need assistance with applicable nonemployee compensation reporting.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From Payroll Setup to Reporting.",
      steps: [
        "We review your workforce structure, payroll schedules, employee records and applicable federal and state payroll requirements.",
        "Payroll calculations, employee records and relevant tax information are prepared and reviewed for accuracy and reporting requirements.",
        "Payroll processing and applicable reporting are completed, with records organised and follow-up administration supported within the agreed service scope.",
      ],
    },
    related: {
      heading: "Connected Financial Support Beyond Payroll.",
      intro:
        "Payroll works best when employee compensation, accounting records and tax responsibilities remain aligned.",
      items: [
        {
          slug: "us-tax-services",
          body: "Support business tax preparation, reporting and compliance with reliable financial and payroll information.",
        },
        {
          slug: "business-formation-entity-structuring",
          body: "Establish or review your business structure with taxation, employment and compliance considerations in mind.",
        },
        {
          slug: "accounting-bookkeeping",
          body: "Maintain accurate financial records, reconcile payroll-related transactions and support consistent financial reporting.",
        },
      ],
    },
    closing:
      "Keep your payroll responsibilities organised with professional support for processing, reporting and compliance.",
  },

  "audit-financial-assurance": {
    label: "Assurance",
    heading: "Audit & Financial Assurance Services",
    tagline: "Independent Perspective. Stronger Financial Discipline.",
    intro:
      "An effective Audit is not simply a year-end requirement. It offers an informed perspective on financial reporting, internal processes and the quality of the information on which business decisions are based.",
    heroBackdrop: {
      lines: [[{ text: "Independent perspective. Stronger financial discipline." }]],
    },
    start: {
      heading: "Strengthen the Integrity of Your Financial Reporting.",
      body: "From independent financial statement audits to internal control assessments, gain clearer insight into your financial reporting and assurance requirements.",
    },
    overview: {
      heading: "Financial Assurance That Goes Beyond Compliance.",
      paragraphs: [
        "WorthPrime Tax provides audit and financial review services with an emphasis on accurate reporting, regulatory alignment and meaningful financial insight.",
      ],
      cta: "Strengthen the integrity of your financial reporting",
    },
    included: {
      heading: "Audit, Financial Review & Internal Control Services.",
      intro: "Our audit offering includes:",
      groups: [
        {
          title: "Financial Statement Audit & Review",
          items: [
            "Financial statement Independent Audits",
            "Financial statement Independent Reviews",
            "Special Audit (Non US GAAP)",
          ],
        },
        {
          title: "Financial Reporting & Compilation",
          items: [
            "Financial Statement Compilation and Preparation services",
            "Financial reporting and management Reviews",
          ],
        },
        {
          title: "Internal Controls & IT Assurance",
          items: [
            "Reporting on Effectiveness of Internal control including SOX",
            "IT Audit: SOC 2 Type 1 and Type 2 reporting",
          ],
        },
      ],
    },
    whoFor: {
      heading: "Financial Assurance for Businesses, Investors & Stakeholders.",
      intro:
        "Whether you're preparing for outside investment, meeting lender requirements or addressing formal reporting obligations, reliable financial information is essential.",
      audiences: [
        {
          title: "Companies Seeking Private Equity Investment",
          body: "Businesses preparing financial statements and supporting information for investor due diligence, potential acquisitions or funding discussions.",
        },
        {
          title: "Businesses Working With Lenders",
          body: "Companies requiring financial audits, independent reviews or other financial reporting support for lending arrangements and financing requirements.",
        },
        {
          title: "Organisations With Statutory Reporting Obligations",
          body: "Businesses subject to applicable audit, financial reporting or regulatory requirements.",
        },
        {
          title: "Companies Strengthening Internal Controls",
          body: "Organisations assessing financial reporting controls, IT controls or SOC 2 assurance requirements.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From Assessment to Assurance.",
      steps: [
        "We review your reporting requirements, financial records, business structure and the objectives of the proposed audit or assurance engagement.",
        "Relevant financial information, supporting evidence and internal controls are examined through procedures appropriate to the agreed engagement and applicable professional standards.",
        "The applicable audit, review or assurance report is issued upon completion, with relevant findings and follow-up matters communicated within the agreed engagement scope.",
      ],
    },
    related: {
      heading: "Connected Financial Support Beyond Assurance.",
      intro:
        "Reliable accounting records, appropriate business structures and consistent tax compliance help support stronger financial reporting.",
      items: [
        {
          slug: "accounting-bookkeeping",
          body: "Maintain accurate financial records, account reconciliations and reporting information to support financial reviews and audit readiness.",
        },
        {
          slug: "us-tax-services",
          body: "Address applicable tax filing requirements and maintain consistency between financial reporting and tax compliance.",
        },
        {
          slug: "business-formation-entity-structuring",
          body: "Evaluate entity structures, reporting responsibilities and business compliance requirements as your organisation evolves.",
        },
      ],
    },
    closing:
      "Preparing for an audit, investor review or financial reporting requirement? Discuss your assurance needs with WorthPrime Tax.",
  },

  "irs-audit-notice-resolution": {
    label: "Compliance",
    heading: "IRS Audit & Notice Resolution Services",
    tagline: "When the IRS Comes Calling, Clarity Matters.",
    heroBackdrop: {
      lines: [[{ text: "When the IRS comes calling, clarity matters." }]],
    },
    intro:
      "An IRS notice can create uncertainty—but the right response begins with understanding exactly what is being requested, why it has been raised and how it should be addressed.",
    start: {
      heading: "Turn an IRS Concern Into a Structured Response.",
      body: "From understanding an IRS letter to preparing documentation and responses, approach your tax matters with clarity and professional support.",
    },
    overview: {
      heading: "Understanding the Notice Is the First Step Toward Resolution.",
      paragraphs: [
        "WorthPrime Tax assists individuals and businesses with IRS Audit and notice resolution, bringing structure to the response process and helping clients address correspondence, documentation and outstanding tax matters with appropriate care.",
      ],
      cta: "Turn an IRS concern into a structured response",
    },
    included: {
      heading: "IRS Notice Review, Audit Assistance & Tax Resolution Support.",
      intro: "Our IRS practice extends across:",
      // Items worded as in the client's content document.
      groups: [
        {
          title: "IRS Notice Review & Tax Analysis",
          items: ["IRS notice review", "Tax issue analysis"],
        },
        {
          title: "Audit Assistance & Documentation",
          items: ["Audit assistance", "Response preparation", "Supporting documentation"],
        },
        {
          title: "IRS Correspondence & Resolution Support",
          items: [
            "IRS correspondence",
            "Resolution strategy",
            "Amended filing support where applicable",
          ],
        },
      ],
    },
    whoFor: {
      heading: "IRS Support for Individuals and Businesses.",
      intro:
        "Whether you've received an unexpected IRS letter or your business is undergoing a tax examination, understanding the issue and the required response is essential.",
      audiences: [
        {
          title: "Individuals Receiving IRS Notices",
          body: "Taxpayers who have received IRS letters concerning their returns, reported income, tax balances or requests for additional information.",
        },
        {
          title: "Businesses Facing IRS Audits",
          body: "Corporations, partnerships and business owners requiring assistance with tax examinations, supporting records and audit-related correspondence.",
        },
        {
          title: "Taxpayers Addressing Reporting Discrepancies",
          body: "Individuals or businesses dealing with mismatched information, proposed tax adjustments or filing issues that require further review.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From IRS Notice to Structured Response.",
      steps: [
        "We review your IRS notice, relevant tax returns, supporting records and response deadlines to understand the issue and applicable requirements.",
        "The relevant tax information is analysed, supporting documentation is organised and an appropriate response is prepared based on the circumstances.",
        "The response and supporting information are prepared for submission or submitted where authorised, with assistance on relevant follow-up matters within the agreed service scope.",
      ],
    },
    related: {
      heading: "Tax Support Beyond the Immediate IRS Issue.",
      intro:
        "Resolving a tax concern may require reviewing earlier filings, maintaining accurate financial records or addressing broader compliance responsibilities.",
      items: [
        {
          slug: "us-tax-services",
          body: "Support individual and business tax preparation, compliance and reporting requirements.",
        },
        {
          slug: "amended-tax-returns",
          body: "Review and correct applicable previously filed tax returns when errors, omissions or new information require an amendment.",
        },
        {
          slug: "accounting-bookkeeping",
          body: "Maintain organised financial records and supporting documentation for tax reporting and compliance.",
        },
      ],
    },
    closing:
      "Received an IRS notice or need assistance with a tax examination? Take the next step with a clear understanding of your options.",
  },

  "fbar-fatca-boir-compliance": {
    label: "Compliance",
    heading: "FBAR, FATCA & BOIR Compliance Services",
    tagline: "International Reporting Demands Precision.",
    heroBackdrop: {
      lines: [[{ text: "International reporting demands precision." }]],
    },
    intro:
      "Cross-border financial interests can create reporting obligations that extend well beyond the standard tax return. FBAR, FATCA and BOIR requirements each carry their own reporting considerations, thresholds and deadlines.",
    start: {
      heading: "Stay Ahead of Your International Reporting Obligations.",
      body: "Understand which foreign account, asset and ownership reporting requirements apply to you.",
    },
    overview: {
      heading: "International Tax Reporting, Made Clearer.",
      paragraphs: [
        "WorthPrime Tax assists taxpayers and businesses with applicable international and ownership reporting obligations, helping ensure required information is identified, prepared and reported accurately.",
        "Holding financial accounts or assets outside the United States can create additional reporting responsibilities. FBAR and FATCA have separate filing requirements, reporting thresholds and disclosure rules.",
        "Our services include foreign financial account reporting and assistance with assessing beneficial ownership reporting requirements for qualifying foreign entities registered to do business in the United States.",
        "By connecting these requirements with the wider U.S. tax framework, we help clients maintain accurate records and understand their compliance responsibilities.",
      ],
      cta: "Stay ahead of your reporting obligations",
    },
    included: {
      heading: "Foreign Account, Asset & Ownership Reporting Services.",
      intro: "Our compliance services offer:",
      // Items worded as in the client's content document.
      groups: [
        {
          title: "Foreign Bank Account Reporting (FBAR)",
          items: ["FBAR reporting", "Foreign financial account reporting"],
        },
        {
          title: "FATCA & Foreign Asset Reporting",
          items: [
            "FATCA-related reporting",
            "Foreign asset reporting",
            "International information reporting",
          ],
        },
        {
          title: "Beneficial Ownership Reporting",
          items: ["Beneficial ownership reporting", "BOIR compliance"],
        },
      ],
    },
    whoFor: {
      heading: "International Reporting Support for Individuals & Businesses.",
      intro:
        "Whether you hold accounts abroad or manage a foreign business with U.S. reporting responsibilities, understanding your obligations is essential.",
      audiences: [
        {
          title: "U.S. Taxpayers With Foreign Accounts",
          body: "U.S. citizens, residents and other U.S. persons who may have FBAR reporting obligations because of financial accounts held outside the United States.",
        },
        {
          title: "Individuals With Foreign Financial Assets",
          body: "Taxpayers holding specified foreign financial assets who may need to meet FATCA reporting requirements, including IRS Form 8938.",
        },
        {
          title: "Businesses With International Financial Interests",
          body: "Eligible businesses and other entities that need assistance understanding applicable foreign account, asset or international information reporting requirements.",
        },
        {
          title: "Qualifying Foreign Companies",
          body: "Foreign entities registered to do business in the United States that may remain subject to federal beneficial ownership reporting requirements.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From Reporting Review to Compliance.",
      steps: [
        "We review your foreign financial accounts, reportable assets, ownership arrangements and applicable U.S. reporting thresholds to identify relevant obligations.",
        "Required financial information, account details and supporting documentation are organised and reviewed against applicable reporting requirements.",
        "Applicable reports and disclosures are prepared and filed where authorised, with relevant documentation and follow-up support provided within the agreed service scope.",
      ],
    },
    related: {
      heading: "Connected Support for Your Tax & Compliance Needs.",
      intro:
        "International reporting responsibilities often connect with broader tax filings, business structures and regulatory requirements.",
      items: [
        {
          slug: "us-tax-services",
          body: "Address applicable federal tax filings, international tax considerations and related reporting responsibilities.",
        },
        {
          slug: "business-formation-entity-structuring",
          body: "Review business ownership, entity structures and applicable formation or reporting requirements.",
        },
        {
          slug: "irs-audit-notice-resolution",
          body: "Get assistance understanding IRS correspondence, reviewing reporting concerns and preparing appropriate responses.",
        },
      ],
    },
    closing:
      "Managing foreign financial accounts, international assets or cross-border reporting responsibilities? Take the next step with professional compliance support.",
  },

  "itin-services": {
    // The document gives no eyebrow for this page; this is the service's audience from services.ts.
    label: "Individuals",
    heading: "ITIN Application & Renewal Services",
    tagline: "The Right Identification. The Right Filing Path.",
    intro:
      "An Individual Taxpayer Identification Number (ITIN) can be essential for individuals who have U.S. tax filing obligations but are not eligible for a Social Security Number.\nWorthPrime Tax assists eligible individuals with ITIN applications and related documentation, bringing greater structure and accuracy to the process.",
    heroCta: "Get your ITIN in order",
    heroBackdrop: {
      lines: [[{ text: "The right identification. The right filing path." }]],
    },
    start: {
      heading: "Get Your ITIN Requirements in Order.",
      body: "From understanding eligibility to preparing the required documentation, take the next step toward meeting your U.S. tax identification requirements.",
    },
    overview: {
      heading: "U.S. Tax Identification, Made Clearer.",
      paragraphs: [
        "Need an Individual Taxpayer Identification Number (ITIN) for U.S. tax purposes? WorthPrime Tax assists eligible individuals with new ITIN applications, renewals, IRS Form W-7 preparation and supporting documentation to help them navigate the application process with greater clarity and accuracy.",
        "WorthPrime Tax assists eligible individuals with ITIN applications and renewals, including IRS Form W-7 preparation and document organisation. We help ensure accurate information, complete documentation, and compliance with applicable U.S. tax requirements.",
        "Whether you're applying for an ITIN for the first time or renewing an expired number, our approach focuses on accurate information, complete documentation and alignment with applicable U.S. tax filing requirements.",
      ],
      cta: "Get your ITIN requirements in order",
    },
    included: {
      heading: "ITIN Application, Renewal & Documentation Support.",
      intro: "Our ITIN disciplines include:",
      // Items worded as in the client's content document.
      groups: [
        {
          title: "ITIN Applications & Renewals",
          items: ["New ITIN applications", "ITIN renewal"],
        },
        {
          title: "Documentation & Review",
          items: ["Supporting documentation", "Application review"],
        },
        {
          title: "Tax Filing Support",
          items: ["Tax return-related ITIN requirements"],
        },
      ],
    },
    whoFor: {
      heading: "ITIN Support for Individuals With U.S. Tax Obligations.",
      intro:
        "If you have a valid U.S. federal tax purpose but are not eligible for a Social Security Number, an ITIN may be required to meet your reporting responsibilities.",
      audiences: [
        {
          title: "Nonresident Individuals With U.S. Tax Obligations",
          body: "Nonresident individuals who need a U.S. taxpayer identification number for an applicable federal tax return or other qualifying tax purpose.",
        },
        {
          title: "Individuals With U.S. Tax Filing Requirements",
          body: "Eligible resident or nonresident taxpayers who need an ITIN to report income or meet applicable federal tax obligations.",
        },
        {
          title: "Eligible Spouses & Dependents",
          body: "Spouses or dependents who require an ITIN for an allowable tax benefit or another qualifying federal tax purpose.",
        },
        {
          title: "Individuals Renewing an Expired ITIN",
          body: "Taxpayers whose ITIN has expired and who need to use it again on a U.S. federal tax return.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From ITIN Requirements to Application.",
      steps: [
        "We review your U.S. tax identification needs, Social Security Number eligibility and relevant filing requirements to determine the appropriate ITIN application or renewal process.",
        "IRS Form W-7 and applicable supporting documentation are prepared and reviewed for accuracy, completeness and consistency with the relevant tax requirements.",
        "The application package is organised for submission through an applicable IRS procedure, with guidance on relevant next steps and follow-up requirements within the agreed service scope.",
      ],
    },
    related: {
      heading: "Connected Support for Your U.S. Tax Requirements.",
      intro:
        "Obtaining an ITIN may form part of a wider tax filing or business-related financial responsibility.",
      items: [
        {
          slug: "us-tax-services",
          body: "Get assistance with individual U.S. tax return preparation, applicable filing requirements and tax compliance.",
        },
        {
          slug: "business-formation-entity-structuring",
          body: "Explore U.S. business formation and entity structuring support where your business activities create separate registration, identification or compliance requirements.",
        },
        {
          slug: "accounting-bookkeeping",
          body: "Maintain organised financial records and relevant reporting information to support your tax responsibilities.",
        },
      ],
    },
    closing:
      "Applying for an ITIN or renewing an expired number? Get support understanding the requirements and preparing your application.",
  },

  "amended-tax-returns": {
    label: "Individuals & Businesses",
    heading: "Amended Tax Return Services",
    tagline: "When Accuracy Calls for a Second Look.",
    intro:
      "Tax filings do not always tell the complete story the first time around. An omission, reporting error or newly identified information may require an amended return.\nWorthPrime Tax reviews the underlying filing, identifies the relevant issue and assists with the preparation and submission of applicable amended tax returns.",
    heroCta: "Correct the record",
    heroBackdrop: {
      lines: [[{ text: "When Accuracy Calls for a Second Look." }]],
    },
    start: {
      heading: "Correct the Record With Precision.",
      body: "From reviewing an original filing to preparing an amended return, get professional support to address tax reporting errors with clarity and confidence.",
    },
    overview: {
      heading: "Accurate Tax Reporting Doesn't End With the First Filing.",
      paragraphs: [
        "Errors, omissions or newly discovered information can affect previously filed tax returns. WorthPrime Tax provides amended tax return preparation and filing assistance for individuals and businesses, helping correct reporting discrepancies, update financial information and address applicable IRS requirements.",
        "Our approach connects accurate reporting with supporting documentation and the wider tax position, helping taxpayers address corrections carefully and maintain consistent financial records.",
      ],
      cta: "Correct the record with precision",
    },
    included: {
      heading: "Amended Tax Return Preparation & Filing Support.",
      intro: "Our amended tax return practice extends across:",
      // Items worded as in the client's content document.
      groups: [
        {
          title: "Tax Return Review & Error Identification",
          items: [
            "Review of previously filed tax returns",
            "Identification of errors, omissions and reporting discrepancies",
            "Preparation of amended tax returns",
          ],
        },
        {
          title: "Amended Tax Return Preparation",
          items: [
            "Form 1040/1120/1120S/1065-X preparation and filing",
            "Correction of income, deductions and credits",
          ],
        },
        {
          title: "Documentation & IRS Support",
          items: [
            "Updates to taxpayer information and supporting schedules",
            "Supporting documentation and filing requirements",
            "Assistance with IRS correspondence related to amended returns",
          ],
        },
      ],
    },
    whoFor: {
      heading: "Amended Tax Filing Support for Individuals & Businesses.",
      intro:
        "Whether you've discovered a mistake in a previous filing or received new financial information after submission, understanding whether an amendment is required is an important first step.",
      audiences: [
        {
          title: "Individuals Correcting Tax Return Errors",
          body: "Taxpayers who need to correct previously reported income, filing status, deductions, credits or other relevant information.",
        },
        {
          title: "Businesses Reviewing Previous Filings",
          body: "Corporations and partnerships that identify reporting discrepancies, incorrect financial information or changes affecting previously filed business tax returns.",
        },
        {
          title: "Taxpayers With Newly Received Information",
          body: "Individuals and businesses that receive corrected tax documents, updated income statements or additional financial information after filing.",
        },
        {
          title: "Taxpayers Responding to IRS Correspondence",
          body: "Individuals or businesses reviewing IRS notices or proposed adjustments that may require further documentation, a response or an amended return.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From Filing Review to Correction.",
      steps: [
        "We review your original tax return, supporting documents and the newly identified issue to determine whether an amendment is appropriate.",
        "The relevant corrections, amended forms and supporting schedules are prepared and reviewed for accuracy, completeness and applicable IRS requirements.",
        "The amended return is prepared for filing or submitted where authorised, with relevant documentation and follow-up guidance provided within the agreed service scope.",
      ],
    },
    related: {
      heading: "Connected Support for Your Tax & Financial Records.",
      intro:
        "Accurate amended filings often depend on reliable accounting information, proper business reporting and a clear understanding of applicable tax requirements.",
      items: [
        {
          slug: "us-tax-services",
          body: "Get assistance with individual and business tax preparation, federal filing requirements and ongoing tax compliance.",
        },
        {
          slug: "business-formation-entity-structuring",
          body: "Review business structures, tax classifications and reporting obligations that may influence your tax position.",
        },
        {
          slug: "accounting-bookkeeping",
          body: "Maintain accurate financial records, reconcile transactions and organise supporting information for tax filing and financial reporting.",
        },
      ],
    },
    closing:
      "Need to correct a previously filed tax return? Take the next step with a clear understanding of your reporting requirements.",
  },

  "legal-business-document-drafting": {
    label: "Businesses",
    heading: "Legal & Business Document Drafting",
    tagline: "Clear Documents. Defined Obligations. Stronger Business Relationships.",
    intro:
      "Business relationships are often shaped by the documents that govern them. Agreements, contracts and Memoranda of Understanding should therefore reflect the commercial intent of the parties with clarity and precision.",
    heroBackdrop: {
      lines: [[{ text: "Clear documents. Defined obligations. Stronger business relationships." }]],
    },
    start: {
      heading: "Give Your Business Arrangements Greater Clarity.",
      body: "From business agreements to Memoranda of Understanding, bring structure and consistency to your commercial documentation.",
    },
    overview: {
      heading: "Clear Agreements. Stronger Business Foundations.",
      paragraphs: [
        "WorthPrime Tax assists businesses with legal and commercial document drafting, including agreements, contracts and MoUs, with an emphasis on clear language, defined responsibilities and practical business requirements.",
      ],
      cta: "Give your business arrangements greater clarity",
    },
    included: {
      heading: "Business Agreements, Contracts & Documentation Support.",
      intro: "Key areas of our documentation practice are:",
      // Items worded as in the client's content document.
      groups: [
        {
          title: "Business Agreements & Contracts",
          items: [
            "Business agreements",
            "Commercial contracts",
            "Memoranda of Understanding (MoUs)",
          ],
        },
        {
          title: "Business Documentation",
          items: ["Business-related documentation"],
        },
        {
          title: "Contract Review & Refinement",
          items: ["Contract review and refinement"],
        },
      ],
    },
    whoFor: {
      heading: "Documentation Support for Businesses at Every Stage.",
      intro:
        "Whether you're formalising a new commercial relationship or updating an existing agreement, clear documentation helps everyone understand the intended arrangement.",
      audiences: [
        {
          title: "Startups & New Business Owners",
          body: "Entrepreneurs preparing business agreements and documentation for new commercial relationships or operating arrangements.",
        },
        {
          title: "Growing Businesses & Established Companies",
          body: "Organisations formalising supplier, vendor, customer or business partner arrangements through appropriate commercial documentation.",
        },
        {
          title: "Businesses Reviewing Existing Agreements",
          body: "Companies updating contracts, refining commercial terms or revisiting documents as business requirements change.",
        },
      ],
    },
    process: {
      heading: "Three Steps. From Business Requirements to Clear Documentation.",
      steps: [
        "We review the purpose of the agreement, the parties involved, commercial objectives and key responsibilities that need to be documented.",
        "The relevant agreement or business document is drafted or refined, with attention to clarity, consistency, commercial terms and the agreed requirements.",
        "The prepared document is shared for review and refinement, with relevant revisions and coordination of professional legal review where required.",
      ],
    },
    related: {
      heading: "Connected Support for Your Business Operations.",
      intro:
        "Clear documentation works alongside the right business structure, organised financial records and consistent tax compliance.",
      items: [
        {
          slug: "us-tax-services",
          body: "Understand applicable tax obligations and reporting requirements connected to your business activities.",
        },
        {
          slug: "business-formation-entity-structuring",
          body: "Establish or review your business structure with ownership, taxation and compliance considerations in mind.",
        },
        {
          slug: "accounting-bookkeeping",
          body: "Maintain organised financial records and documentation to support reporting and business administration.",
        },
      ],
    },
    closing:
      "Preparing a new business agreement or reviewing existing documentation? Take the next step with greater clarity around your commercial arrangements.",
  },
};

/** Page copy for a service; services without their own entry fall back to their card-level data. */
export function getServicePage(service: Service): ServicePage {
  const page = SERVICE_PAGES[service.slug];
  if (page) return page;
  const steps = HOW_THE_WORK_MOVES.map((s) => s.body);
  return {
    label: service.audience,
    heading: service.name,
    tagline: service.tagline,
    intro: service.summary,
    start: { heading: `${service.cta}.`, body: "" },
    overview: { heading: service.tagline, paragraphs: service.overview },
    included: {
      heading: service.capabilitiesLabel,
      intro: "",
      groups: [{ title: "", items: service.capabilities }],
    },
    whoFor: { heading: service.whoFor, intro: "", audiences: [] },
    process: { heading: "", steps: [steps[0] ?? "", steps[1] ?? "", steps[2] ?? ""] },
    related: {
      heading: "",
      intro: "",
      items: SERVICES.filter((s) => s.slug !== service.slug)
        .slice(0, 3)
        .map((s) => ({ slug: s.slug, body: s.summary })),
    },
    closing: "",
  };
}
