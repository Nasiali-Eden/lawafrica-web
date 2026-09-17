import { contacts } from '../data/footer.js';

// The four ways of reaching us, as cards. This appears both in the home page's
// "Get in touch" band and on the contact page; it lives here so the two cannot
// drift into different treatments of the same four routes, which is what had
// happened — a ledger in one place and a grid of plain boxes in the other.
//
// Each card opens on a maroon rule with its number set against the kicker, and
// closes on a reach block ruled off from the description, so it has a top, a
// middle and a foot rather than five stacked lines.
export default function ContactRoutes() {
  return (
    <div className="contact-cards">
      {contacts.map((c, i) => (
        <article key={c.email} className="contact-card">
          <div className="contact-card-top">
            <span className="contact-card-kicker">{c.kicker}</span>
            <span className="contact-card-index tnum" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <h3>{c.title}</h3>
          <p>{c.body}</p>
          <div className="contact-card-reach">
            <a href={`mailto:${c.email}`}>{c.email}</a>
            <a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>
          </div>
        </article>
      ))}
    </div>
  );
}
