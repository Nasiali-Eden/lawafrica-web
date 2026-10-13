// Generated from the digital store by `npm run sync:ebooks` — the records are
// in ebooks.generated.json and are never edited by hand. eBooks are a separate
// catalogue from the print books: they are sold and delivered by the digital
// store (covers and files served by Snapplify), so each title links out to it
// to buy rather than going through this site's basket.
import data from './ebooks.generated.json';

export const ebooks = data.ebooks;
export const STORE_URL = 'https://digital.lawafrica.com/products';
