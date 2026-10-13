import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ebooks, STORE_URL } from '../data/ebooks.js';
import Pagination, { usePaged, useColumns, EBOOK_COLUMNS, ROWS } from '../components/Pagination.jsx';

// The digital list. Not the books page with a different filter: these titles
// come from the digital store, are read on screen, and are bought there, so
// each card is a cover, a byline and a way out — no basket, no stock line.
export default function Ebooks() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const q = query.trim().toLowerCase();
  const list = q
    ? ebooks.filter(e => [e.title, ...e.authors].some(v => v.toLowerCase().includes(q)))
    : ebooks;
  const cols = useColumns(EBOOK_COLUMNS);
  const paged = usePaged(list, cols * ROWS);

  // a new search starts again from the first page
  const search = value => {
    setQuery(value);
    if (params.get('page')) { const next = new URLSearchParams(params); next.delete('page'); setParams(next, { replace: true }); }
  };

  return (
    <div className="page">
      <section className="ebook-hero">
        <div className="wrap">
          <span className="ebook-eyebrow">Digital library</span>
          <h1>eBooks</h1>
          <p>Read on a phone, tablet or laptop within minutes of purchase. {ebooks.length} titles, delivered by our digital store.</p>
          <div className="ebook-search">
            <label htmlFor="ebook-q">Search eBooks by title or author</label>
            <input id="ebook-q" className="input" type="search" value={query} onChange={e => search(e.target.value)} placeholder="e.g. succession" />
          </div>
        </div>
      </section>

      <div className="wrap" style={{ paddingBlock: '40px 72px' }}>
        <div className="ebook-count">
          <span><strong>{list.length}</strong> {list.length === 1 ? 'title' : 'titles'}{list.length > 0 && <> &middot; showing {paged.from}&ndash;{paged.to}</>}</span>
          <a href={STORE_URL} target="_blank" rel="noopener noreferrer">Open the digital store ↗</a>
        </div>
        {list.length ? (
          <>
          <ul className="ebook-grid">
            {paged.slice.map(e => (
              <li key={e.id}>
                <Link to={`/ebooks/${e.id}`} className="ebook-card">
                  <span className="ebook-cover"><img src={e.cover} alt="" loading="lazy" /></span>
                  <span className="ebook-title" translate="no">{e.title}</span>
                  {e.authors.length > 0 && <span className="ebook-by" translate="no">{e.authors.join(', ')}</span>}
                  <span className="ebook-foot"><span className="ebook-fmt">{e.format || 'eBook'}</span><span className="ebook-price" translate="no">{e.price}</span></span>
                </Link>
              </li>
            ))}
          </ul>
          <Pagination page={paged.page} pages={paged.pages} go={paged.go} />
          </>
        ) : (
          <p role="status" style={{ color: 'var(--color-neutral-700)' }}>No eBooks match &ldquo;{query}&rdquo;. Try a title or an author.</p>
        )}
      </div>
    </div>
  );
}
