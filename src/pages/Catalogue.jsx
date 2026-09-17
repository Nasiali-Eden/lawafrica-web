import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  catalogueMeta,
  cataloguePlates,
  catalogueTitles,
  catalogueJurisdictions,
  orderingNotes
} from '../data/catalogue.js';

// The printed catalogue, described. This is not the books listing — /books is
// the shop. This page explains what the printed 2026 catalogue is, shows the
// list it contains, and sets out how ordering and trade terms work.
//
// The downloadable PDF is deliberately not linked yet: a web-ready version is
// still to be produced, so the button below says so rather than pointing at a
// 32MB print file.
export default function Catalogue() {
  const [juris, setJuris] = useState('All');
  const shown = juris === 'All'
    ? catalogueTitles
    : catalogueTitles.filter(t => t.juris === juris);

  return (
    <div className="page">
      <section className="wrap" style={{ paddingBlock: '28px 0' }}>
        <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 18 }}>
          Home / Catalogue
        </div>
      </section>

      {/* Masthead */}
      <section className="wrap catalogue-head">
        <div>
          <span className="chip-light">The printed list</span>
          <h1 className="contact-title" style={{ margin: '16px 0 0' }}>
            LawAfrica
            <span>Catalogue {catalogueMeta.edition}</span>
          </h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 3px*var(--tf,1))', lineHeight: 1.7, color: 'var(--color-neutral-700)', maxWidth: '46ch', margin: '18px 0 0' }}>
            {catalogueMeta.pages} pages of the current list — every title with its
            ISBN, format, author and synopsis, arranged by jurisdiction and subject,
            together with our ordering, trade and shipping terms.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <Link className="btn btn-primary" to="/books" style={{ textDecoration: 'none' }}>Browse the titles online</Link>
            <button className="btn btn-secondary" disabled title="A web-ready edition is in preparation">
              Download the PDF — coming soon
            </button>
          </div>
        </div>

        <dl className="catalogue-facts">
          <div><dt>Edition</dt><dd>{catalogueMeta.edition}</dd></div>
          <div><dt>Extent</dt><dd>{catalogueMeta.pages} pages</dd></div>
          <div><dt>Format</dt><dd>Print, soft back</dd></div>
          <div><dt>Order online</dt><dd><a href="https://www.lawafrica.com">{catalogueMeta.orderOnline}</a></dd></div>
        </dl>
      </section>

      {/* Image placeholders — real jacket and spread photography to follow */}
      <section className="wrap" style={{ paddingBlock: '52px 0' }}>
        <h2 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 6px' }}>Inside the catalogue</h2>
        <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', margin: '0 0 22px' }}>
          Photography to be supplied.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 22 }}>
          {cataloguePlates.map(pl => (
            <figure key={pl.id} style={{ margin: 0 }}>
              <div className="plate-placeholder" role="img" aria-label={'Placeholder: ' + pl.label}>
                <span>Image to come</span>
              </div>
              <figcaption style={{ marginTop: 10 }}>
                <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>{pl.label}</span>
                <span style={{ display: 'block', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-700)', lineHeight: 1.55 }}>{pl.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* The list */}
      <section className="wrap" style={{ paddingBlock: '52px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
          <h2 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: 0 }}>Titles in this edition</h2>
          <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }} className="tnum">
            {shown.length} of {catalogueTitles.length}
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '16px 0 20px' }}>
          {['All'].concat(catalogueJurisdictions).map(j => (
            <button
              key={j}
              type="button"
              onClick={() => setJuris(j)}
              className={'tag ' + (juris === j ? 'tag-accent' : 'tag-neutral')}
              style={{ cursor: 'pointer', border: '1px solid ' + (juris === j ? 'var(--color-accent)' : 'transparent'), minHeight: 36 }}
            >
              {j}
            </button>
          ))}
        </div>

        <div className="table-scroll">
          <table className="table catalogue-table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Jurisdiction</th>
                <th scope="col">Subject</th>
                <th scope="col">ISBN</th>
                <th scope="col">Format</th>
              </tr>
            </thead>
            <tbody>
              {shown.map(t => (
                <tr key={t.isbn}>
                  <td style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 3px*var(--tf,1))' }}>{t.title}</td>
                  <td>{t.author}</td>
                  <td>{t.juris}</td>
                  <td>{t.subject}</td>
                  <td className="tnum" style={{ whiteSpace: 'nowrap' }}>{t.isbn}</td>
                  <td><span className="tag tag-neutral">{t.format}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ordering and trade terms, as printed */}
      <section className="contact-band" style={{ marginTop: 64 }}>
        <div className="wrap">
          <h2 className="contact-title" style={{ margin: '0 0 10px' }}>
            Ordering
            <span>and trade terms</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 28, marginTop: 28 }}>
            {orderingNotes.map(n => (
              <div key={n.t}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 'var(--font-heading-weight)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', margin: '0 0 8px' }}>{n.t}</h3>
                <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: 0 }}>{n.b}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', margin: '30px 0 0' }}>
            {catalogueMeta.office}
          </p>
          <Link className="btn btn-primary" to="/contact" style={{ textDecoration: 'none', marginTop: 18 }}>Request a printed copy</Link>
        </div>
      </section>
    </div>
  );
}
