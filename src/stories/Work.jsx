import { span, lerp, clamp } from '../motion';
import { work } from '../content';
import { Tick, Cross, Lock } from './marks';

// Before: the earlier jobs, latest first, three slides each. Every slide draws
// the one point it carries (sample data); the job's name and tenure stay
// pinned while its three slides play.

const jobs = work.filter(w => !w.live);
const name = w => (w.company === 'Mastercard' ? (w.sector.startsWith('Design') ? 'Mastercard · DXP' : 'Mastercard · Commerce') : w.company.startsWith('Saathi') ? 'Saathi' : w.company);

const SLIDES = {
  'mastercard-commerce': [
    { title: 'Access by role, state as streams', dims: [] },
    { title: 'Big lists that stay fast', dims: [] },
    { title: 'One app instead of many', dims: [{ value: 'Many → 1', label: 'legacy micro-frontends merged into one Angular codebase' }] },
  ],
  'mastercard-dxp': [
    { title: 'A design system any team can adopt', dims: [{ value: '120+', label: 'web components, used by 200+ product teams' }] },
    { title: 'Safe to upgrade', dims: [] },
    { title: 'Building apps by dragging', dims: [{ value: '2 wk → 20 min', label: 'to build an enterprise form' }] },
  ],
  saathi: [
    { title: 'From Figma to a working network', dims: [] },
    { title: 'One kit, every screen', dims: [] },
    { title: 'Live, and quick to load', dims: [] },
  ],
};

export const steps = jobs.flatMap(w => w.points.map((p, n) => ({
  id: n === 0 ? w.id : undefined,
  group: { key: w.id, title: name(w), meta: `${w.role} · ${w.period}` },
  title: SLIDES[w.id][n].title,
  body: p,
  dims: SLIDES[w.id][n].dims.length ? SLIDES[w.id][n].dims : undefined,
})));

/* ── shared strip: 2020–2026, cursor rewinds through the current job ── */

const month = s => (s ? (+s.slice(0, 4) - 2020) * 12 + (+s.slice(5, 7) - 1) : 82);
const X0 = 60;
const X1 = 740;
const mx = m => X0 + ((X1 - X0) * m) / 84;

function Strip({ job, p }) {
  const cursor = mx(lerp(month(job.to), month(job.from), p));
  return (
    <g className="strip">
      {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((y, n) => (
        <text key={y} x={mx(n * 12) + 4} y="30">{y}</text>
      ))}
      <line x1={X0} y1="44" x2={X1} y2="44" className="rail" />
      {work.map(w => (
        <rect key={w.id} x={mx(month(w.from)) + 1} y="38" width={mx(month(w.to)) - mx(month(w.from)) - 2} height="12"
          className={w.id === job.id ? 'seg on' : 'seg'} />
      ))}
      <line x1={cursor} y1="32" x2={cursor} y2="58" className="cursor" />
    </g>
  );
}

/* ── Mastercard Commerce ───────────────────────────────────── */

