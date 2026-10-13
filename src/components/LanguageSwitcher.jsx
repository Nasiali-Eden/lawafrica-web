import { useEffect, useRef, useState } from 'react';

// Site language, by Google Translate's website translator.
//
// The page is written in English. Choosing another language sets Google's own
// `googtrans` cookie and reloads, and Google's script then translates the
// page in place. The script is only fetched when a non-English language is
// active, so English readers load nothing from Google.
//
// Mark anything that must stay as written (titles, prices, emails, phone
// numbers) with translate="no".
export const LANGUAGES = [
  { code: 'en', name: 'English', label: 'English' },
  { code: 'fr', name: 'French', label: 'Français' },
  { code: 'sw', name: 'Swahili', label: 'Kiswahili' },
  { code: 'hi', name: 'Hindi', label: 'हिन्दी' },
  { code: 'de', name: 'German', label: 'Deutsch' },
  { code: 'ru', name: 'Russian', label: 'Русский' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', label: '中文' },
  { code: 'es', name: 'Spanish', label: 'Español' },
  { code: 'it', name: 'Italian', label: 'Italiano' }
];

const COOKIE = 'googtrans';

function currentLanguage() {
  const m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE + '=/[^/]*/([^;]+)'));
  const code = m && decodeURIComponent(m[1]);
  return LANGUAGES.some(l => l.code === code) ? code : 'en';
}

function setLanguage(code) {
  const host = location.hostname;
  const gone = '; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  // clear every variant Google may have written, then set the one we want
  document.cookie = COOKIE + '=' + gone;
  document.cookie = COOKIE + '=' + gone + '; domain=' + host;
  document.cookie = COOKIE + '=' + gone + '; domain=.' + host;
  if (code !== 'en') document.cookie = COOKIE + '=/en/' + code + '; path=/';
}

// Google's script replaces text nodes underneath React. When React later
// removes or reorders a node the script has already moved, the DOM throws.
// These two guards make that case a no-op instead of a crash. Installed only
// while translating.
let guarded = false;
function guardDom() {
  if (guarded) return;
  guarded = true;
  const remove = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return remove.call(this, child);
  };
  const insert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return node;
    return insert.call(this, node, ref);
  };
}

function loadGoogle() {
  if (document.getElementById('gt-script')) return;
  guardDom();
  window.__gtInit = () => {
    new window.google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: LANGUAGES.filter(l => l.code !== 'en').map(l => l.code).join(','),
      autoDisplay: false
    }, 'google_translate_element');
  };
  const s = document.createElement('script');
  s.id = 'gt-script';
  s.src = 'https://translate.google.com/translate_a/element.js?cb=__gtInit';
  s.async = true;
  document.body.appendChild(s);
}

export default function LanguageSwitcher() {
  const [lang] = useState(currentLanguage);
  const [open, setOpen] = useState(false);
  const [focus, setFocus] = useState(0);
  const root = useRef(null);
  const trigger = useRef(null);
  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    if (lang !== 'en') loadGoogle();
  }, [lang]);

  // close on an outside click
  useEffect(() => {
    if (!open) return;
    const away = e => { if (root.current && !root.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', away);
    return () => document.removeEventListener('mousedown', away);
  }, [open]);

  const choose = code => {
    setOpen(false);
    if (code === lang) return;
    setLanguage(code);
    location.reload();
  };

  const openMenu = () => {
    setFocus(Math.max(0, LANGUAGES.findIndex(l => l.code === lang)));
    setOpen(true);
  };

  // arrows move, Enter chooses, Escape closes and returns focus to the button
  const onKeyDown = e => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); openMenu(); }
      return;
    }
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); trigger.current?.focus(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setFocus(i => (i + 1) % LANGUAGES.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocus(i => (i + LANGUAGES.length - 1) % LANGUAGES.length); }
    else if (e.key === 'Home') { e.preventDefault(); setFocus(0); }
    else if (e.key === 'End') { e.preventDefault(); setFocus(LANGUAGES.length - 1); }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(LANGUAGES[focus].code); }
    else if (e.key === 'Tab') setOpen(false);
  };

  return (
    <div className="lang" translate="no" ref={root} onKeyDown={onKeyDown}>
      <button
        ref={trigger}
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="lang-menu"
        aria-label={'Language: ' + current.name + '. Change language'}
        onClick={() => (open ? setOpen(false) : openMenu())}
      >
        <svg className="lang-globe" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.7 3.9 5.7 3.9 9s-1.3 6.3-3.9 9c-2.6-2.7-3.9-5.7-3.9-9S9.4 5.7 12 3Z" /></svg>
        <span>{current.label}</span>
        <svg className={'lang-chevron' + (open ? ' is-open' : '')} viewBox="0 0 10 6" width="10" height="6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {open && (
        <div className="lang-menu" id="lang-menu">
          <div className="lang-menu-head">Choose a language</div>
          <ul role="listbox" aria-label="Languages" aria-activedescendant={'lang-opt-' + LANGUAGES[focus].code}>
            {LANGUAGES.map((l, i) => (
              <li
                key={l.code}
                id={'lang-opt-' + l.code}
                role="option"
                lang={l.code}
                aria-selected={l.code === lang}
                className={'lang-opt' + (l.code === lang ? ' is-current' : '') + (i === focus ? ' is-focus' : '')}
                onMouseEnter={() => setFocus(i)}
                onClick={() => choose(l.code)}
              >
                <span className="lang-opt-native">{l.label}</span>
                <span className="lang-opt-name">{l.name}</span>
                <svg className="lang-tick" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </li>
            ))}
          </ul>
          <div className="lang-menu-foot">Translated by Google. Titles, prices and contact details stay as written.</div>
        </div>
      )}
      <div id="google_translate_element" />
    </div>
  );
}
