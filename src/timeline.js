// Timeline geometry: Jan 2020 to Dec 2026, one unit per month.
export const START = { y: 2020, m: 1 };
export const SPAN = 7 * 12; // Jan 2020 to Dec 2026
const NOW = { y: 2026, m: 11 };
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const parse = s => (s ? { y: +s.slice(0, 4), m: +s.slice(5, 7) } : NOW);
const index = d => (d.y - START.y) * 12 + (d.m - START.m);
export const pct = n => `${(n / SPAN) * 100}%`;

function length(from, to) {
  const n = index(parse(to)) - index(parse(from)) + 1;
  const y = Math.floor(n / 12);
  const m = n % 12;
  return [y && `${y} yr`, m && `${m} mo`].filter(Boolean).join(' ');
}

function short(company, sector) {
  if (company === 'Mastercard') return sector.startsWith('Design') ? 'Mastercard DXP' : 'Mastercard Commerce';
  if (company.startsWith('Saathi')) return 'Saathi';
  return company;
}

export function toItems(work, projects) {
  const jobs = work.map(w => {
    const a = index(parse(w.from));
    const b = index(parse(w.to)) + 1;
    return {
      id: w.id,
      lane: 'work',
      live: !!w.live,
      label: short(w.company, w.sector),
      title: short(w.company, w.sector),
      role: w.role,
      period: w.period,
      length: length(w.from, w.to),
      years: `${w.from.slice(0, 4)}–${w.to ? w.to.slice(0, 4) : 'now'}`,
      dims: w.dims.slice(0, 2),
      summary: w.summary,
      left: a,
      width: b - a,
    };
  });
  const own = projects.map((p, i) => ({
    id: p.id,
    lane: 'own',
    row: i,
    label: p.name,
    title: p.name,
    role: 'Built on my own',
    period: '2026',
    length: null,
    years: '2026',
    dims: p.dims.slice(0, 2),
    summary: p.tagline,
    left: index({ y: 2026, m: 1 }),
    width: 12,
  }));
  return [...jobs, ...own];
}

