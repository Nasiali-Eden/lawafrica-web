import { useParams, Link } from 'react-router-dom';
import { events } from '../data/events.js';
import Plate from '../components/Plate.jsx';

export default function Event() {
  const { id } = useParams();
  const ev = events.find(e => e.id === id) || events[0];
  const other = events.filter(e => e.id !== ev.id);

  return (
    <div className="page">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '26px 24px 14px', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <Link to="/insights?feed=Events" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--color-accent-700)', whiteSpace: 'nowrap', textDecoration: 'none' }}>Events diary</Link>
        <span>/</span><span>{ev.kind}</span>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px' }}>
        <div className="stack" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 44, alignItems: 'start', paddingBottom: 34, borderBottom: '1px solid var(--color-text)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <span className="tag tag-accent" style={{ whiteSpace: 'nowrap' }}>{ev.kind}</span>
              <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>{ev.d} {ev.mo} {ev.yr} · {ev.time}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.05, margin: '0 0 16px', maxWidth: '24ch', textWrap: 'pretty' }}>{ev.title}</h1>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--color-neutral-800)', margin: 0, maxWidth: '60ch' }}>{ev.lede}</p>
          </div>
          <Plate src={ev.img} aspectRatio="4/3" />
        </div>
      </div>

      <div className="stack" style={{ maxWidth: 1180, margin: '0 auto', padding: '34px 24px 72px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 44, alignItems: 'start' }}>
        <div>
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 16px', paddingBottom: 9, borderBottom: '1px solid var(--color-divider)' }}>Programme</h2>
            {ev.agenda.map((a, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 14, padding: '13px 0', borderBottom: '1px solid var(--color-divider)' }}>
                <span style={{ color: 'var(--color-accent-700)', fontSize: 'var(--t-base)', paddingTop: 5 }}>◆</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.25, marginBottom: 3 }}>{a.t}</div>
                  <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)' }}>{a.s}</div>
                </div>
              </div>
            ))}
          </section>

          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 34, marginBottom: 36 }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 13px' }}>Who is speaking</h3>
              {ev.speakers.map((sp, i) => (
                <div key={i} style={{ padding: '11px 0', borderTop: '1px solid var(--color-divider)' }}>
                  <div style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginBottom: 2 }}>{sp.n}</div>
                  <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{sp.r}</div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 13px' }}>Who it is for</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {ev.forWhom.map((f, i) => (
                  <li key={i} style={{ padding: '11px 0', borderTop: '1px solid var(--color-divider)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.5, color: 'var(--color-neutral-800)' }}>{f.t}</li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 18px', paddingBottom: 9, borderBottom: '1px solid var(--color-divider)' }}>Also in the diary</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 24 }}>
              {other.map(e => (
                <Link key={e.id} to={`/insights/event/${e.id}`} style={{ textAlign: 'left', background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', display: 'flex', flexDirection: 'column', gap: 9, textDecoration: 'none', color: 'inherit' }}>
                  <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'var(--t-base)', color: 'var(--color-accent-700)' }}>{e.d} {e.mo} {e.yr}</span>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.25 }}>{e.title}</span>
                  <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{e.kind}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ border: '1px solid var(--color-accent)', borderRadius: 4, padding: 24, background: 'var(--color-accent-100)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', lineHeight: 1, color: 'var(--color-accent-700)', fontVariantNumeric: 'tabular-nums' }}>{ev.d}</span>
              <span>
                <span style={{ display: 'block', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', letterSpacing: '.16em', textTransform: 'uppercase' }}>{ev.mo} {ev.yr}</span>
                <span style={{ display: 'block', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>{ev.time}</span>
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)', paddingBottom: 16, borderBottom: '1px solid var(--color-accent-200)', marginBottom: 16 }}>
              <div>{ev.where}</div>
              <div style={{ color: 'var(--color-accent-700)' }}>{ev.priceNote}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Attendance</span>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))' }}>{ev.price}</span>
            </div>
            <button className="btn" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', width: '100%', justifyContent: 'center' }}>{ev.cta}</button>
            <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', marginTop: 9, textAlign: 'center' }}>{ev.spots}</div>
          </div>
          <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: '18px 20px' }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 10 }}>Practical</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)' }}>
              <li>Joining details sent the day before</li>
              <li>Recording circulated to registrants</li>
              <li>CPD certificates issued within a week</li>
              <li>Firm bookings: three seats or more, ask us</li>
            </ul>
            <Link className="btn btn-secondary btn-block" to="/contact" style={{ minHeight: 38, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', textDecoration: 'none' }}>Book for a firm</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
