// Titles and authors taken from the LawAfrica printed catalogue
// (LawAfrica Catalogue - 2026.pdf, 53pp). The PDF remains the authority; this
// is the web description of it until a downloadable version is published.
//
// Every entry in the printed catalogue is a soft-back print title, so `format`
// is 'Print' throughout — digital editions are a separate section (/ebooks).
export const catalogueMeta = {
  edition: '2026',
  pages: 53,
  office: 'LawAfrica Publishing (K) Ltd, Funzi Road, off Enterprise Road, Industrial Area, Nairobi, Kenya',
  orderOnline: 'www.lawafrica.com'
};

// The notes the printed catalogue sets out on its ordering pages.
export const orderingNotes = [
  {
    t: 'Ordering',
    b: 'Order online at www.lawafrica.com, or through any of the bookshops listed in the printed catalogue. Where a bookseller has no immediate stock, supplies can be obtained from our main office within a few days.'
  },
  {
    t: 'Bulk orders and trade agents',
    b: 'Special prices are discussed for bulk orders, with concessions extended to the trade. Agents are encouraged to apply for sub-distributorships.'
  },
  {
    t: 'Shipping, postage and handling',
    b: 'Prices are exclusive of shipping and handling charges. Expedited delivery is subject to additional charges.'
  },
  {
    t: 'Publishing proposals',
    b: 'Suggestions for new publishing projects and submissions of manuscripts by experienced and upcoming authors are welcome. Editorial enquiries go to our Publishing Department.'
  }
];

// Image slots the printed catalogue fills with jacket photography. Held as
// placeholders here until the real cover shots are supplied.
export const cataloguePlates = [
  { id: 'cover', label: 'Catalogue cover', note: 'Front cover, 2026 edition' },
  { id: 'spread', label: 'Inside spread', note: 'A typical title page — jacket, format, author and synopsis' },
  { id: 'shelf', label: 'The list in print', note: 'Soft-back titles across six jurisdictions' }
];

// `isbn` is kept as the record's stable key — it is real, read off the printed
// catalogue — but it is not shown: ISBN is not a field this site carries.
function mk([title, author, isbn, subject, juris]) {
  return { title, author, isbn, subject, juris, format: 'Print' };
}

export const catalogueTitles = [
  ['A Textbook on Tax Law in Kenya', 'Dr. Njoroge O. Kimani', '9789966530936', 'Tax', 'Kenya'],
  ['A Guide to the Laws of Kenya', 'Pravin Bowry, SC', '9789966530981', 'General', 'Kenya'],
  ['A Handbook on Company Law', 'K. I. Laibuta', '9789966530646', 'Commercial', 'Kenya'],
  ['Contract Law', 'Catherine Riungu-Oyier & Lereko Obonyo', '9789966530950', 'Commercial', 'Kenya'],
  ['Criminal Prosecution and Essence of Criminal Offences in Kenya', 'Kingstone Oyier', '9789966530738', 'Criminal', 'Kenya'],
  ['Luo Customary Law', 'Justice Charles Nyawello', '9789966530561', 'Customary', 'Kenya'],
  ['Supreme Court of Kenya Case Digest', 'Erick Masafu', '9789966530851', 'Reports & digests', 'Kenya'],
  ['Legal Practice Management', 'Dr. Mary Kimari', '9789966530905', 'Practice', 'Kenya'],
  ['Principles for the Bar Exam', 'Christopher Rosana', '9789966531001', 'Study', 'Kenya'],
  ['African Customary Law: Developing an African Jurisprudence', 'Dr. Peter Onyango', '9789966031341', 'Customary', 'East Africa'],
  ['The Law of Matrimonial Property in East Africa', 'John Mugalula', '9789966530868', 'Family & succession', 'East Africa'],
  ['Research Methodology Simplified', 'Dr. Scholastica Omondi & Dr. Michael Sitawa', '9789966530769', 'Study', 'East Africa'],
  ['Revenue Law in Uganda', 'Prof. David Bakibinga', '9789966031259', 'Tax', 'Uganda'],
  ['Equity and Trusts', 'Prof. David Bakibinga', '9789966153272', 'Equity', 'Uganda'],
  ['Employment and Industrial Relations Law in Uganda', 'John Mugalula', '9789966530912', 'Employment', 'Uganda'],
  ['Principles of Judicial Review in Uganda', 'Yusuf Kiwanda', '9789966530967', 'Administrative', 'Uganda'],
  ['White Collar Crime in Uganda: Corruption & Related Offences', 'Tuhairwe Herman', '9789966530974', 'Criminal', 'Uganda'],
  ['Alternative Dispute Resolution: A Ugandan Court Experience', 'Hon. Justice Geoffrey Kiryabwire', '9789966530998', 'Arbitration', 'Uganda'],
  ['Administration of Justice in Mainland Tanzania', 'Frank Mirindo', '9789966031167', 'Practice', 'Tanzania'],
  ['Manual for Court of Appeal Rules of Tanzania, 2009', 'Dr. Steven J. Bwana & Mashauri K. Benjamin', '9789966530660', 'Practice', 'Tanzania']
].map(mk);

export const catalogueJurisdictions = ['Kenya', 'Uganda', 'Tanzania', 'East Africa'];
