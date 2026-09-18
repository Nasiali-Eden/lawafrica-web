// Accounts were removed from this release, so signing in hands off to the
// existing platform — the same treatment Law Reports gets. Change this one
// constant if the account ever moves.
export const ACCOUNT_URL = 'https://www.lawafrica.com/login';

// One hero. It was a four-slide rotation; the images no longer switch, so the
// content is a single record rather than an array, and the slide picker that
// used to sit beside it has gone with the rotation.
export const hero = {
  img: '/assets/plate-hero-1.jpg',
  eyebrow: 'Know. Do. Be More',
  titleLead: 'Trusted Legal Knowledge.',
  titleTail: 'Innovative Digital Solutions.',
  body: 'LawAfrica provides authoritative legal publishing, research resources and technology solutions that empower advocates, legal practitioners, law students and institutions with trusted knowledge for learning, research and practice.'
};


export const proof = [
  { num: '1999', label: 'Founded in Nairobi', note: 'The pioneer online law-reporting firm in East Africa.' },
  { num: '10,000+', label: 'Verified subscribers', note: 'Firms, courts, universities and government departments.' },
  { num: '480', label: 'Titles in print and digital', note: 'Across six African jurisdictions and regional coverage.' },
  { num: '25 yrs', label: 'Of continuous law reporting', note: 'Headnoted and cross-cited by our own editorial team.' }
];
