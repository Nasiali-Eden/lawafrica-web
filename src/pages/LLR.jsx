import { Link } from 'react-router-dom';

// LawAfrica Law Reports lives on its own platform at llr.lawafrica.com. This
// page is the description of it inside the main site — what the service is and
// what it covers — and hands over to that platform for the actual searching.
// Nothing here queries judgments; the top-level "Law Reports" nav item skips
// this page and goes straight out.
export const LLR_URL = 'https://llr.lawafrica.com';

const COVERAGE = [
  { t: 'Kenya', b: 'Court of Appeal, High Court and specialised tribunal decisions, with the Supreme Court from its establishment.' },
  { t: 'Uganda', b: 'Reported decisions of the Court of Appeal, the Constitutional Court and the High Court.' },
  { t: 'Tanzania and Zanzibar', b: 'Court of Appeal and High Court decisions across mainland Tanzania and Zanzibar.' },
  { t: 'South Sudan', b: 'Reported judgments from the Supreme Court and the Court of Appeal.' },
  { t: 'Regional', b: 'Landmark decisions of the COMESA Court of Justice and the East African Court of Justice.' }
];

const EDITORIAL = [
  'Headnotes written by our own editorial team, not machine summaries.',
  'Catchwords and subject indexing across the whole collection.',
  'Cross-citation between reported judgments, back to 1860.',
  'The All East Africa Consolidated Index.'
];

export default function LLR() {
  return (
    <div className="page">
      <section className="wrap" style={{ paddingBlock: '28px 0' }}>
        <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 18 }}>
          Home / Products / LLR
        </div>
      </section>

      <section className="wrap catalogue-head">
        <div>
          <span className="chip-light">LawAfrica Law Reports</span>
          <h1 className="contact-title" style={{ margin: '16px 0 0' }}>
            Twenty-five years
            <span>of reported judgments</span>
          </h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 3px*var(--tf,1))', lineHeight: 1.7, color: 'var(--color-neutral-700)', maxWidth: '48ch', margin: '18px 0 0' }}>
            LLR is our law-reporting service: the full text of the most important
            decisions from six African jurisdictions, headnoted, catchworded and
            cross-cited by our editors, and searchable in one place.
          </p>
          <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.7, color: 'var(--color-neutral-700)', maxWidth: '48ch', margin: '14px 0 0' }}>
            It runs on its own platform, with its own subscriptions and sign-in.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <a
              className="btn btn-primary"
              href={LLR_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              Go to llr.lawafrica.com
              <span aria-hidden="true" style={{ marginInlineStart: 4 }}>↗</span>
            </a>
            <Link className="btn btn-secondary" to="/contact" style={{ textDecoration: 'none' }}>Ask about institutional access</Link>
          </div>
        </div>

        <dl className="catalogue-facts">
          <div><dt>Platform</dt><dd><a href={LLR_URL} target="_blank" rel="noopener noreferrer">llr.lawafrica.com</a></dd></div>
          <div><dt>Coverage</dt><dd>Six jurisdictions, 1860 to date</dd></div>
          <div><dt>Reporting</dt><dd>Headnoted and cross-cited in house</dd></div>
          <div><dt>Access</dt><dd>Subscription, on the LLR platform</dd></div>
        </dl>
      </section>

      <section className="wrap" style={{ paddingBlock: '52px 0' }}>
        <h2 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 22px' }}>What it covers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 20 }}>
          {COVERAGE.map(c => (
            <div className="card" key={c.t} style={{ padding: 20 }}>
              <div className="card-kicker">{c.t}</div>
              <p className="card-body" style={{ marginTop: 6 }}>{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-band" style={{ marginTop: 64 }}>
        <div className="wrap contact-grid">
          <div className="contact-intro">
            <span className="chip-light">Editorial</span>
            <h2 className="contact-title">
              Reported,
              <span>not just collected</span>
            </h2>
            <p>
              The value is in the editorial work around the judgment — which is why
              a citation in LLR points somewhere, and why the collection is used by
              the bench, the bar and the universities across the region.
            </p>
            <a
              className="btn btn-primary"
              href={LLR_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ alignSelf: 'flex-start', textDecoration: 'none' }}
            >
              Search the Law Reports
              <span aria-hidden="true" style={{ marginInlineStart: 4 }}>↗</span>
            </a>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
            {EDITORIAL.map(e => (
              <li
                key={e}
                style={{
                  display: 'grid', gridTemplateColumns: '28px minmax(0,1fr)', gap: 12,
                  padding: '18px 0', borderTop: '1px solid var(--color-divider)',
                  fontSize: 'calc(var(--t-base) + 3px*var(--tf,1))', lineHeight: 1.6
                }}
              >
                <span aria-hidden="true" style={{ color: 'var(--color-accent-700)' }}>—</span>
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
