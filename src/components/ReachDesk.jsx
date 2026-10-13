import { contacts } from '../data/footer.js';

// Home-page "Get in touch": a directory. Four desks as ruled rows — number,
// who it is for, what they handle, and the two ways in — so the whole list can
// be scanned in one pass and nothing is hidden behind a click.
export default function ReachDesk() {
  return (
    <ol className="dir">
      {contacts.map((c, n) => (
        <li key={c.email} className="dir-row">
          <span className="dir-n tnum" aria-hidden="true">{String(n + 1).padStart(2, '0')}</span>
          <div className="dir-who">
            <span className="dir-kicker">{c.kicker}</span>
            <h3>{c.title}</h3>
          </div>
          <p className="dir-what">{c.body}</p>
          <div className="dir-how">
            <a href={`mailto:${c.email}`} translate="no">{c.email}</a>
            <a href={`tel:${c.phone.replace(/\s/g, '')}`} translate="no">{c.phone}</a>
          </div>
        </li>
      ))}
    </ol>
  );
}
