import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { books, filters } from '../data/books.js';
import BookCard from '../components/BookCard.jsx';

// Print and digital are two sections with their own URLs, not one page behind
// a filter: /books and /ebooks. The ?format=ebook form is still honoured so
// older links keep resolving to the digital section.
export default function Books({ digital = false }) {
  const [params] = useSearchParams();
  const [query, setQuery] = useState('');
  const ebooksOnly = digital || params.get('format') === 'ebook';
  const list = books.filter(b => (ebooksOnly ? b.format === 'Digital' : b.format === 'Print'));
  const normalizedQuery = query.trim().toLowerCase();
  const filteredList = normalizedQuery
    ? list.filter(b => [b.title, b.author, b.code].some(value => value.toLowerCase().includes(normalizedQuery)))
    : list;
  const resultCount = normalizedQuery ? filteredList.length : (ebooksOnly ? list.length : 42);
  const catalogueTitle = ebooksOnly ? 'eBooks' : 'Legal books';
  const introduction = ebooksOnly
    ? 'Instant access — no shipping, no waiting for a reprint. Read within minutes of purchase.'
    : 'Narrow the catalogue the way a law librarian would: by jurisdiction, practice area and how current the edition is.';

  return (
    <div className="page" style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 24px 64px' }}>
      <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 18 }}>Home / {ebooksOnly ? 'eBooks' : 'Books'}</div>
      <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', margin: '0 0 8px' }}>{catalogueTitle}</h1>
      <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-700)', maxWidth: 620, marginBottom: 18 }}>{introduction}</p>
      <div className="field" style={{ maxWidth: 520, marginBottom: 24 }}>
        <label htmlFor="catalogue-search">Search {ebooksOnly ? 'eBooks' : 'books'} by title, author or reference</label>
        <input
          id="catalogue-search"
          className="input"
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search the catalogue"
        />
      </div>
      <hr className="hr" style={{ margin: '0 0 24px' }} />

      <div className="stack filters-last" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 40, alignItems: 'start' }}>
        <aside>
          {filters.map(f => {
            const heading = f.name === 'Jurisdiction'
              ? 'Browse by jurisdiction'
              : f.name === 'Practice area'
                ? 'Browse by practice area'
                : f.name;

            return (
              <div key={f.name} style={{ marginBottom: 26 }}>
                <h4 style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', margin: '0 0 10px', paddingBottom: 8, borderBottom: '1px solid var(--color-divider)' }}>{heading}</h4>
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
            );
          })}
          <button className="btn btn-secondary btn-block">Clear all filters</button>
        </aside>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-700)' }}><strong style={{ color: 'var(--color-text)' }}>{resultCount}</strong> titles</span>
            {ebooksOnly ? (
              <Link className="tag tag-accent" to="/books" style={{ display: 'inline-flex', gap: 6, textDecoration: 'none' }}>eBook <span aria-hidden="true" style={{ opacity: .6 }}>✕</span></Link>
            ) : (
              <>
                <span className="tag tag-accent" style={{ display: 'inline-flex', gap: 6 }}>Kenya <span aria-hidden="true" style={{ opacity: .6 }}>✕</span></span>
                <span className="tag tag-accent" style={{ display: 'inline-flex', gap: 6 }}>Commercial law <span aria-hidden="true" style={{ opacity: .6 }}>✕</span></span>
              </>
            )}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Sort</span>
              <select className="input" style={{ width: 'auto', minHeight: 32, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>
                <option>Newest edition first</option>
                <option>Title A–Z</option>
                <option>Price low to high</option>
              </select>
            </div>
          </div>
          {filteredList.length ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 26 }}>
              {filteredList.map(b => <BookCard key={b.code} b={b} />)}
            </div>
          ) : (
            <p role="status" style={{ margin: 0, padding: '24px 0', color: 'var(--color-neutral-700)', borderTop: '1px solid var(--color-divider)' }}>
              No {ebooksOnly ? 'eBooks' : 'books'} match &ldquo;{query}&rdquo;. Try a title, author or reference.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