function Rbac({ k }) {
  const roles = ['Partner admin', 'Merchant', 'Viewer'];
  const r = Math.min(2, Math.floor(span(k, 0.05, 0.75) * 3));
  const routes = [['/onboarding', [1, 0, 0]], ['/users', [1, 1, 0]], ['/dashboards', [1, 1, 1]], ['/payouts', [1, 1, 0]], ['/audit', [1, 0, 0]]];
  return (
    <g>
      <text x="60" y="90" className="lbl dim">Signed in as</text>
      {roles.map((ro, n) => (
        <g key={ro}>
          <rect x={60 + n * 132} y="102" width="122" height="34" className={n === r ? 'chip on' : 'chip'} />
          <text x={121 + n * 132} y="124" className={n === r ? 'lbl sm c sig' : 'lbl sm c'}>{ro}</text>
        </g>
      ))}
      <text x="60" y="176" className="lbl dim">Route guards</text>
      {routes.map(([path, allow], n) => {
        const ok = allow[r] === 1;
        return (
          <g key={path}>
            <rect x="60" y={188 + n * 46} width="380" height="36" className={ok ? 'box on' : 'box faint'} />
            <text x="76" y={211 + n * 46} className={ok ? 'lbl' : 'lbl dim'}>{path}</text>
            {ok ? <Tick x={410} y={200 + n * 46} /> : <Lock x={406} y={194 + n * 46} />}
          </g>
        );
      })}
      <text x="490" y="176" className="lbl dim">State with RxJS and NgRx</text>
      {['store', 'selector', 'component'].map((s, n) => (
        <g key={s}>
          <rect x="490" y={192 + n * 82} width="110" height="40" className="box" />
          <text x="545" y={217 + n * 82} className="lbl sm c">{s}</text>
          {n < 2 && <line x1="545" y1={232 + n * 82} x2="545" y2={274 + n * 82} className="wire" />}
        </g>
      ))}
      {[0, 0.33, 0.66].map((o, n) => {
        const ph = (k * 2 + o) % 1;
        return <circle key={n} cx="545" cy={lerp(212, 418, ph)} r="6" className="marble" />;
      })}
      <line x1="640" y1="200" x2="640" y2="420" className="wire" />
      {[0.15, 0.4, 0.62, 0.85].map((o, n) => (
        <circle key={n} cx="640" cy={lerp(200, 420, (o + k * 0.6) % 1)} r="5" className={n === r ? 'marble' : 'marble dim'} />
      ))}
      <text x="660" y="214" className="lbl sm dim">permissions$</text>
    </g>
  );
}

