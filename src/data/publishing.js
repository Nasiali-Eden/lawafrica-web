// The publishing lines, as carousel cards. Every card lands on one of the
// three product destinations — Books, eBooks or Law Reports — because the
// whole card is the link now, and a card that reads as one thing should not
// take you somewhere else. Shape mirrors what CardCarousel
// renders: a category chip, a title, a plate photograph, a short body and a
// destination. Cards carry no photograph: each takes a ground colour from the
// brand palette (`tone`), so the row is told apart by colour and type. Ordered the way an enquiry usually arrives — primary law first,
// then commentary, then the formats and services around them.
export const publishingLines = [
  {
    id: 'statutes',
    tone: 'maroon',
    chip: 'Primary law',
    title: 'Statutes',
    body: 'The Laws of Kenya — a 24-volume compilation of everything in force, with Chapters, yearly Acts and key subsidiary legislation, in loose-leaf so a set can be kept current.',
    to: '/books',
    cta: 'Browse statutes'
  },
  {
    id: 'reports',
    tone: 'navy',
    chip: 'Primary law',
    title: 'Law Reports',
    body: 'Reported judgments from Kenya, Uganda, Tanzania, Zanzibar and South Sudan, with landmark decisions of the COMESA Court — headnoted, catchworded and cross-cited by our own editors.',
    to: '/llr',
    cta: 'Go to Law Reports'
  },
  {
    id: 'commentaries',
    tone: 'white',
    chip: 'Commentary',
    title: 'Commentaries & treatises',
    body: 'Practitioner and academic titles across administrative, arbitration, banking, commercial, constitutional, criminal, employment, land and tax law.',
    to: '/books',
    cta: 'Browse titles'
  },
  {
    id: 'digital',
    tone: 'grey',
    chip: 'Digital',
    title: 'eBooks & databases',
    body: 'The same catalogue on desktop, tablet and phone: full-text search inside every title, and one sign-in across all three LawAfrica platforms.',
    to: '/ebooks',
    cta: 'Browse digital books'
  },
  {
    id: 'institutional',
    tone: 'deep',
    chip: 'Services',
    title: 'Institutional publishing',
    body: 'Custom and commissioned publishing for firms, courts, ministries and libraries — standing orders, invoicing on account and named editorial contacts.',
    to: '/books',
    cta: 'Browse the catalogue'
  }
];
