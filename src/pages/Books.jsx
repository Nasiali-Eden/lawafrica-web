import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { books } from '../data/books.js';
import BookCard from '../components/BookCard.jsx';
import Pagination, { usePaged, useColumns, BOOK_COLUMNS, ROWS } from '../components/Pagination.jsx';

// Print books only. eBooks are a separate catalogue with their own page
// (/ebooks) and their own data, so the old ?format=ebook form is sent there.
export default function Books() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  if (params.get('format') === 'ebook') return <Navigate to="/ebooks" replace />;

  const q = query.trim().toLowerCase();
  const list = q
    ? books.filter(b => [b.title, b.author, b.code].some(v => (v || '').toLowerCase().includes(q)))
    : books;
  const cols = useColumns(BOOK_COLUMNS);
  const paged = usePaged(list, cols * ROWS);

  // a new search starts again from the first page
  const search = value => {
    setQuery(value);
    if (params.get('page')) { const next = new URLSearchParams(params); next.delete('page'); setParams(next, { replace: true }); }
  };

  return (
    <div className="page" style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 24px 64px' }}>
      <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 18 }}>Home / Books</div>
      <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', margin: '0 0 8px' }}>Legal books</h1>
      <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-700)', maxWidth: 620, marginBottom: 18 }}>Print titles from the LawAfrica bookshop, delivered to your door.</p>
      <div className="field" style={{ maxWidth: 520, marginBottom: 24 }}>
        <label htmlFor="catalogue-search">Search books by title or reference</label>
        <input
          id="catalogue-search"
          className="input"
          type="search"
          value={query}
          onChange={event => search(event.target.value)}
          placeholder="Search the catalogue"
        />
      </div>
      <hr className="hr" style={{ margin: '0 0 24px' }} />

      <div style={{ marginBottom: 18, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>
        <strong style={{ color: 'var(--color-text)' }}>{list.length}</strong> titles{list.length > 0 && <span style={{ color: 'var(--color-neutral-600)' }}> &middot; showing {paged.from}&ndash;{paged.to}</span>}
      </div>
      {list.length ? (
        <>
          <div className="shelf-books">
            {paged.slice.map(b => <BookCard key={b.code} b={b} />)}
          </div>
          <Pagination page={paged.page} pages={paged.pages} go={paged.go} />
        </>
      ) : (
        <p role="status" style={{ margin: 0, padding: '24px 0', color: 'var(--color-neutral-700)', borderTop: '1px solid var(--color-divider)' }}>
          No books match &ldquo;{query}&rdquo;. Try a title or reference.
        </p>
      )}
    </div>
  );
}
