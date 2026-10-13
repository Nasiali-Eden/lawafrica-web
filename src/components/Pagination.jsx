import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ROWS = 4;

// Columns by viewport width, widest first. The grids in components.css set
// the same numbers at the same widths, so "four rows" is four rows on screen
// at every size, not a fixed count of items.
export const BOOK_COLUMNS = [[1000, 4], [720, 3], [480, 2], [0, 1]];
export const EBOOK_COLUMNS = [[1100, 5], [900, 4], [680, 3], [420, 2], [0, 1]];

const columnsAt = (table, width) => table.find(([min]) => width >= min)[1];

export function useColumns(table) {
  const [cols, setCols] = useState(() => columnsAt(table, window.innerWidth));
  useEffect(() => {
    const sync = () => setCols(columnsAt(table, window.innerWidth));
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [table]);
  return cols;
}

// The current page lives in the URL (?page=2), so the back button, a refresh
// and a shared link all land on the same page. Returns the slice to show.
export function usePaged(items, size) {
  const [params, setParams] = useSearchParams();
  const pages = Math.max(1, Math.ceil(items.length / size));
  const asked = parseInt(params.get('page') || '1', 10);
  const page = Number.isFinite(asked) ? Math.min(Math.max(asked, 1), pages) : 1;

  const go = n => {
    const next = new URLSearchParams(params);
    if (n <= 1) next.delete('page'); else next.set('page', String(n));
    setParams(next);
  };

  // back to the top of the list when the page changes
  useEffect(() => { window.scrollTo({ top: 0 }); }, [page]);

  return {
    page, pages, go,
    slice: items.slice((page - 1) * size, page * size),
    from: items.length ? (page - 1) * size + 1 : 0,
    to: Math.min(page * size, items.length)
  };
}

// 1 … 4 5 [6] 7 8 … 12
function windowOf(page, pages) {
  const out = [];
  for (let n = 1; n <= pages; n++) {
    if (n === 1 || n === pages || Math.abs(n - page) <= 1) out.push(n);
    else if (out[out.length - 1] !== '…') out.push('…');
  }
  return out;
}

export default function Pagination({ page, pages, go }) {
  if (pages <= 1) return null;
  return (
    <nav className="pager" aria-label="Pages">
      <button type="button" className="pager-btn" onClick={() => go(page - 1)} disabled={page === 1}>← Previous</button>
      <ul>
        {windowOf(page, pages).map((n, i) => (
          <li key={n === '…' ? 'gap' + i : n}>
            {n === '…'
              ? <span className="pager-gap" aria-hidden="true">…</span>
              : <button type="button" className={'pager-num' + (n === page ? ' is-on' : '')} onClick={() => go(n)} aria-current={n === page ? 'page' : undefined} aria-label={'Page ' + n}>{n}</button>}
          </li>
        ))}
      </ul>
      <button type="button" className="pager-btn" onClick={() => go(page + 1)} disabled={page === pages}>Next →</button>
    </nav>
  );
}
