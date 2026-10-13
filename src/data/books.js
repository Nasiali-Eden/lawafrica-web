// Generated from the live catalogue by `npm run sync:books` — the records are
// in books.generated.json and are never edited by hand. This file only shapes
// them for the pages. These are print books only; eBooks are a separate
// catalogue (ebooks.js). Author, edition and jurisdiction are not carried by the
// upstream API, so they are empty and the pages leave them out.
import data from './books.generated.json';

function mk(r) {
  return {
    ...r,
    fmt: r.format
  };
}

export const books = data.books.map(mk);
export const featured = books.slice(0, 4);

