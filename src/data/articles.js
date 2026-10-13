// Generated from the live blog by `npm run sync:articles` — the posts are in
// articles.generated.json and are never edited by hand. This file only shapes
// them for the pages.
//
// These are the twelve posts on www.lawafrica.com today. Most are theme demo
// content about entrepreneurship, not law; they stand in until the editorial
// team publishes real pieces, which will arrive here on the next sync.
import data from './articles.generated.json';
import { asset } from '../lib/format.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const longDate = iso => {
  const m = iso && iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${Number(m[3])} ${MONTHS[Number(m[2]) - 1]} ${m[1]}` : '';
};
const shortDate = iso => longDate(iso).replace(/(\d+ [A-Za-z]{3})[a-z]* (\d{4})/, '$1 $2');

function shape(a) {
  const words = a.body.join(' ').split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.ceil(words / 200));
  return {
    id: a.id,
    kind: 'Articles',
    live: true,
    img: a.cover || asset('/assets/plate-article.jpg'),
    pillar: a.category || 'Article',
    title: a.title,
    dek: a.dek,
    author: a.author || 'LawAfrica',
    role: '',
    date: longDate(a.date),
    read: `${mins} min read`,
    meta: [a.author, shortDate(a.date), `${mins} min`].filter(Boolean).join(' · ')
  };
}

export const allArticles = data.articles.map(shape);

// One unheaded section per article: the posts are plain paragraphs.
export const artBodies = Object.fromEntries(data.articles.map(a => [a.id, {
  stand: a.dek,
  keys: [],
  secs: [{ h: '', ps: a.body.map(t => ({ t })) }],
  sources: []
}]));

// Each category takes a secondary colour from the brand palette, so a row of
// article cards is told apart at a glance and the page is not all maroon.
const PILLAR_INK = {
  Legal: 'var(--navy-ink)',
  Consulting: 'var(--teal-ink)',
  Leadership: 'var(--azure-800)',
  Productivity: 'var(--tan-ink)',
  'Human Resources': 'var(--coral-ink)',
  Marketing: 'var(--navy-ink)',
  Innovation: 'var(--teal-ink)'
};
export const pillarInk = p => PILLAR_INK[p] || 'var(--color-accent-700)';
