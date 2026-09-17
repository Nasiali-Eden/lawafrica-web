export function getPlans(billing) {
  const yr = billing === 'year';
  return [
    { id: 'pro', name: 'Pro', kicker: 'For the individual advocate',
      price: yr ? 'KES 24,000' : 'KES 2,400', per: yr ? '/year' : '/month',
      save: yr ? 'Two months free against monthly' : 'Billed monthly, cancel any time',
      blurb: 'Everything you need to read, cite and rely on a judgment with confidence.',
      bd: 'var(--color-divider)', bg: 'transparent', badge: '', hasBadge: false,
      cta: 'Choose Pro',
      feats: ['Full text of every reported judgment', 'All six jurisdictions, 25 years of reporting', 'Unlimited headnote and catchword search', 'Citator: what cited this, and how', '30 PDF downloads a month', 'Saved searches and citation lists'] },
    { id: 'plus', name: 'Plus', kicker: 'For chambers and research teams',
      price: yr ? 'KES 42,000' : 'KES 4,200', per: yr ? '/year' : '/month',
      save: yr ? 'Two months free against monthly' : 'Billed monthly, cancel any time',
      blurb: 'Pro, plus the tools a team needs to work on the same authorities together.',
      bd: 'var(--color-accent)', bg: 'var(--color-accent-100)', badge: 'Most chosen by chambers', hasBadge: true,
      cta: 'Choose Plus',
      feats: ['Everything in Pro', 'Three seats included, more on request', 'Unlimited PDF and DOCX downloads', 'Annotations and shared matter folders', 'Weekly judgment alerts by practice area', 'Cross-jurisdiction citator and export to brief', 'Priority line to the editorial desk'] }
  ];
}

export const llrFilters = [
  { name: 'Court', opts: [['Court of Appeal', '96', true], ['High Court', '164'], ['Employment & Labour', '38'], ['Environment & Land', '20']] },
  { name: 'Jurisdiction', opts: [['Kenya', '241', true], ['Tanzania', '48'], ['Uganda', '29']] },
  { name: 'Year reported', opts: [['2026', '34'], ['2025', '88'], ['2024', '96'], ['Earlier', '100']] }
].map(f => ({ name: f.name, opts: f.opts.map(([label, n, on]) => ({ label, n, on: !!on })) }));
