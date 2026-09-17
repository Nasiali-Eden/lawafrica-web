import { Link } from 'react-router-dom';
import Plate from '../components/Plate.jsx';
import { values, catalogueParts, milestones, timeline, whyChoose } from '../data/about.js';

export default function About() {
  return (
    <div className="page">
      <section style={{ minHeight: 530, display: 'flex', alignItems: 'center', color: 'var(--color-bg)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px 56px', width: '100%' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', color: 'var(--gold-400)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', marginBottom: 18 }}>Know. Do. Be More</div>
          <h1 style={{ fontSize: 'calc(var(--t-base) + 49px*var(--tf,1)*var(--tz,1))', fontWeight: 400, lineHeight: 1.05, letterSpacing: 'var(--ls-heading,-.02em)', margin: '0 0 20px', color: '#fff', maxWidth: '18ch' }}>Africa&rsquo;s legal publisher since 1999.</h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.65, color: 'rgba(246,245,244,.82)', maxWidth: 560, margin: '0 0 28px' }}>LawAfrica is a legal publishing and legal information solutions company dedicated to advancing access to reliable, current and authoritative legal knowledge across the continent — for legal professionals, governments, universities, judiciaries, law firms and researchers.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link className="btn" to="/books" style={{ background: 'var(--color-accent)', color: '#fff', padding: '13px 24px', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', textDecoration: 'none' }}>Browse the catalogue</Link>
            <Link className="btn btn-outline" to="/contact" style={{ padding: '13px 24px', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', border: '1px solid rgba(255,255,255,.5)', color: 'var(--color-bg)', background: 'transparent', textDecoration: 'none' }}>Partner with us</Link>
          </div>
        </div>
      </section>
      <section style={{ background: 'var(--ground-grey)', color: 'var(--on-grey-body)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '22px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 24 }}>
          {[['1999', 'founded in Nairobi'], ['25+', 'years of legal publishing'], ['6', 'jurisdictions reported'], ['1860', 'earliest reported judgment']].map(([n, l]) => (
            <div key={l}><strong style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', color: 'var(--on-grey)', display: 'block', fontWeight: 'var(--fw-heading,400)', fontVariantNumeric: 'tabular-nums' }}>{n}</strong><span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--on-grey-body)' }}>{l}</span></div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '60px 24px', borderBottom: '1px solid var(--color-divider)' }}>
        <div className="stack" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <div style={{ width: 64, height: 3, background: 'var(--color-accent)', marginBottom: 18 }} />
            <h2 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, lineHeight: 1.15, margin: 0 }}>Who we are</h2>
          </div>
          <div style={{ columns: 2, columnGap: 40, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--color-neutral-800)', textAlign: 'justify', hyphens: 'auto' }}>
            <p style={{ margin: '0 0 16px' }}>For over two decades LawAfrica has supported legal professionals, governments, universities, judiciaries, law firms and researchers with trusted legal content in both print and digital formats.</p>
            <p style={{ margin: '0 0 16px' }}>Founded in 1999, the company has grown from a visionary legal publishing initiative into a regional brand with a reputation for quality, accuracy and innovation in legal information management — combining deep editorial expertise with technology-driven solutions that make legal research more accessible and efficient.</p>
            <p style={{ margin: '0 0 16px' }}>Today LawAfrica serves a broad audience across Africa and beyond, offering publishing solutions that support legal practice, education, governance, policy development and access to justice. Strategic partnerships with governments, legal institutions, law societies, universities and development organisations continue to strengthen legal scholarship in the region.</p>
            <p style={{ margin: 0 }}>As a subsidiary of Longhorn Publishers PLC, LawAfrica draws on the strength and regional reach of one of Africa&rsquo;s most established publishing companies.</p>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-divider)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 48 }}>
          <div style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: 24 }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 12 }}>Our vision</div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', lineHeight: 1.25, margin: 0 }}>To be the principal legal information provider in Africa.</p>
          </div>
          <div style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: 24 }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 12 }}>Our mission</div>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', lineHeight: 1.25, margin: 0 }}>To uplift the standards of legal research by providing up-to-date and relevant decision-support information.</p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '60px 24px', borderBottom: '1px solid var(--color-divider)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 28 }}>
          <h2 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: 0 }}>Our core values</h2>
          <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 0 }}>
          {values.map(v => (
            <div key={v.n} style={{ padding: '0 26px', borderLeft: '1px solid var(--color-divider)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-accent-700)', marginBottom: 10, fontVariantNumeric: 'tabular-nums' }}>{v.n}</div>
              <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, lineHeight: 1.15, margin: '0 0 10px' }}>{v.t}</h3>
              <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0 }}>{v.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '60px 24px', borderBottom: '1px solid var(--color-divider)' }}>
        <div className="stack" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <div style={{ width: 64, height: 3, background: 'var(--color-accent)', marginBottom: 18 }} />
            <h2 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, lineHeight: 1.15, margin: '0 0 16px' }}>What we do</h2>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 18px' }}>Legal publishing, law reporting, statute consolidation, journals, commentaries, legal databases, eBooks, research tools and customised publishing for institutions.</p>
            <Link className="btn btn-primary" to="/llr" style={{ minHeight: 42, textDecoration: 'none' }}>Search the Law Reports</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {catalogueParts.map(p => (
              <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 20, padding: '24px 0', borderTop: '1px solid var(--color-divider)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', color: 'var(--color-accent)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{p.n}</div>
                <div>
                  <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 8px' }}>{p.t}</h3>
                  <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--color-neutral-700)', margin: '0 0 8px', maxWidth: 660, textAlign: 'justify', hyphens: 'auto' }}>{p.b}</p>
                  <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-neutral-600)' }}>{p.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '60px 24px', borderBottom: '1px solid var(--color-divider)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 32 }}>
          <h2 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: 0 }}>Milestones</h2>
          <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 0, marginBottom: 44 }}>
          {timeline.map(t => (
            <div key={t.y} style={{ padding: '22px 26px 0 0', borderTop: '2px solid var(--color-accent-300)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', color: 'var(--color-accent-700)', marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>{t.y}</div>
              <h3 style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', fontWeight: 400, lineHeight: 1.25, margin: '0 0 6px' }}>{t.t}</h3>
              <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0 }}>{t.b}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 48, alignItems: 'start' }}>
          <div>
            <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 14px' }}>Our impact</h3>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--color-neutral-700)', margin: '0 0 16px', textAlign: 'justify', hyphens: 'auto' }}>LawAfrica has contributed to the growth of legal scholarship and access to legal information across East Africa and beyond, publishing statutes, law reports, journals, practice guides and academic titles — and pioneering milestones in digital legal access:</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {milestones.map(m => (
                <li key={m} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 12, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)' }}><span style={{ color: 'var(--color-accent)' }}>—</span><span>{m}</span></li>
              ))}
            </ul>
          </div>
          <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 26, background: 'var(--color-surface)' }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 12 }}>Awards &amp; recognition</div>
            <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 12px' }}>Financial Management Award</h3>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--color-neutral-700)', margin: '0 0 12px', textAlign: 'justify', hyphens: 'auto' }}>Presented by LexisNexis and the East Africa Law Society in recognition of LawAfrica&rsquo;s support and contribution to the 27th East Africa Law Society Annual Conference and General Meeting, Arusha, 23&ndash;26 November 2022.</p>
            <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)', lineHeight: 1.65 }}>The recognition reflects our continued support for regional legal professional development, institutional collaboration and knowledge-sharing.</div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ground-brand-deep)', color: 'var(--on-brand-body)', borderBottom: '1px solid var(--color-divider)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 56, alignItems: 'center' }}>
          <Plate src="/assets/plate-wide.jpg" aspectRatio="16/10" />
          <div>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--on-brand-eyebrow)', marginBottom: 14 }}>Digital innovation</div>
            <h2 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, lineHeight: 1.15, margin: '0 0 16px', color: '#ffffff' }}>The future of legal publishing is accessible, searchable and everywhere.</h2>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--on-brand-body)', margin: '0 0 14px' }}>We have invested in digital publishing platforms and online legal solutions that let institutions, professionals and researchers reach legal content seamlessly — eBooks, law reports and research materials, distributed efficiently and cost-effectively.</p>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--on-brand-body)', margin: '0 0 22px' }}>By integrating technology with legal publishing expertise, LawAfrica helps bridge the gap between legal information and the people who need it most.</p>
            {/* Light button, not the maroon one: on this darkened burgundy the
                maroon fill is 1.3:1 against the ground, so the control's own
                edge disappears even though the label on it is legible. Same
                treatment as the primary button on the Law Reports band. */}
            <Link className="btn" to="/books" style={{ background: 'var(--color-bg)', color: 'var(--ground-brand)', padding: '12px 22px', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', textDecoration: 'none' }}>Explore digital titles</Link>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '60px 24px', borderBottom: '1px solid var(--color-divider)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 48 }}>
          <div>
            <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 12px' }}>Corporate governance</h3>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--color-neutral-700)', margin: 0, textAlign: 'justify', hyphens: 'auto' }}>LawAfrica operates under governance and professional leadership structures that support accountability, operational excellence and sustainable growth. Backed by Longhorn Publishers PLC, the company is guided by experienced professionals committed to high standards of quality, service delivery, innovation and corporate integrity.</p>
          </div>
          <div>
            <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 12px' }}>Social responsibility</h3>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, color: 'var(--color-neutral-700)', margin: 0, textAlign: 'justify', hyphens: 'auto' }}>Access to legal information plays a vital role in promoting justice, education, governance and informed citizenship. We support initiatives that contribute to legal education, professional development and greater awareness of legal rights — because access to knowledge builds stronger institutions and better-informed communities.</p>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '60px 24px' }}>
        <div className="stack" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 56, alignItems: 'start' }}>
          <div>
            <div style={{ width: 64, height: 3, background: 'var(--color-accent)', marginBottom: 18 }} />
            <h2 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, lineHeight: 1.15, margin: '0 0 14px' }}>Why choose LawAfrica</h2>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0 }}>We do not simply publish legal information — we create trusted knowledge solutions for institutions, professionals and communities.</p>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: '0 40px', marginBottom: 34 }}>
              {whyChoose.map(w => (
                <div key={w} style={{ padding: '13px 0', borderBottom: '1px solid var(--color-divider)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.5 }}>{w}</div>
              ))}
            </div>
            <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 26, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', background: 'var(--color-surface)' }}>
              <div>
                <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 6px' }}>Partner with LawAfrica</h3>
                <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0, maxWidth: 520 }}>For trusted legal publishing, research and digital legal information solutions that empower professionals, institutions and communities across Africa.</p>
              </div>
              <Link className="btn" to="/contact" style={{ background: 'var(--color-accent)', color: '#fff', padding: '13px 24px', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', whiteSpace: 'nowrap', textDecoration: 'none' }}>Talk to us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
