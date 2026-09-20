import { Link } from 'react-router-dom';
import Plate from '../components/Plate.jsx';
import { asset } from '../lib/format.js';

const ROLES = [
  ['Law reporter (two posts)', 'Read judgments as they are delivered, write the headnote, assign catchwords and keep the citator honest. Admitted advocates and recent graduates both considered.', 'Reports desk', 'Full time'],
  ['Commissioning editor', 'Find the books that should exist and the authors who can write them, then carry them from proposal to publication. Publishing or practice background.', 'Editorial', 'Full time'],
  ['Institutional sales manager', 'Own the relationships with firms, courts, ministries and university libraries across the region, including tender work. Travel within East Africa.', 'Commercial', 'Full time'],
  ['Editorial intern', 'Three months on the reports desk for a law student or recent graduate: citation checking, proofing and headnote drafting under supervision. Paid.', 'Reports desk', '3 months']
];

export default function Careers() {
  return (
    <div className="page" style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 24px 72px' }}>
      <div className="stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 400px', gap: 52, alignItems: 'end', paddingBottom: 32, borderBottom: '1px solid var(--color-text)', marginBottom: 38 }}>
        <div>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 14 }}>Careers</div>
          <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.05, margin: '0 0 16px', maxWidth: '22ch' }}>Work on the books practitioners actually open</h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)', margin: 0, maxWidth: '60ch' }}>We are a small publishing house doing unglamorous, exacting work: reading judgments closely, checking citations, and getting editions to press on time. If that appeals more than it repels, look below.</p>
        </div>
        <Plate src={asset("/assets/plate-wide.jpg")} aspectRatio="16/10" />
      </div>

      <section style={{ marginBottom: 44 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 18 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: 0 }}>Open roles</h2>
          <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
          <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Four positions · Nairobi unless stated</span>
        </div>
        <div>
          {ROLES.map(([t, b, dept, term], i) => (
            <div key={t} className="stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 190px 150px auto', gap: 24, padding: '18px 0', borderTop: i === 0 ? '1px solid var(--color-text)' : '1px solid var(--color-divider)', borderBottom: i === ROLES.length - 1 ? '1px solid var(--color-divider)' : undefined, alignItems: 'center' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 5px' }}>{t}</h3>
                <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0, maxWidth: '60ch' }}>{b}</p>
              </div>
              <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>{dept}</div>
              <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>{term}</div>
              <Link className="btn btn-secondary" to="/contact" style={{ minHeight: 38, whiteSpace: 'nowrap', textDecoration: 'none' }}>Apply</Link>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 52, marginBottom: 40 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 16px' }}>How we hire</h2>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--color-neutral-800)', margin: '0 0 14px', maxWidth: '60ch' }}>A short application, then a piece of real work: for editorial roles, a headnote written from a judgment we send you; for commercial roles, a conversation about an institution you would approach and why. Two interviews, references, and a decision inside three weeks.</p>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--color-neutral-800)', margin: 0, maxWidth: '60ch' }}>We do not ask for unpaid sample chapters or speculative research, and we tell everyone who applies where they stand.</p>
        </div>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 16px' }}>What we offer</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {['Medical cover and pension from day one', 'Two days a week from home on editorial roles', 'CPD and practising fees paid for admitted staff', 'Every title we publish, on your shelf'].map(t => (
              <li key={t} style={{ paddingBottom: 11, borderBottom: '1px solid var(--color-divider)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)' }}>{t}</li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: '26px 30px', background: 'var(--color-surface)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 6px' }}>Nothing here fits, but you want to work with us?</h3>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0, maxWidth: 640 }}>Write to the editorial director with a page on what you would do here. We keep good letters on file and we do come back to them.</p>
        </div>
        <Link className="btn btn-primary" to="/contact" style={{ minHeight: 44, whiteSpace: 'nowrap', textDecoration: 'none' }}>Write to us</Link>
      </section>
    </div>
  );
}
