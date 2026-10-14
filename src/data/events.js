// The events diary. Hardcoded: events have no source upstream, so each entry is
// written here by hand, from what its poster or announcement actually says.
// Fields a source does not state are left out, and the pages leave them out
// too (time, venue, price, registration link, agenda, speakers). Do not fill
// them with guesses.
//
// To add the poster itself, put the file in public/assets/ and set `img` to
// asset('/assets/<file>').
export const events = [
  {
    id: 'lsk-legal-awareness-week-2026',
    d: '26', mo: 'Oct', yr: '2026',
    dates: '26–30 October 2026',
    kind: 'Awareness week',
    title: 'Legal Awareness Week 2026',
    organiser: 'Law Society of Kenya',
    where: 'Organised by the Law Society of Kenya · 1 CPD point',
    body: 'Theme: Community Advocates — Bridging the Gap Between People and Justice.',
    lede: 'Community Advocates: Bridging the Gap Between People and Justice.',
    cpd: '1 CPD point',
    // where to ask: the organiser's own site. The poster gives no registration
    // link, email or phone, so none is invented.
    contact: { label: 'Contact the organisers for more info', href: 'https://lsk.or.ke' },
    note: 'Registration details, venue and times were not on the poster. Confirm them with the Law Society of Kenya before attending.'
  }
];
