import { contacts } from '../data/footer.js';

// The four ways of reaching us. Shared by the home page's "Get in touch" band
// and the contact page so the two cannot drift apart.
//
// Each route is a plain light card — no coloured edge or tinted badge — with
// the two ways in, write or ring, as separate full-width actions.

const Mail = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 7 8.5 6 8.5-6" /></svg>
);
const Phone = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
);

export default function ContactRoutes() {
  return (
    <div className="route-cards">
      {contacts.map(c => (
        <article key={c.email} className="route-card">
          <span className="route-badge">{c.kicker}</span>
          <h3>{c.title}</h3>
          <p>{c.body}</p>
          <div className="route-actions">
            <a href={`mailto:${c.email}`}><Mail /><span translate="no">{c.email}</span></a>
            <a href={`tel:${c.phone.replace(/\s/g, '')}`}><Phone /><span translate="no">{c.phone}</span></a>
          </div>
        </article>
      ))}
    </div>
  );
}
