import { asset } from '../lib/format.js';
function art(o) {
  return { kind: 'Articles', live: false, img: asset('/assets/plate-article.jpg'), ...o, img: o.img || asset('/assets/plate-article.jpg') };
}

export const allArticles = [
  art({ id: 'wht', img: asset('/assets/article-library.jpg'), pillar: 'Legal update', title: 'One year of the Finance Act 2025: the withholding provisions as chambers actually meet them',
    dek: 'The public-supply deduction, the widened royalty definition and the shipping charge have settled into practice. Three drafting consequences for facility and supply agreements.',
    meta: 'Editorial team · 12 Aug 2026 · 8 min', author: 'LawAfrica editorial team', role: 'Tax and commercial desk', date: '12 August 2026', read: '8 min read', live: true }),
  art({ id: 'sectional', img: asset('/assets/article-land.jpg'), pillar: 'Practice insight', title: 'Sectional title conversion: a procedural map for conveyancers',
    dek: 'Long-term leases over multi-unit developments must migrate to sectional titles. Where the conversion stalls, and what the Environment and Land Court has said about the developer’s duty.',
    meta: 'Dr. M. Wanjiru · 2 Aug 2026 · 11 min', author: 'Dr. M. Wanjiru', role: 'Advocate of the High Court of Kenya; contributing author', date: '2 August 2026', read: '11 min read', live: true }),
  art({ id: 'arbitration', img: asset('/assets/article-contract.jpg'), pillar: 'Practice insight', title: 'Drafting arbitration clauses that survive challenge',
    dek: 'A checklist drawn from the last five years of Court of Appeal decisions on seat and scope.', meta: 'L. Hassan · 4 Aug 2026 · 9 min', author: 'L. Hassan', role: 'Contributing author', date: '4 August 2026', read: '9 min read' }),
  art({ id: 'editions', pillar: 'Academic support', title: 'Which edition does your syllabus actually require?',
    dek: 'A short guide for students and lecturers on reading edition statements and publication dates.', meta: 'Academic desk · 28 Jul 2026 · 4 min', author: 'Academic desk', role: 'LawAfrica', date: '28 July 2026', read: '4 min read' }),
  art({ id: 'clickthrough', pillar: 'Legal update', title: 'Electronic contracting after the 2025 Court of Appeal ruling',
    dek: 'The court clarified when a click-through term is incorporated. What practitioners should change now.', meta: 'Editorial team · 21 Jul 2026 · 7 min', author: 'Editorial team', role: 'Commercial desk', date: '21 July 2026', read: '7 min read' }),
  art({ id: 'newtitles', pillar: 'LawAfrica news', title: 'Twelve new titles for the 2026–27 academic year',
    dek: 'Four new editions and eight first editions join the catalogue, including two Tanzanian texts.', meta: 'LawAfrica · 15 Jul 2026 · 3 min', author: 'LawAfrica', role: 'Publishing', date: '15 July 2026', read: '3 min read' }),
  art({ id: 'kamau', pillar: 'Case note', kind: 'Case notes', title: 'Kamau v Nyaga Holdings Ltd [2026] eKLR 412',
    dek: 'Standard terms supplied after acceptance were not incorporated. What the reasoning means for supply contracts.', meta: 'Reports desk · 6 Aug 2026 · 5 min', author: 'Reports desk', role: 'LawAfrica Law Reports', date: '6 August 2026', read: '5 min read' }),
  art({ id: 'coastal', pillar: 'Case note', kind: 'Case notes', title: 'Coastal Freight Ltd v KRA [2025] eKLR 940',
    dek: 'Customs valuation of related-party imports, and when the Commissioner may depart from a declared price.', meta: 'Reports desk · 19 Jul 2026 · 6 min', author: 'Reports desk', role: 'LawAfrica Law Reports', date: '19 July 2026', read: '6 min read' }),
  art({ id: 'copydesk', pillar: 'From the editors', kind: 'Blog', title: 'Notes from the copy desk: citing unreported judgments',
    dek: 'A short, opinionated post on how we handle citations that have not yet been reported.', meta: 'H. Kimani · 8 Aug 2026 · 3 min', author: 'H. Kimani', role: 'Chief sub-editor', date: '8 August 2026', read: '3 min read' }),
  art({ id: 'stillprint', pillar: 'From the editors', kind: 'Blog', title: 'Why we still print',
    dek: 'Our head of production on paper, chambers habits and what digital has not replaced.', meta: 'Production desk · 24 Jul 2026 · 4 min', author: 'Production desk', role: 'LawAfrica', date: '24 July 2026', read: '4 min read' }),
  art({ id: 'board', pillar: 'Press release', kind: 'Press', title: 'LawAfrica appoints regional editorial board for Tanzania',
    dek: 'Five practitioners and academics join to oversee Tanzanian titles and reporting from October 2026.', meta: 'Press office · 11 Aug 2026', author: 'Press office', role: 'LawAfrica', date: '11 August 2026', read: '2 min read' }),
  art({ id: 'archive', pillar: 'Press release', kind: 'Press', title: 'Law Reports archive passes 25,000 headnoted judgments',
    dek: 'The milestone covers six jurisdictions and twenty-five years of continuous reporting.', meta: 'Press office · 2 Jul 2026', author: 'Press office', role: 'LawAfrica', date: '2 July 2026', read: '2 min read' })
];

