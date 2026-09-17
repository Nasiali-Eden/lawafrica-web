import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { caseList, caseBodies } from '../data/cases.js';
import { useAuth } from '../state/AuthContext.jsx';

export default function CaseReader() {
  const { caseId } = useParams();
  const { user, openCase } = useAuth();
  const doc = caseList.find(c => c.id === caseId) || caseList[0];

  useEffect(() => {
    if (!user) openCase(doc.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, doc.id]);

  if (!user) return null;

  const docSections = caseBodies[doc.id] || [
    { n: 'A', h: 'Headnote', ps: [{ t: doc.headnote }] },
    { n: 'B', h: 'Full text', ps: [{ t: 'The full text of this judgment is held in the LawAfrica Law Reports archive. In this prototype only ' + caseList[0].name.split(' v ')[0] + ' carries a complete editorial summary — the reading pane, tools and navigation behave identically on every case.' }] }
  ];
  const docOther = caseList.filter(c => c.id !== doc.id).slice(0, 4);

  return (
    <div className="page">
      <div style={{ background: 'var(--ground-brand-deep)', color: 'var(--on-brand-body)' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>
          <Link to="/reports" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--on-brand-eyebrow)', textDecoration: 'none' }}>← Law Reports</Link>
          <span style={{ color: 'var(--on-brand-muted)', opacity: .85 }}>/</span>
          <span style={{ color: 'var(--on-brand-muted)' }}>{doc.shortCourt}</span>
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: 'var(--on-brand-muted)' }}>Signed in as {user.name} · {user.plan} subscription</span>
            <span className="tag tag-outline" style={{ borderColor: 'rgba(212,158,102,.6)', color: 'var(--on-brand-eyebrow)', fontSize: 'var(--t-base)', whiteSpace: 'nowrap' }}>Full text unlocked</span>
          </span>
        </div>
      </div>
      <div className="stack" style={{ maxWidth: 1240, margin: '0 auto', padding: '26px 24px 72px', display: 'grid', gridTemplateColumns: '238px minmax(0,1fr) 220px', gap: 36, alignItems: 'start' }}>

        <aside style={{ position: 'sticky', top: 96 }}>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', paddingBottom: 9, borderBottom: '1px solid var(--color-text)', marginBottom: 2 }}>Results · 318 judgments</div>
          {caseList.map(c => (
            <Link key={c.id} to={`/reports/${c.id}`} style={{ width: '100%', textAlign: 'left', background: c.id === doc.id ? 'var(--color-accent-100)' : 'transparent', border: 0, borderLeft: `2px solid ${c.id === doc.id ? 'var(--color-accent)' : 'transparent'}`, borderBottom: '1px solid var(--color-divider)', padding: '11px 10px', cursor: 'pointer', font: 'inherit', display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.25, display: 'block', marginBottom: 4, fontWeight: c.id === doc.id ? 500 : 400 }}>{c.name}</span>
              <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'var(--t-base)', color: 'var(--color-neutral-600)' }}>{c.cite}</span>
            </Link>
          ))}
          <Link to="/reports" style={{ display: 'inline-block', marginTop: 14, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', textDecoration: 'none', borderBottom: '1px solid var(--color-accent-300)' }}>Back to all results</Link>
        </aside>

        <article style={{ minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span className="tag tag-accent" style={{ fontSize: 'var(--t-base)' }}>{doc.badge}</span>
            <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Cited in {doc.cited} later judgments</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.15, margin: '0 0 14px', textWrap: 'pretty' }}>{doc.name}</h1>
          <div style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', lineHeight: 1.75, paddingBottom: 18, borderBottom: '1px solid var(--color-text)' }}>
            {doc.cite}<br />{doc.court} · {doc.date}<br />{doc.bench}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, padding: '18px 0', borderBottom: '1px solid var(--color-divider)', alignItems: 'start' }}>
            <span style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', paddingTop: 4 }}>Headnote</span>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, margin: 0, color: 'var(--color-neutral-800)', textAlign: 'justify', hyphens: 'auto' }}>{doc.headnote}</p>
          </div>

          {docSections.map(sec => (
            <section key={sec.n} style={{ padding: '26px 0', borderBottom: '1px solid var(--color-divider)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
                <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'var(--t-base)', color: 'var(--color-accent-700)' }}>{sec.n}</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: 0 }}>{sec.h}</h2>
              </div>
              {sec.ps.map((p, i) => (
                <p key={i} style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, margin: '0 0 13px', color: 'var(--color-neutral-800)', textAlign: 'justify', hyphens: 'auto', maxWidth: '70ch' }}>{p.t}</p>
              ))}
            </section>
          ))}

          <div style={{ marginTop: 22, border: '1px solid var(--color-divider)', borderRadius: 4, padding: '18px 20px', background: 'var(--color-surface)', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)' }}>
            This reading pane shows the LawAfrica editorial summary and headnote. The verbatim judgment, the certified PDF and the paragraph numbering are served from the archive to Pro and Plus subscribers.
          </div>
        </article>

        <aside style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 11 }}>This judgment</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button className="btn btn-primary btn-block" style={{ marginTop: 0, minHeight: 36, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>Download PDF</button>
              <button className="btn btn-secondary btn-block" style={{ minHeight: 36, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>Copy citation</button>
              <button className="btn btn-secondary btn-block" style={{ minHeight: 36, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>Save to matter folder</button>
              <button className="btn btn-ghost btn-block" style={{ minHeight: 36, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>Annotate</button>
            </div>
          </div>
          <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 16 }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 11 }}>Catchwords</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {doc.words.map(w => <span key={w.t} className="tag tag-outline" style={{ fontSize: 'var(--t-base)', whiteSpace: 'nowrap' }}>{w.t}</span>)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 8 }}>Also on this point</div>
            {docOther.map(c => (
              <Link key={c.id} to={`/reports/${c.id}`} style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, borderTop: '1px solid var(--color-divider)', padding: '10px 0', cursor: 'pointer', font: 'inherit', display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.25, display: 'block', marginBottom: 3 }}>{c.name}</span>
                <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'var(--t-base)', color: 'var(--color-neutral-600)' }}>{c.cite}</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
