import { useState } from 'react';
import { Link } from 'react-router-dom';
import { caseList } from '../data/cases.js';
import { getPlans, llrFilters } from '../data/plans.js';
import { useAuth } from '../state/AuthContext.jsx';

export default function Reports() {
  const { openCase } = useAuth();
  const [billing, setBilling] = useState('year');
  const plans = getPlans(billing);

  const segStyle = active => ({ border: 0, padding: '9px 16px', cursor: 'pointer', font: 'inherit', fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', background: active ? 'var(--color-accent)' : 'transparent', color: active ? '#fff' : 'var(--color-text)' });

  return (
    <div className="page">
      <section style={{ minHeight: 320, display: 'flex', alignItems: 'center', color: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px 30px', width: '100%' }}>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold-400)', marginBottom: 12 }}>LawAfrica Law Reports</div>
          <h1 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 22px', color: '#fff' }}>Search reported judgments</h1>
          <div className="stack-sm" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr .8fr auto', gap: 12, alignItems: 'end' }}>
            <div className="field"><label style={{ color: 'var(--color-neutral-300)' }}>Party name, keyword or catchword</label><input className="input" placeholder="e.g. unconscionable term" style={{ background: 'rgba(255,255,255,.06)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' }} /></div>
            <div className="field"><label style={{ color: 'var(--color-neutral-300)' }}>Citation</label><input className="input" placeholder="[2025] eKLR" style={{ background: 'rgba(255,255,255,.06)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' }} /></div>
            <div className="field"><label style={{ color: 'var(--color-neutral-300)' }}>Court</label><select className="input" style={{ background: 'rgba(255,255,255,.06)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}><option>All courts</option><option>Court of Appeal</option><option>High Court</option><option>Employment &amp; Labour Relations</option></select></div>
            <div className="field"><label style={{ color: 'var(--color-neutral-300)' }}>Year</label><select className="input" style={{ background: 'rgba(255,255,255,.06)', color: '#fff', borderColor: 'rgba(255,255,255,.25)' }}><option>Any year</option><option>2026</option><option>2025</option><option>2024</option></select></div>
            <button className="btn" style={{ background: '#ffffff', color: 'var(--ground-brand)', minHeight: 44, paddingInline: 26 }}>Search</button>
          </div>
        </div>
      </section>

      <div className="stack filters-last" style={{ maxWidth: 1180, margin: '0 auto', padding: '26px 24px 64px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 40, alignItems: 'start' }}>
        <aside>
          <div style={{ border: '1px solid var(--azure-200)', background: 'var(--azure-100)', borderRadius: 4, padding: 16, marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', marginBottom: 6 }}>Subscriber access</div>
            <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, marginBottom: 12, color: 'var(--color-neutral-700)' }}>You are viewing headnotes only. Full judgments, cross-citations and PDF downloads require a subscription.</p>
            <a className="btn btn-primary btn-block" href="#plans" style={{ marginTop: 0, textDecoration: 'none' }}>See subscription plans</a>
          </div>
          {llrFilters.map(f => (
            <div key={f.name} style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', margin: '0 0 10px', paddingBottom: 8, borderBottom: '1px solid var(--color-divider)' }}>{f.name}</h4>
              {f.opts.map(o => (
                <label key={o.label} className="radio" style={{ display: 'flex', padding: '5px 0', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', justifyContent: 'space-between', cursor: 'pointer' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ width: 14, height: 14, border: '1px solid var(--color-neutral-400)', borderRadius: 2, flex: 'none', background: o.on ? 'var(--color-accent)' : 'transparent' }} />
                    {o.label}
                  </span>
                  <span style={{ color: 'var(--color-neutral-700)', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))' }}>{o.n}</span>
                </label>
              ))}
            </div>
          ))}
        </aside>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-700)' }}><strong style={{ color: 'var(--color-text)' }}>318</strong> judgments matching <em>unconscionable term</em></span>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Sort</span>
              <select className="input" style={{ width: 'auto', minHeight: 32, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}><option>Most recent</option><option>Most cited</option><option>Relevance</option></select>
            </div>
          </div>
          {caseList.map(c => (
            <article key={c.id} style={{ padding: '22px 0', borderBottom: '1px solid var(--color-divider)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
                <button onClick={() => openCase(c.id)} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', lineHeight: 1.15, color: 'var(--color-accent-700)' }}>{c.name}</button>
                <span className="tag tag-neutral" style={{ flex: 'none', whiteSpace: 'nowrap' }}>{c.badge}</span>
              </div>
              <div style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 10 }}>{c.cite} · {c.court} · {c.date} · {c.bench}</div>
              <button onClick={() => openCase(c.id)} style={{ display: 'block', textAlign: 'left', background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)', margin: '0 0 12px', maxWidth: 820 }}>{c.headnote}</button>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', marginRight: 4 }}>Catchwords:</span>
                {c.words.map(w => <span key={w.t} className="tag tag-outline" style={{ whiteSpace: 'nowrap' }}>{w.t}</span>)}
                <span style={{ marginLeft: 'auto', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Cited in {c.cited} later judgments</span>
              </div>
              <button className="btn btn-primary" onClick={() => openCase(c.id)} >Read more →</button>
            </article>
          ))}
        </div>
      </div>

      <section id="plans" style={{ borderTop: '1px solid var(--color-text)', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px 66px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', marginBottom: 34 }}>
            <div>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--azure-800)', marginBottom: 12 }}>Law Reports subscriptions</div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.05, margin: '0 0 10px', maxWidth: '20ch' }}>Headnotes are open. Full judgments are for subscribers.</h2>
              <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', maxWidth: 600, margin: 0 }}>Two plans, both covering the whole archive — twenty-five years of continuous reporting across six jurisdictions. The difference is how many of you are working on it at once.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Billing</span>
              <div style={{ display: 'flex', border: '1px solid var(--color-neutral-400)', borderRadius: 4, overflow: 'hidden' }}>
                <button onClick={() => setBilling('year')} style={segStyle(billing === 'year')}>Annual</button>
                <button onClick={() => setBilling('month')} style={{ ...segStyle(billing === 'month'), borderLeft: '1px solid var(--color-divider)' }}>Monthly</button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 24, alignItems: 'start' }}>
            {plans.map(p => (
              <div key={p.id} style={{ border: `1px solid ${p.bd}`, background: p.bg, borderRadius: 4, padding: '28px 30px 30px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: 0 }}>{p.name}</h3>
                  {p.hasBadge && <span className="tag tag-accent" style={{ fontSize: 'var(--t-base)', whiteSpace: 'nowrap' }}>{p.badge}</span>}
                </div>
                <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 18 }}>{p.kicker}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{p.price}</span>
                  <span style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>{p.per}</span>
                </div>
                <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--azure-800)', marginTop: 7 }}>{p.save}</div>
                <hr className="hr" style={{ margin: '20px 0' }} />
                <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)', margin: '0 0 18px' }}>{p.blurb}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {p.feats.map(f => (
                    <li key={f} style={{ display: 'grid', gridTemplateColumns: '16px 1fr', gap: 10, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.5, color: 'var(--color-neutral-800)' }}>
                      <span style={{ color: 'var(--azure-800)', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', paddingTop: 2 }}>✦</span>{f}
                    </li>
                  ))}
                </ul>
                <Link className="btn" to="/signup" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginTop: 'auto', textDecoration: 'none' }}>{p.cta}</Link>
                <Link className="btn btn-ghost" to="/signin" style={{ minHeight: 36, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', textDecoration: 'none' }}>Already subscribed? Sign in</Link>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 26, border: '1px solid var(--color-divider)', borderRadius: 4, padding: '22px 26px', background: 'var(--color-bg)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: '0 0 6px' }}>Firms, courts, ministries and university libraries</h3>
              <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0, maxWidth: 660 }}>Site licences are priced by seat band and can be authenticated by IP range or through your library. Consolidated invoicing, usage reporting and a named contact on the editorial desk.</p>
            </div>
            <Link className="btn btn-primary" to="/contact" style={{ minHeight: 44, whiteSpace: 'nowrap', textDecoration: 'none' }}>Request a site licence</Link>
          </div>
          <p style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', margin: '16px 0 0' }}>All prices in Kenya Shillings and inclusive of VAT. Headnotes, catchwords and citation data remain free to search without a subscription.</p>
        </div>
      </section>
    </div>
  );
}