function BigList({ k }) {
  const off = k * 9;
  const rows = 12;
  const vitals = [['LCP', 3.4, 2.1, 's'], ['CLS', 0.21, 0.06, ''], ['INP', 380, 160, 'ms']];
  const v = span(k, 0.45, 0.95);
  return (
    <g>
      <text x="60" y="90" className="lbl dim">Transactions · 48,000 rows (sample)</text>
      <rect x="60" y="102" width="420" height="330" className="box" />
      <g clipPath="url(#vlist)">
        {Array.from({ length: rows + 2 }, (_, n) => {
          const y = 128 + (n - (off % 1)) * 24;
          const id = Math.floor(off) + n + 1201;
          return (
            <g key={n}>
              <rect x="74" y={y - 15} width="392" height="20" className={n > 0 && n < rows ? 'row on' : 'row'} />
              <text x="84" y={y} className="lbl sm">#{id}</text>
              <text x="190" y={y} className="lbl sm dim">merchant {(id * 7) % 97}</text>
              <text x="456" y={y} className="lbl sm" textAnchor="end">${((id * 37) % 900) + 40}.00</text>
            </g>
          );
        })}
      </g>
      <defs><clipPath id="vlist"><rect x="62" y="104" width="416" height="296" /></clipPath></defs>
      <rect x="60" y="402" width="420" height="30" className="box" />
      <text x="74" y="422" className="lbl sm">page {3 + Math.floor(k * 4)} of 400 · sorted by amount, server-side</text>
      <rect x="486" y="102" width="6" height="330" className="track" />
      <rect x="486" y={102 + k * 280} width="6" height="50" className="bar" />
      <text x="520" y="110" className="num sm">{rows}</text>
      <text x="560" y="110" className="lbl sm">rows rendered at a time</text>
      <text x="520" y="170" className="lbl dim">Core Web Vitals · sample</text>
      {vitals.map(([n2, a, b, u], n) => {
        const val = lerp(a, b, v);
        return (
          <g key={n2}>
            <text x="520" y={206 + n * 62} className="lbl">{n2}</text>
            <rect x="570" y={194 + n * 62} width="170" height="14" className="track" />
            <rect x="570" y={194 + n * 62} width={170 * (val / a)} height="14" className="bar" />
            <text x="570" y={226 + n * 62} className={v > 0.98 ? 'lbl sm sig' : 'lbl sm dim'}>
              {n2 === 'CLS' ? val.toFixed(2) : n2 === 'LCP' ? `${val.toFixed(1)} ${u}` : `${Math.round(val)} ${u}`}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Merge({ k }) {
  const merge = span(k, 0.05, 0.5);
  const gates = span(k, 0.55, 0.95);
  const parts = ['Onboarding', 'Users', 'Dashboards', 'Activity'];
  return (
    <g>
      <text x="60" y="90" className="lbl dim">Partner and merchant portal</text>
      <rect x="60" y="102" width="440" height="270" className="box" style={{ opacity: merge }} />
      <text x="75" y="126" className="lbl" style={{ opacity: merge }}>One Angular app · shared components, routes, state</text>
      {parts.map((p, n) => {
        const sx = 60 + n * 120;
        const sy = n % 2 ? 190 : 140;
        const ex = 80 + (n % 2) * 205;
        const ey = 150 + Math.floor(n / 2) * 105;
        return (
          <g key={p}>
            <rect x={lerp(sx, ex, merge)} y={lerp(sy, ey, merge)} width={lerp(100, 195, merge)} height="80"
              className={merge > 0.98 ? 'box on' : 'box'} />
            <text x={lerp(sx, ex, merge) + 12} y={lerp(sy, ey, merge) + 46} className="lbl">{p}</text>
          </g>
        );
      })}
      <text x="550" y="90" className="lbl dim">CI gates before merge</text>
      {[['Bundle size', 0.62], ['axe-core a11y', 0.45], ['Perf budget', 0.7]].map(([g, v], n) => {
        const on = clamp(gates * 3 - n);
        return (
          <g key={g}>
            <text x="550" y={130 + n * 76} className="lbl">{g}</text>
            <rect x="550" y={142 + n * 76} width="180" height="14" className="track" />
            <rect x="550" y={142 + n * 76} width={180 * v * on} height="14" className="bar" />
            <line x1={550 + 180 * 0.8} y1={136 + n * 76} x2={550 + 180 * 0.8} y2={162 + n * 76} className="budget" />
            {on > 0.98 && <g><Tick x={550} y={170 + n * 76} /><text x="570" y={180 + n * 76} className="lbl ok">under budget</text></g>}
          </g>
        );
      })}
    </g>
  );
}

/* ── Mastercard DXP ────────────────────────────────────────── */

const THEMES = [
  { n: 'Default', a: 'var(--ink)', b: 'var(--ground)' },
  { n: 'Brand B', a: 'var(--signal)', b: 'var(--ground)' },
  { n: 'High contrast', a: 'var(--ground)', b: 'var(--ink)' },
];

function DesignSystem({ k }) {
  const tiles = Math.round(span(k, 0, 0.4) * 120);
  const th = THEMES[Math.min(2, Math.floor(span(k, 0.3, 0.95) * 3))];
  const wrap = span(k, 0.2, 0.6);
  return (
    <g>
      <text x="60" y="90" className="lbl dim">StencilJS web components</text>
      {Array.from({ length: 120 }, (_, n) => (
        <rect key={n} x={60 + (n % 12) * 18} y={102 + Math.floor(n / 12) * 18} width="13" height="13"
          className={n < tiles ? 'tile on' : 'tile'} />
      ))}
      <text x="60" y="306" className="num sm">{tiles}</text>
      {['React', 'Angular', 'Vue'].map((f, n) => (
        <g key={f} style={{ opacity: wrap }}>
          <line x1="276" y1="190" x2={lerp(276, 330, wrap)} y2={130 + n * 60} className="wire" />
          <rect x="330" y={114 + n * 60} width="96" height="32" className="chip on" />
          <text x="378" y={135 + n * 60} className="lbl sm c">{f} wrapper</text>
        </g>
      ))}
      <text x="470" y="90" className="lbl dim">Design tokens · theme: <tspan className="sig">{th.n}</tspan></text>
      <rect x="470" y="102" width="270" height="200" className="box" style={{ fill: th.b, transition: 'fill 300ms' }} />
      <text x="490" y="138" className="lbl" style={{ fill: th.a }}>Card title</text>
      <rect x="490" y="152" width="200" height="8" className="track" />
      <rect x="490" y="168" width="160" height="8" className="track" />
      <rect x="490" y="206" width="110" height="36" style={{ fill: th.a, transition: 'fill 300ms' }} />
      <text x="545" y="229" className="lbl sm c" style={{ fill: th.b }}>Primary</text>
      <rect x="612" y="206" width="110" height="36" style={{ fill: th.b, stroke: th.a, strokeWidth: 1.5, transition: 'fill 300ms' }} />
      <text x="667" y="229" className="lbl sm c" style={{ fill: th.a }}>Secondary</text>
      <text x="60" y="360" className="lbl dim">Storybook</text>
      {['Button', 'Card', 'Data table', 'Date picker', 'Modal'].map((s, n) => (
        <g key={s}>
          <rect x={60 + n * 136} y="372" width="128" height="34" className={n === Math.floor(k * 5) % 5 ? 'chip on' : 'chip'} />
          <text x={124 + n * 136} y="394" className="lbl sm c">{s}</text>
        </g>
      ))}
    </g>
  );
}

function Regression({ k }) {
  const scan = span(k, 0.05, 0.5);
  const flag = k > 0.5;
  const teams = span(k, 0.6, 0.95);
  return (
    <g>
      <text x="60" y="90" className="lbl dim">Visual regression · release 4.12 (sample)</text>
      {['baseline', 'this release'].map((l, n) => (
        <g key={l}>
          <text x={60 + n * 230} y="118" className="lbl sm dim">{l}</text>
          <rect x={60 + n * 230} y="128" width="210" height="150" className="box" />
          <rect x={78 + n * 230} y="148" width="120" height="10" className="track" />
          <rect x={78 + n * 230} y="168" width="170" height="8" className="track" />
          <rect x={78 + n * 230} y="220" width={n ? 96 : 80} height="32" className={n ? 'bar' : 'bar ink'} />
        </g>
      ))}
      <line x1="290" y1={lerp(128, 278, scan)} x2="500" y2={lerp(128, 278, scan)} className="cursor-h" />
      {flag && (
        <g>
          <rect x="302" y="212" width="112" height="48" className="diff" />
          <Cross x={420} y={200} />
          <text x="60" y="320" className="lbl sig">1 change flagged: button width +16px</text>
          <text x="60" y="346" className="lbl sm dim">release held until the change is approved</text>
        </g>
      )}
      <text x="560" y="118" className="lbl dim">Also checked</text>
      {['axe-core accessibility', 'Core Web Vitals'].map((c, n) => (
        <g key={c} style={{ opacity: span(k, 0.3 + n * 0.15, 0.5 + n * 0.15) }}>
          <Tick x={560} y={136 + n * 34} />
          <text x="582" y={147 + n * 34} className="lbl">{c}</text>
        </g>
      ))}
      <text x="560" y="250" className="lbl dim">Teams upgrading safely</text>
      {Array.from({ length: 24 }, (_, n) => (
        <circle key={n} cx={566 + (n % 8) * 22} cy={272 + Math.floor(n / 8) * 22} r="6"
          className={n < teams * 24 ? 'dot on' : 'dot'} />
      ))}
      <text x="560" y="360" className="lbl sm" style={{ opacity: teams }}>200+ teams in all</text>
    </g>
  );
}

function Studio({ k }) {
  const drag = span(k, 0.05, 0.45);
  const placed = k > 0.45;
  const form = span(k, 0.6, 0.95);
  const gx = lerp(110, 360, drag);
  const gy = lerp(150, 200, drag);
  return (
    <g>
      <text x="60" y="90" className="lbl dim">Design Studio · drag-and-drop (sample)</text>
      <rect x="60" y="102" width="140" height="250" className="box" />
      {['Header', 'Form', 'Table', 'Chart'].map((c, n) => (
        <g key={c}>
          <rect x="74" y={118 + n * 54} width="112" height="40" className={n === 1 ? 'chip on' : 'chip'} />
          <text x="130" y={143 + n * 54} className="lbl sm c">{c}</text>
        </g>
      ))}
      <rect x="220" y="102" width="300" height="250" className="box on" />
      <rect x="236" y="118" width="268" height="36" className="box" />
      <text x="250" y="141" className="lbl sm dim">Header</text>
      {placed && (
        <g>
          <rect x="236" y="168" width="268" height="120" className="box on" />
          <text x="250" y="190" className="lbl sm">Form</text>
          {[0, 1, 2].map(n => <rect key={n} x="250" y={202 + n * 26} width="200" height="16" className="track" />)}
        </g>
      )}
      {!placed && k > 0.02 && (
        <g transform={`translate(${gx} ${gy})`}>
          <rect x="-56" y="-20" width="112" height="40" className="chip on ghost" />
          <text x="0" y="5" className="lbl sm c">Form</text>
        </g>
      )}
      <text x="540" y="130" className="lbl sm dim">layout query</text>
      <text x="540" y="162" className="num sm">{placed ? '< 100 ms' : '…'}</text>
      <text x="60" y="396" className="lbl dim">Enterprise form, start to finish</text>
      <rect x="60" y="408" width={lerp(680, 24, form)} height="22" className="bar" />
      <text x="60" y="456" className={form > 0.98 ? 'lbl sig' : 'lbl'}>{form > 0.98 ? '~20 minutes' : 'two weeks'}</text>
    </g>
  );
}

/* ── Saathi ────────────────────────────────────────────────── */

function FigmaToPage({ k }) {
  const build = span(k, 0.1, 0.8);
  return (
    <g>
      <text x="60" y="90" className="lbl dim">Figma frame</text>
      <rect x="60" y="102" width="300" height="330" className="box own" />
      {[[80, 122, 260, 40], [80, 182, 120, 120], [214, 182, 126, 52], [214, 248, 126, 52], [80, 318, 260, 40], [80, 372, 260, 40]].map(([x, y, w, h], n) => (
        <rect key={n} x={x} y={y} width={w} height={h} className="box own" />
      ))}
      <line x1="370" y1="266" x2="430" y2="266" className="wire" />
      <text x="400" y="256" className="lbl sm c dim">Vue 2</text>
      <text x="440" y="90" className="lbl dim">Built page · schools and parents (sample)</text>
      <rect x="440" y="102" width="300" height="330" className="box on" />
      <g style={{ opacity: build }}>
        <rect x="460" y="122" width="260" height="40" className="bar ink" />
        <text x="472" y="148" className="lbl strong" style={{ fill: 'var(--ground)' }}>Oakridge School</text>
        <circle cx="520" cy="242" r="52" className="face" />
        <text x="594" y="206" className="lbl sm">1,240 parents</text>
        <text x="594" y="230" className="lbl sm">18 schools linked</text>
        <rect x="594" y="268" width="126" height="32" className="chip on" />
        <text x="657" y="289" className="lbl sm c">Connect</text>
        <text x="460" y="340" className="lbl">Upcoming: inter-school debate</text>
        <text x="460" y="394" className="lbl">Scholarship, Grade 11</text>
      </g>
      {build > 0.6 && <text x="440" y="456" className="lbl sm sig">matches the frame, pixel for pixel</text>}
    </g>
  );
}

function Kit({ k }) {
  const parts = ['Card', 'Avatar', 'Button', 'Feed item', 'Input'];
  const screens = ['Profile', 'Feed', 'Messages'];
  const fly = span(k, 0.1, 0.85);
  return (
    <g>
      <text x="60" y="90" className="lbl dim">Vue component kit + Vuex patterns</text>
      {parts.map((p, n) => (
        <g key={p}>
          <rect x="60" y={104 + n * 62} width="150" height="44" className="chip on" />
          <text x="135" y={131 + n * 62} className="lbl sm c">{p}</text>
        </g>
      ))}
      {screens.map((s, n) => {
        const x = 280 + n * 160;
        return (
          <g key={s}>
            <rect x={x} y="104" width="140" height="300" className="box on" />
            <text x={x + 12} y="128" className="lbl sm dim">{s}</text>
            {[0, 1, 2, 3].map(r => {
              const src = (n + r) % parts.length;
              const sy = 126 + src * 62;
              const ty = 142 + r * 62;
              const o = clamp(fly * 4 - r * 0.6 - n * 0.3);
              return (
                <g key={r} style={{ opacity: o > 0 ? 1 : 0 }}>
                  <rect x={lerp(60, x + 12, o)} y={lerp(sy - 22, ty, o)} width={lerp(150, 116, o)} height="44"
                    className={o > 0.98 ? 'box' : 'chip on'} />
                  <text x={lerp(135, x + 70, o)} y={lerp(sy + 5, ty + 27, o)} className="lbl sm c">{parts[src]}</text>
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

function LiveFast({ k }) {
  const schools = [{ x: 150, y: 160, n: 'Oakridge' }, { x: 300, y: 250, n: 'St. Mary’s' }, { x: 150, y: 340, n: 'Delhi Public' }];
  const ph = (k * 2) % 1;
  const chunks = [['/feed', 32], ['/profile', 24], ['/messages', 41], ['/opportunities', 28]];
  const load = span(k, 0.2, 0.95) * chunks.length;
  return (
    <g>
      <text x="60" y="90" className="lbl dim">Real-time messaging · Redis, Django Channels</text>
      {[[0, 1], [1, 2], [0, 2]].map(([a, b], n) => (
        <line key={n} x1={schools[a].x} y1={schools[a].y} x2={schools[b].x} y2={schools[b].y} className="wire" />
      ))}
      {[[60, 240], [400, 150], [410, 360]].map(([x, y], n) => (
        <g key={n}>
          <line x1={schools[n].x} y1={schools[n].y} x2={x} y2={y} className="wire" />
          <circle cx={x} cy={y} r="7" className="dot" />
        </g>
      ))}
      {schools.map(sc => (
        <g key={sc.n}>
          <rect x={sc.x - 56} y={sc.y - 18} width="112" height="36" className="box on" />
          <text x={sc.x} y={sc.y + 5} className="lbl sm c">{sc.n}</text>
        </g>
      ))}
      <rect x={lerp(300, 410, ph) - 5} y={lerp(250, 360, ph) - 5} width="10" height="10" className="pkt" />
      <text x="320" y="420" className="lbl sm dim">WebSocket push, no refresh</text>
      <text x="500" y="90" className="lbl dim">Route chunks, loaded on visit</text>
      {chunks.map(([r, kb], n) => {
        const on = clamp(load - n);
        return (
          <g key={r}>
            <text x="500" y={130 + n * 70} className="lbl">{r}</text>
            <rect x="500" y={142 + n * 70} width="240" height="14" className="track" />
            <rect x="500" y={142 + n * 70} width={240 * (kb / 45) * on} height="14" className="bar" />
            <text x="740" y={178 + n * 70} className="lbl sm dim" textAnchor="end">{on > 0.98 ? `${kb} kB, on demand` : ''}</text>
          </g>
        );
      })}
    </g>
  );
}

const SCENES = {
  'mastercard-commerce': [Rbac, BigList, Merge],
  'mastercard-dxp': [DesignSystem, Regression, Studio],
  saathi: [FigmaToPage, Kit, LiveFast],
};

export function Stage({ t }) {
  const s = Math.min(steps.length - 1, Math.floor(t));
  const k = clamp(t - s);
  const job = jobs[Math.floor(s / 3)];
  const Scene = SCENES[job.id][s % 3];
  return (
    <svg className="stage-map story" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid meet">
      <Strip job={job} p={((s % 3) + k) / 3} />
      <g key={s} className="scene"><Scene k={k} /></g>
    </svg>
  );
}
