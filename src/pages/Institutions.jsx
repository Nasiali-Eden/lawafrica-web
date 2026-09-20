import { Link } from 'react-router-dom';
import Plate from '../components/Plate.jsx';
import { asset } from '../lib/format.js';

const STATS = [['6', 'Jurisdictions reported'], ['25k+', 'Headnoted judgments'], ['400+', 'Titles in the catalogue'], ['1', 'Invoice, however many seats']];

export default function Institutions() {
  return (
    <div className="page" style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 24px 72px' }}>
      <div style={{ maxWidth: '62ch', marginBottom: 34 }}>
        <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 14 }}>For institutions</div>
        <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.05, margin: '0 0 16px' }}>Firms, courts, ministries and libraries</h1>
        <p style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)', margin: 0 }}>One account, one invoice, and access that follows your people rather than their devices. Site licences are priced by seat band; standing orders keep your shelves current without a purchase order for every edition.</p>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: '0 30px', padding: '24px 0', borderTop: '1px solid var(--color-text)', borderBottom: '1px solid var(--color-text)', marginBottom: 40 }}>
        {STATS.map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', color: 'var(--color-accent-700)', fontVariantNumeric: 'tabular-nums' }}>{n}</div>
            <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 44 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 20px' }}>How institutions buy from us</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 26 }}>
          <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 24 }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 10 }}>Site licence</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 10px' }}>Law Reports for everyone at once</h3>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 14px' }}>Authenticated by IP range or through your library sign-in, priced by seat band. Usage reporting each quarter so you can see what is actually being read.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-800)' }}>
              <li>IP or library authentication</li>
              <li>Unlimited concurrent readers in band</li>
              <li>Quarterly usage reports</li>
            </ul>
            <Link className="btn btn-secondary btn-block" to="/contact" style={{ minHeight: 40, textDecoration: 'none' }}>Request a quotation</Link>
          </div>
          <div style={{ border: '1px solid var(--color-accent)', borderRadius: 4, padding: 24, background: 'var(--color-accent-100)' }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 10 }}>Standing order</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 10px' }}>New editions, sent as they publish</h3>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)', margin: '0 0 14px' }}>Nominate titles or whole subject areas. We ship each new edition on publication and invoice against your account — no order needed each time, cancellable at any point.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-800)' }}>
              <li>By title or by subject area</li>
              <li>Superseded-edition alerts</li>
              <li>Consolidated monthly invoice</li>
            </ul>
            <Link className="btn" to="/contact" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 40, width: '100%', justifyContent: 'center', textDecoration: 'none' }}>Set up a standing order</Link>
          </div>
          <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 24 }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 10 }}>Bulk &amp; tender</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 10px' }}>Library and course supply</h3>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 14px' }}>Multi-copy pricing for reading lists and chambers libraries, with the documentation a procurement office needs and delivery scheduled to your term dates.</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-800)' }}>
              <li>Formal quotations and tender documents</li>
              <li>Scheduled delivery to term dates</li>
              <li>Inspection copies for teaching staff</li>
            </ul>
            <Link className="btn btn-secondary btn-block" to="/contact" style={{ minHeight: 40, textDecoration: 'none' }}>Ask about bulk supply</Link>
          </div>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 52, marginBottom: 40 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 16px' }}>Administration, kept simple</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              ['A named contact', 'One person on the editorial and one on accounts — not a queue.'],
              ['Seat management', 'Add and remove colleagues yourself; access follows the person.'],
              ['Invoicing on account', 'Thirty days, VAT invoice per order, consolidated statements on request.'],
              ['Procurement paperwork', 'Tax compliance certificates, formal quotations and tender responses.']
            ].map(([t, b], i, arr) => (
              <div key={t} style={{ padding: '13px 0', borderTop: '1px solid var(--color-divider)', borderBottom: i === arr.length - 1 ? '1px solid var(--color-divider)' : undefined }}>
                <div style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginBottom: 3 }}>{t}</div>
                <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)' }}>{b}</div>
              </div>
            ))}
          </div>
        </div>
        <Plate src={asset("/assets/plate-wide.jpg")} aspectRatio="4/3" />
      </section>

      <section style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: '26px 30px', background: 'var(--color-surface)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 6px' }}>Tell us the shape of your institution</h3>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0, maxWidth: 640 }}>How many advocates or students, which practice areas, and whether you need print, digital or both. We come back with a priced proposal within two working days.</p>
        </div>
        <Link className="btn btn-primary" to="/contact" style={{ minHeight: 44, whiteSpace: 'nowrap', textDecoration: 'none' }}>Request a proposal</Link>
      </section>
    </div>
  );
}
