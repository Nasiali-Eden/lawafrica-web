import { Link } from 'react-router-dom';
import Plate from '../components/Plate.jsx';

const WHAT = [
  ['Practitioner texts', 'Working books with forms, precedents and procedure, kept current through new editions.'],
  ['Student texts', 'Set texts written to a syllabus, priced for students and supported with lecturer copies.'],
  ['Monographs', 'Single-subject scholarship, including revised theses, where the argument earns a book.'],
  ['Reports & digests', 'Reporting and digest work with our own editorial desk, by jurisdiction or subject.']
];

const STEPS = [
  ['01', 'Proposal', 'A synopsis, a chapter outline, the market you are writing for, and a sample chapter if you have one.'],
  ['02', 'Peer review', 'Two readers in the field, one academic and one in practice. Four to six weeks.'],
  ['03', 'Contract and schedule', 'Royalty terms, delivery date and the edition cycle agreed in writing before you write.'],
  ['04', 'Editing and production', 'Substantive edit, copy-edit against our house style, typesetting, proofs and index.'],
  ['05', 'Publication and beyond', 'Print and eBook together, launch, course adoption, and the next edition when the law moves.']
];

export default function Publish() {
  return (
    <div className="page" style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 24px 72px' }}>
      <div className="stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 380px', gap: 52, alignItems: 'start', paddingBottom: 34, borderBottom: '1px solid var(--color-text)', marginBottom: 38 }}>
        <div>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 14 }}>For authors</div>
          <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.05, margin: '0 0 16px', maxWidth: '22ch' }}>Publish with LawAfrica</h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)', margin: '0 0 16px', maxWidth: '62ch' }}>We publish practitioner texts, student texts and monographs for the East African market, in print and digital, with our own editorial and reporting desks behind them. If you are teaching a course without a current text, or defending a proposition that deserves a book, we would like to hear from you.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="btn" to="/contact" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 44, textDecoration: 'none' }}>Submit a proposal</Link>
            <Link className="btn btn-secondary" to="/contact" style={{ minHeight: 44, textDecoration: 'none' }}>Talk to a commissioning editor</Link>
          </div>
        </div>
        <Plate src="/assets/plate-cover.jpg" aspectRatio="4/5" />
      </div>

      <section style={{ marginBottom: 44 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 20px' }}>What we publish</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: '0 30px' }}>
          {WHAT.map(([t, b]) => (
            <div key={t} style={{ borderTop: '1px solid var(--color-text)', paddingTop: 14 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 8px' }}>{t}</h3>
              <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0 }}>{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stack" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 52, marginBottom: 44 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 18px' }}>How a proposal moves</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {STEPS.map(([n, t, b], i) => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', gap: 16, padding: '15px 0', borderTop: '1px solid var(--color-divider)', borderBottom: i === STEPS.length - 1 ? '1px solid var(--color-divider)' : undefined }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', color: 'var(--color-accent-700)' }}>{n}</span>
                <div><div style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', marginBottom: 4 }}>{t}</div><p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0 }}>{b}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 18px' }}>What we ask, what we give</h2>
          <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 22, marginBottom: 16 }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 11 }}>We give</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)' }}>
              <li>Royalties on net receipts, paid twice a year</li>
              <li>A named editor from proposal to proofs</li>
              <li>Print and digital distribution across six jurisdictions</li>
              <li>Course-adoption support and lecturer copies</li>
              <li>Your citations checked against our own reports</li>
            </ul>
          </div>
          <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 22 }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 11 }}>We ask</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)' }}>
              <li>A manuscript delivered to the agreed date</li>
              <li>Law stated as at a date you can defend</li>
              <li>Willingness to revise for a new edition</li>
              <li>Permissions cleared for anything quoted at length</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: '26px 30px', background: 'var(--color-surface)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 6px' }}>Send us a proposal</h3>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0, maxWidth: 640 }}>Synopsis, outline and a note on the market, to the commissioning desk. We reply to every proposal, and we tell you plainly when a book is not one we can publish well.</p>
        </div>
        <Link className="btn btn-primary" to="/contact" style={{ minHeight: 44, whiteSpace: 'nowrap', textDecoration: 'none' }}>Contact the desk</Link>
      </section>
    </div>
  );
}