export const artBodies = {
  wht: {
    stand: 'The Finance Act 2025 was assented to at the end of June 2025 and, save for two provisions held back to January 2026, took effect on 1 July 2025. A year of returns has now passed through it. The provisions that have generated the most correspondence to this desk are not the headline rate changes but three quieter amendments that reach directly into commercial drafting.',
    keys: [
      { t: 'Supplies of goods to public entities now carry a withholding deduction — half a percent for residents, five percent for non-residents.' },
      { t: 'The royalty definition was widened to reach software distribution, unsettling the position many distributors had relied on.' },
      { t: 'Non-resident shipping income earned on cargo embarked in Kenya was brought into the withholding net, placing the obligation on the Kenyan payer.' }
    ],
    secs: [
      { h: 'Withholding on public supply', ps: [
        { t: 'The amendment that has caused the most immediate administrative work is the deduction on payments for goods supplied to public entities: 0.5% where the supplier is resident and 5% where it is not. It is a modest rate applied to a very large volume of transactions, and because it bites on the payment rather than on profit, it lands on suppliers whose margins may be thinner than the deduction assumes.' },
        { t: 'For counsel drafting supply agreements with a county, a ministry or a state corporation, the practical point is one of allocation. A price expressed as a gross figure without a gross-up or a deduction-acknowledgement clause leaves the supplier to absorb the withholding as a cash-flow cost until it is set against the year’s liability. We have seen three variants in circulation: silence, a bare acknowledgement, and a full gross-up. Only the third protects the supplier, and public entities are, predictably, reluctant to accept it.' }
      ] },
      { h: 'Software, distribution and the widened royalty', ps: [
        { t: 'The definition of royalty was expanded to catch payments made for the use of software through a distributor. The background is a long-running disagreement: distributors and end-user licensees had generally proceeded on the basis that payments conferring no intellectual-property right in the software were outside withholding, a position the Revenue Authority contested and which had been examined by the High Court.' },
        { t: 'The amendment resolves the argument in the Authority’s favour for the future. The drafting consequence is that reseller and distribution agreements written on the older assumption — particularly those with a non-resident licensor and no withholding clause — should be reviewed rather than renewed. Where the contract is silent, the risk of the deduction usually sits with the Kenyan payer, who bears the obligation to withhold and remit whatever the commercial understanding was.' }
      ] },
      { h: 'Shipping income', ps: [
        { t: 'Non-resident shipping companies earning income from cargo or passengers embarked in Kenya were brought into the withholding regime, and the obligation to withhold falls on the Kenyan customer making the payment. Carriers issued advisories to their Kenyan customers through the second half of 2025 setting out who, in a chain involving a local agent, is in fact the recipient of the income.' },
        { t: 'That is the point most likely to be litigated: an agent collecting freight charges into a local account is not necessarily the party to the contract of carriage, and the deduction follows the recipient of the income rather than the holder of the bank account. Freight and logistics agreements should now say plainly which entity contracts, which collects, and against whose income the deduction is to be made.' }
      ] },
      { h: 'Two provisions held to January 2026', ps: [
        { t: 'Advance pricing agreements were introduced with effect from January 2026, giving multinational groups a route to settle a transfer-pricing methodology with the Authority in advance rather than defending it on audit. The second deferred provision directs a share of the import declaration fee towards revenue-collection measures. Neither changes drafting practice, but the first materially changes how a group with related-party dealings in Kenya should sequence its planning.' }
      ] },
      { h: 'What to do this quarter', ps: [
        { t: 'Three things. Re-read the withholding clause in every live public-supply contract and price the deduction rather than discovering it. Pull the software distribution agreements with non-resident licensors and check who bears the deduction. And in freight arrangements, identify the recipient of the income in the document itself, so the withholding question is answered before the invoice arrives.' }
      ] }
    ],
    sources: [
      { t: 'Finance Act 2025 (Kenya), assented June 2025; in force 1 July 2025 save for two provisions from 1 January 2026' },
      { t: 'Firm and advisory commentary on the Act, published July 2025' },
      { t: 'Carrier advisories to Kenyan customers on withholding on shipping income, 2025' }
    ]
  },
  sectional: {
    stand: 'The Sectional Properties Act 2020 replaced a patchwork of long-term leasehold arrangements over multi-unit developments with a single title regime. Six years on, the conversion is still working through the registries, and the questions arriving at this desk are almost entirely procedural: who initiates, what the surveyor needs, and what happens to a unit whose building has not been converted.',
    keys: [
      { t: 'Apartments, flats and maisonettes on one parcel held under leases of over twenty-one years fall to be converted to sectional titles.' },
      { t: 'Conversion runs through a surveyed sectional plan prepared from the county-approved building plan, on a geo-referenced mother parcel.' },
      { t: 'The developer’s obligation to register the plan and surrender the head title has been enforced by the Environment and Land Court.' }
    ],
    secs: [
      { h: 'What the Act requires', ps: [
        { t: 'The Act provides the architecture for dividing a parcel and the buildings on it into sectional units, common property and, where applicable, limited common property, with a management corporation constituted to hold and administer what is shared. Read with the land registration legislation, it requires the holder of a long-term sub-lease intended to confer ownership of a unit to move that interest onto a sectional title.' },
        { t: 'The mechanism is a surrender: the original title is surrendered to the Registrar, who effects the conversion and opens a register for each unit. The Regulations gazetted in late 2021 supplied the forms and the detail, and registration of sectional plans has since proceeded countrywide.' }
      ] },
      { h: 'The conversion in order', ps: [
        { t: 'First, establish the title and lease position with a current official search — registered proprietor, encumbrances, the term and structure of the sub-leases. Second, confirm the mother parcel is geo-referenced and approved by the Survey Department; much of Nairobi now is, but this is where provincial conversions most often stall.' },
        { t: 'Third, instruct a surveyor, who prepares the sectional plan from the approved building plan. The surveyor will want the land search, the construction permit and the floor plans, and the structures must actually be erected — a plan cannot precede the building. Fourth, the plan is authenticated by the Director of Survey. Fifth, the plan is lodged and the head title surrendered. Sixth, unit registers are opened and titles issue. Seventh, the management corporation is constituted and the common property vested in it.' },
        { t: 'Each stage has its own professional actor and its own approval gate, which is why a realistic timetable is measured in months rather than weeks, and why an undertaking given to a purchaser on completion should never be tied to the issue of a unit title.' }
      ] },
      { h: 'The developer’s duty', ps: [
        { t: 'The point of most practical consequence for a conveyancer acting on a purchase is that the duty to convert is not the buyer’s. The Environment and Land Court has held, in a 2025 decision on a dispute over unconverted long-term sub-leases, that where sub-leases are intended to confer ownership of apartments the developer is obliged to register a sectional plan and surrender the original title so that separate unit registers can be opened.' },
        { t: 'That gives a purchaser something to hold on to where a developer has taken the price and left the title regime unattended. It also means a due-diligence report on a unit in an unconverted building should say so in terms, and should identify who is obliged to act.' }
      ] },
      { h: 'Where the register is closed to you', ps: [
        { t: 'The sanction is registration itself. Where a building should have been converted and has not been, a restriction on the title blocks dealings — transfers, charges, leases, succession. The practical effect is that the unit cannot be sold, cannot be charged to a lender and cannot pass cleanly on death, which for most owners is worse than any penalty.' },
        { t: 'A separate line of authority is worth keeping in view. Conversion between registration regimes is a migration of the record, not a re-writing of the interest: the Environment and Land Court has held that rights and interests in land do not change merely because the title has been converted. A party who was entitled before conversion is entitled after it, and a conversion cannot be used to launder a defect.' }
      ] },
      { h: 'For the file', ps: [
        { t: 'On every multi-unit transaction: search first, ask whether a sectional plan is registered, ask whether the mother parcel is geo-referenced, and get the answer on the completion statement rather than in correspondence. Where conversion is outstanding, price the delay and put the developer’s obligation in the sale agreement in express terms.' }
      ] }
    ],
    sources: [
      { t: 'Sectional Properties Act 2020 (Kenya); Sectional Properties Regulations 2021' },
      { t: 'Land Registration Act 2012, s. 54(5)' },
      { t: 'Skyview Properties Ltd & another v Njoroge (Environment and Land Court, 2025)' },
      { t: 'Shah v Kulmia & 4 others [2025] KEELC 3073 (KLR)' }
    ]
  }
};

// Each pillar takes a secondary colour from the brand palette, so a row of
// article cards is told apart at a glance and the page is not all maroon.
const PILLAR_INK = {
  'Legal update': 'var(--navy-ink)',
  'Practice insight': 'var(--teal-ink)',
  'Academic support': 'var(--azure-800)',
  'LawAfrica news': 'var(--tan-ink)',
  'Case note': 'var(--coral-ink)',
  'From the editors': 'var(--color-neutral-700)',
  'Press release': 'var(--navy-ink)'
};
export const pillarInk = p => PILLAR_INK[p] || 'var(--color-accent-700)';
