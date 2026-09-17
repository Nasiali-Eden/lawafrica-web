import { Link } from 'react-router-dom';
import { footerCols } from '../data/footer.js';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ground-brand)', color: 'var(--on-brand-body)', marginTop: 'auto' }}>
      <div className="stack-cols" style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 24px 24px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', color: 'var(--on-brand)', marginBottom: 6 }}>lawAfrica</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--on-brand-eyebrow)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginBottom: 16 }}>Know. Do. Be More</div>
          <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, maxWidth: 280, marginBottom: 18 }}>Legal publishing and legal information solutions across Africa since 1999. A subsidiary of Longhorn Publishers PLC.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href="#" style={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,.25)', borderRadius: 3, display: 'grid', placeItems: 'center', color: 'var(--on-brand-body)', textDecoration: 'none', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))' }} aria-label="LawAfrica on LinkedIn">in</a>
            <a href="#" style={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,.25)', borderRadius: 3, display: 'grid', placeItems: 'center', color: 'var(--on-brand-body)', textDecoration: 'none', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))' }} aria-label="LawAfrica on X">X</a>
            <a href="#" style={{ width: 32, height: 32, border: '1px solid rgba(255,255,255,.25)', borderRadius: 3, display: 'grid', placeItems: 'center', color: 'var(--on-brand-body)', textDecoration: 'none', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))' }} aria-label="LawAfrica on YouTube">▶</a>
          </div>
        </div>
        {footerCols.map(col => (
          <div key={col.name}>
            <h4 style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--on-brand)', margin: '0 0 14px' }}>{col.name}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {col.links.map(l => (
                <Link key={l.t} to={l.to} style={{ color: 'var(--on-brand-body)', textDecoration: 'none', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', cursor: 'pointer' }}>{l.t}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* The legal strip sits on the burgundy darkened rather than on a hairline
          rule: two burgundy planes read as one footer with a base, where a rule
          on a flat ground just reads as a line. */}
      <div style={{ background: 'var(--ground-brand-deepest)' }}>
      <div className="wrap" style={{ paddingBlock: '18px 30px', display: 'flex', gap: 24, fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--on-brand-muted)', flexWrap: 'wrap' }}>
        <span>© 2026 LawAfrica Publishing (K) Limited</span>
        <a href="#" style={{ color: 'var(--on-brand-muted)', textDecoration: 'none' }}>Privacy</a>
        <a href="#" style={{ color: 'var(--on-brand-muted)', textDecoration: 'none' }}>Terms of sale</a>
        <a href="#" style={{ color: 'var(--on-brand-muted)', textDecoration: 'none' }}>Accessibility</a>
        <span style={{ marginLeft: 'auto' }}>All contact details verified 28 August 2026</span>
      </div>
      </div>
    </footer>
  );
}
