// The publishing lines, as carousel cards. Every card lands on one of the
// three product destinations — Books, eBooks or Law Reports — because the
// whole card is the link now, and a card that reads as one thing should not
// take you somewhere else. Shape mirrors what CardCarousel
// renders: a category chip, a title, a plate photograph, a short body and a
// destination. Ordered the way an enquiry usually arrives — primary law first,
// then commentary, then the formats and services around them.
export const publishingLines = [
  {
    id: 'statutes',
    chip: 'Primary law',
    title: 'Statutes',
    body: 'The Laws of Kenya — a 24-volume compilation of everything in force, with Chapters, yearly Acts and key subsidiary legislation, in loose-leaf so a set can be kept current.',
    img: '/assets/plate-library.jpg',
    to: '/books',
    cta: 'Browse statutes'
  },
  {
    id: 'reports',
    chip: 'Primary law',
    title: 'Law Reports',
    body: 'Reported judgments from Kenya, Uganda, Tanzania, Zanzibar and South Sudan, with landmark decisions of the COMESA Court — headnoted, catchworded and cross-cited by our own editors.',
    img: '/assets/plate-wide.jpg',
    to: '/llr',
    cta: 'Go to Law Reports'
  },
  {
    id: 'commentaries',
    chip: 'Commentary',
    title: 'Commentaries & treatises',
    body: 'Practitioner and academic titles across administrative, arbitration, banking, commercial, constitutional, criminal, employment, land and tax law.',
    img: '/assets/plate-hero-3.jpg',
    to: '/books',
    cta: 'Browse titles'
  },
  {
    id: 'journals',
    chip: 'Periodicals',
    title: 'Journals & digests',
    body: 'The LSK Continuing Professional Development Digest, the Rwanda Law Journal and regional periodicals published with law societies and universities.',
    img: '/assets/plate-article.jpg',
    to: '/books',
    cta: 'Browse the titles'
  },
  {
    id: 'digital',
    chip: 'Digital',
    title: 'eBooks & databases',
    body: 'The same catalogue on desktop, tablet and phone: full-text search inside every title, and one sign-in across all three LawAfrica platforms.',
    img: '/assets/plate-land.jpg',
    to: '/ebooks',
    cta: 'Browse digital books'
  },
  {
    id: 'institutional',
    chip: 'Services',
    title: 'Institutional publishing',
    body: 'Custom and commissioned publishing for firms, courts, ministries and libraries — standing orders, invoicing on account and named editorial contacts.',
    img: '/assets/plate-event.jpg',
    to: '/books',
    cta: 'Browse the catalogue'
  }
];
