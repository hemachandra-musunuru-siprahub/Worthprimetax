/*
 * Service-page FAQs, word for word from the client's "WP US Website - FAQs" document
 * (2026-10-29). Keep the wording exact: answers carry service-scope qualifications.
 * Groups with a title render under that subheading; a page with one untitled group has none.
 */
export type ServiceFaq = { q: string; a: string };
export type ServiceFaqGroup = { title?: string; faqs: ServiceFaq[] };

const SERVICE_FAQS: Record<string, ServiceFaqGroup[]> = {
  "us-tax-services": [
    {
      title: "Personal Tax Filings",
      faqs: [
        {
          q: "What is included in US personal tax filing services?",
          a: "We prepare eligible federal and state tax returns, report income, and review applicable deductions and credits using forms such as Form 1040 or Form 1040-NR.",
        },
        {
          q: "Who needs to file a US personal tax return?",
          a: "US citizens, resident aliens, and certain nonresident aliens may need to file based on their income, residency, filing status, and other IRS rules.",
        },
        {
          q: "What happens if I do not file my required tax return?",
          a: "You may face late-filing penalties, interest on unpaid taxes, collection action, or loss of refund opportunities.",
        },
        {
          q: "Can you help US citizens living abroad and non-US residents?",
          a: "Yes, subject to our service scope. We assist eligible taxpayers with Form 1040 or Form 1040-NR and applicable international tax reporting.",
        },
      ],
    },
    {
      title: "Business Tax Filings",
      faqs: [
        {
          q: "What is covered under business tax filing services?",
          a: "We assist with federal and applicable state business tax returns, income and expense reporting, deductions, supporting schedules, and electronic filing.",
        },
        {
          q: "Which businesses need to file tax returns?",
          a: "Corporations, partnerships, and certain LLCs must file applicable returns. Sole proprietors generally report business income on Form 1040, often using Schedule C.",
        },
        {
          q: "What happens if a business fails to file its tax return?",
          a: "Late filing may result in penalties, interest, tax assessments, and loss of good standing or other compliance consequences.",
        },
        {
          q: "Do foreign-owned US businesses have special filing requirements?",
          a: "Yes. Depending on the entity and ownership, filings may include Form 1120-F, Form 5472, or Form 1065, along with applicable state returns.",
        },
      ],
    },
  ],
  "business-formation-entity-structuring": [
    {
      faqs: [
        {
          q: "What is included in business formation services?",
          a: "We assist with LLC or corporation formation, EIN applications using Form SS-4, organizational documents, and applicable registration requirements.",
        },
        {
          q: "Who should use business formation and structuring services?",
          a: "Entrepreneurs, startups, investors, and foreign founders who want to establish or restructure a US business may benefit from these services.",
        },
        {
          q: "Can you help choose between an LLC and a corporation?",
          a: "Yes. We explain common tax and administrative differences and help assess suitable structures based on your business needs.",
        },
        {
          q: "What happens if a business fails to maintain required registrations?",
          a: "It may face state penalties, loss of good standing, administrative dissolution, or tax registration problems.",
        },
      ],
    },
  ],
  "accounting-bookkeeping": [
    {
      faqs: [
        {
          q: "What is covered under accounting and bookkeeping services?",
          a: "We record transactions, reconcile accounts, maintain ledgers, track receivables and payables, and prepare financial reports.",
        },
        {
          q: "Who needs bookkeeping services?",
          a: "Startups, LLCs, corporations, freelancers, and growing businesses can benefit from accurate and organized financial records.",
        },
        {
          q: "What happens if bookkeeping records are inaccurate or incomplete?",
          a: "Poor records may cause incorrect tax filings, missed deductions, financial reporting errors, and audit complications.",
        },
        {
          q: "How often should bookkeeping be performed?",
          a: "Monthly bookkeeping is common, but businesses with higher transaction volumes may need weekly or more frequent updates.",
        },
      ],
    },
  ],
  "us-payroll-services": [
    {
      faqs: [
        {
          q: "What is included in US payroll services?",
          a: "We assist with payroll calculations, tax withholding, payroll tax deposits, employee pay statements, and applicable payroll tax filings.",
        },
        {
          q: "Who needs payroll services?",
          a: "US employers with employees generally need to comply with wage payment, tax withholding, reporting, and employment tax requirements.",
        },
        {
          q: "What happens if payroll taxes are not filed or paid on time?",
          a: "Employers may face penalties, interest, back-pay obligations, and potential personal liability for certain unpaid employment taxes.",
        },
        {
          q: "Do you prepare year-end payroll forms?",
          a: "Depending on the service package, we assist with Forms W-2 and W-3 for employees, Form 1099-NEC for qualifying contractors, and applicable annual or quarterly payroll returns.",
        },
      ],
    },
  ],
  "audit-financial-assurance": [
    {
      faqs: [
        {
          q: "What is covered under audit and financial assurance services?",
          a: "Depending on the engagement, services may include financial statement audits, reviews, compilations, and agreed-upon procedures.",
        },
        {
          q: "Which businesses may require an audit?",
          a: "Businesses may need audits due to regulatory requirements, lender conditions, investor agreements, grant requirements, or contractual obligations.",
        },
        {
          q: "What happens if a required audit is not completed?",
          a: "Non-compliance may result in regulatory issues, contractual breaches, financing delays, or loss of eligibility for certain funding.",
        },
        {
          q: "Is a compilation the same as an audit?",
          a: "No. An audit provides reasonable assurance, a review provides limited assurance, and a compilation presents financial information without providing assurance.",
        },
      ],
    },
  ],
  "irs-audit-notice-resolution": [
    {
      faqs: [
        {
          q: "What is included in IRS audit and notice resolution services?",
          a: "We assist with reviewing IRS notices, organizing supporting records, preparing responses, and discussing appropriate resolution options within the agreed service scope.",
        },
        {
          q: "Who should seek IRS notice or audit assistance?",
          a: "Individuals and businesses receiving audit letters, balance-due notices, penalty assessments, or requests for supporting documents may need professional assistance.",
        },
        {
          q: "What happens if I ignore an IRS notice?",
          a: "Ignoring a notice may lead to missed appeal deadlines, additional penalties or interest, proposed tax adjustments, or collection action.",
        },
        {
          q: "Can you represent me before the IRS?",
          a: "Representation may be available through appropriately authorized professionals. Form 2848 generally authorizes eligible representatives, while Form 8821 authorizes specified tax information access but does not grant representation authority.",
        },
      ],
    },
  ],
  "fbar-fatca-boir-compliance": [
    {
      title: "FBAR and BOIR Compliance",
      faqs: [
        {
          q: "What is FBAR filing, and who must file it?",
          a: "US persons generally must file FinCEN Form 114 if their foreign financial accounts collectively exceeded $10,000 at any time during the calendar year, subject to exceptions.",
        },
        {
          q: "What is BOIR, and which businesses need to file?",
          a: "BOIR is a Beneficial Ownership Information Report. Under FinCEN's current rules, US-created entities are exempt from federal BOI reporting, while certain foreign entities registered in the US may remain subject to reporting requirements.",
        },
        {
          q: "What happens if a required FBAR or BOIR report is not filed?",
          a: "Failure to file a required FBAR can result in substantial civil penalties and, in certain cases, criminal penalties. BOI obligations and consequences depend on the entity's status under current rules.",
        },
        {
          q: "Are FBAR and BOIR included in income tax returns?",
          a: "No. FBAR is filed separately through FinCEN. BOIR, when required, is also a separate filing. Neither replaces an applicable income tax return.",
        },
      ],
    },
    {
      title: "FATCA and PFIC Compliance",
      faqs: [
        {
          q: "What is covered under FATCA compliance services?",
          a: "We review applicable foreign financial asset reporting requirements and assist with Form 8938 and related disclosures where required.",
        },
        {
          q: "Who needs FATCA reporting assistance?",
          a: "Certain US taxpayers holding specified foreign financial assets may need to file Form 8938 if applicable reporting thresholds are met.",
        },
        {
          q: "What is a PFIC, and who needs to report it?",
          a: "A Passive Foreign Investment Company (PFIC) is a foreign corporation meeting specific US tax tests. US taxpayers holding PFIC investments may need to file Form 8621.",
        },
        {
          q: "What are the consequences of missing FATCA or PFIC reporting?",
          a: "Depending on the form and circumstances, non-compliance may result in penalties, additional tax, interest, or delayed tax processing.",
        },
      ],
    },
  ],
  "itin-services": [
    {
      faqs: [
        {
          q: "What is an ITIN, and what does your service cover?",
          a: "An Individual Taxpayer Identification Number (ITIN) is issued by the IRS to eligible individuals who need a US tax identification number but are not eligible for an SSN. We assist with Form W-7 and supporting documentation.",
        },
        {
          q: "Who may need an ITIN?",
          a: "Certain nonresident or resident aliens, spouses, dependents, and other eligible individuals may need an ITIN for federal tax purposes.",
        },
        {
          q: "What happens if I need an ITIN but do not obtain one?",
          a: "You may experience delays in filing or processing tax returns or claiming eligible tax benefits.",
        },
        {
          q: "Does an ITIN expire?",
          a: "Some ITINs expire under IRS rules and may require renewal using Form W-7 if still needed.",
        },
      ],
    },
  ],
  "amended-tax-returns": [
    {
      faqs: [
        {
          q: "What is included in tax amendment services?",
          a: "We review previously filed returns, identify errors, recalculate tax amounts, prepare applicable amended forms, and assist with filing.",
        },
        {
          q: "When should I amend a tax return?",
          a: "You may need an amendment if you omitted income, claimed incorrect deductions or credits, or reported other material information incorrectly.",
        },
        {
          q: "What happens if tax return errors remain uncorrected?",
          a: "Errors may result in additional tax assessments, interest, penalties, incorrect refunds, or IRS inquiries.",
        },
        {
          q: "Is there a deadline to amend a tax return?",
          a: "Refund claims are generally subject to a three-year-from-filing or two-year-from-payment rule, whichever is later, subject to exceptions. Other amendment deadlines may differ.",
        },
      ],
    },
  ],
  "legal-business-document-drafting": [
    {
      faqs: [
        {
          q: "What is included in business document drafting services?",
          a: "We assist with preparing business agreements and organizational documents based on the agreed scope, transaction, and applicable jurisdiction.",
        },
        {
          q: "Who needs business document drafting services?",
          a: "Startups, LLC owners, corporations, partnerships, and businesses entering contracts or changing ownership may need properly documented agreements.",
        },
        {
          q: "What are the risks of not having appropriate business documents?",
          a: "Missing or unclear agreements may lead to ownership disputes, payment conflicts, contractual uncertainty, and costly litigation.",
        },
        {
          q: "Do your services include legal advice?",
          a: "The scope depends on the provider's qualifications and engagement. Legal advice and representation are provided by appropriately licensed attorneys where required.",
        },
      ],
    },
  ],
};

/** FAQ groups for a service's detail page; empty when the client has supplied none. */
export function getServiceFaqs(slug: string): ServiceFaqGroup[] {
  return SERVICE_FAQS[slug] ?? [];
}
