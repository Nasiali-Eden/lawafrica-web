// code, title, author, edline, price (display string), juris, format, stock
// format is exactly one of 'Print' or 'Digital' — Books and eBooks are
// separate sections, so a title belongs to one of them, never to both.
const FEATURED = [
  ['CON-25', 'The Law of Contract in Kenya', 'Prof. A. Mwangi', '4th edition · 2025', 'KES 6,500', 'Kenya', 'Print', 'In stock'],
  ['CST-24', 'Constitutional Practice in East Africa', 'J. Otieno SC', '2nd edition · 2024', 'KES 7,200', 'East Africa', 'Print', 'In stock'],
  ['LND-25', 'Land Law and Conveyancing', 'Dr. M. Wanjiru', '3rd edition · 2025', 'KES 5,900', 'Kenya', 'Digital', 'Instant access'],
  ['EMP-24', 'Employment and Labour Relations', 'C. Njoroge', '1st edition · 2024', 'KES 4,850', 'Kenya', 'Print', 'In stock']
];

const REST = [
  ['CIV-25', 'Civil Procedure: A Practitioner Guide', 'H. Kimani', '5th edition · 2025', 'KES 8,100', 'Kenya', 'Print', 'In stock'],
  ['TAX-24', 'Taxation of Business Income', 'S. Achieng', '2nd edition · 2024', 'KES 6,050', 'East Africa', 'Print', 'Low stock'],
  ['FAM-23', 'Family Law and Succession', 'Dr. P. Mutua', '3rd edition · 2023', 'KES 5,400', 'Kenya', 'Digital', 'Instant access'],
  ['ARB-25', 'Commercial Arbitration in the Region', 'L. Hassan', '1st edition · 2025', 'KES 7,600', 'East Africa', 'Print', 'In stock'],
  ['CRM-24', 'Criminal Law and Evidence', 'G. Ochieng', '4th edition · 2024', 'KES 6,300', 'Tanzania', 'Print', 'In stock']
];

function mk([code, title, author, edline, price, juris, format, stock]) {
  return {
    code, title, author, edline, price, juris, format, stock,
    stockColor: stock.indexOf('In stock') === 0 ? 'var(--color-success)' : 'var(--color-neutral-700)',
    fmt: format === 'Digital' ? 'Digital' : 'Print',
    unit: Number(String(price).replace(/[^0-9]/g, ''))
  };
}

export const featured = FEATURED.map(mk);
export const books = FEATURED.concat(REST).map(mk);


export const biblio = [
  { k: 'Edition', v: '4th edition, revised' }, { k: 'Publication date', v: 'March 2025' },
  { k: 'ISBN (print)', v: '978-9966-031-88-4' }, { k: 'ISBN (eBook)', v: '978-9966-031-89-1' },
  { k: 'Extent', v: '742 pages, with tables of cases and statutes' },
  { k: 'Jurisdiction', v: 'Kenya, with comparative notes on Tanzania and Uganda' },
  { k: 'Written for', v: 'Advocates, in-house counsel and final-year students' }
];

export const filters = [
  { name: 'Jurisdiction', opts: [['Kenya', '284', true], ['Tanzania', '96'], ['Uganda', '74'], ['East Africa', '118'], ['South Sudan', '21']] },
  { name: 'Practice area', opts: [['Commercial law', '42', true], ['Constitutional law', '31'], ['Land & conveyancing', '28'], ['Employment', '19'], ['Criminal law', '24']] },
  // One row per mark. The third option here was 'Print + eBook' before a title
  // carried a single format; its count is folded into Print rather than left
  // as a second row with the same label.
  { name: 'Format', opts: [['Print', '498'], ['Digital', '241']] },
  { name: 'Edition year', opts: [['2025–2026', '64'], ['2022–2024', '152'], ['2019–2021', '117'], ['Before 2019', '147']] },
  { name: 'Author', opts: [['Prof. A. Mwangi', '7'], ['J. Otieno SC', '5'], ['Dr. M. Wanjiru', '4'], ['H. Kimani', '3']] }
].map(f => ({ name: f.name, opts: f.opts.map(([label, n, on]) => ({ label, n, on: !!on })) }));

export const jurisdictions = [
  { name: 'Kenya', count: '284' }, { name: 'Tanzania', count: '96' },
  { name: 'Uganda', count: '74' }, { name: 'East Africa (regional)', count: '118' },
  { name: 'South Sudan', count: '21' }, { name: 'Pan-African', count: '43' }
];

export const areas = [
  { name: 'Commercial' }, { name: 'Constitutional' }, { name: 'Land & conveyancing' },
  { name: 'Employment' }, { name: 'Family & succession' }, { name: 'Criminal' },
  { name: 'Tax' }, { name: 'Civil procedure' }, { name: 'Arbitration' }, { name: 'Environment' }
];
