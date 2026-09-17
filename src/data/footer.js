export const contacts = [
  { kicker: 'Sales', title: 'Books and orders', body: 'Availability, pricing, delivery and payment for individual purchases.', email: 'sales@lawafrica.com', phone: '+254 20 249 5067' },
  { kicker: 'Institutional', title: 'Firms, courts and libraries', body: 'Quotations, standing orders, consolidated invoicing and account management.', email: 'institutions@lawafrica.com', phone: '+254 20 249 5068' },
  { kicker: 'Support', title: 'Digital access and accounts', body: 'eBook access, sign-in problems and Law Reports subscriptions.', email: 'support@lawafrica.com', phone: '+254 20 249 5069' },
  { kicker: 'Publishing', title: 'Authors and proposals', body: 'Manuscript submissions, commissioning and rights enquiries.', email: 'publishing@lawafrica.com', phone: '+254 20 249 5070' }
];

export const footerCols = [
  { name: 'Products', links: [
    { t: 'All books', to: '/books' }, { t: 'Digital books', to: '/ebooks' }, { t: 'Law Reports', to: '/reports' },
    { t: 'New releases', to: '/books' }, { t: 'Subscriptions', to: '/reports' }
  ] },
  { name: 'Practice & study', links: [
    { t: 'Practice material', to: '/practice?aud=pro' }, { t: 'Set texts & reading lists', to: '/practice?aud=stu' },
    { t: 'Institutions & libraries', to: '/institutions' }, { t: 'Authors', to: '/publish' }
  ] },
  { name: 'LawAfrica', links: [
    { t: 'About us', to: '/about' }, { t: 'Insights & blog', to: '/insights' }, { t: 'Events & webinars', to: '/insights?feed=Events' },
    { t: 'Press releases', to: '/insights?feed=Press' }, { t: 'Publish with LawAfrica', to: '/publish' },
    { t: 'Contact', to: '/contact' }, { t: 'Careers', to: '/careers' }
  ] }
];
