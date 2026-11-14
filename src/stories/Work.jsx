import { span, lerp, clamp } from '../motion';
import { work } from '../content';
import { Tick } from './marks';

// Work, told in order. Each scene is a sample-data drawing of what the job was
// about; the step text carries the real points from the resume.

// Latest first, as a rewind; SiteRecon has its own chapter.
const jobs = work.filter(w => !w.live);
const name = w => (w.company === 'Mastercard' ? (w.sector.startsWith('Design') ? 'Mastercard · DXP' : 'Mastercard · Commerce') : w.company.startsWith('Saathi') ? 'Saathi' : w.company);

export const steps = jobs.map(w => ({
  id: w.id,
  title: name(w),
  meta: `${w.role} · ${w.period}`,
  dims: w.dims,
  points: w.points,
}));

const month = s => (s ? (+s.slice(0, 4) - 2020) * 12 + (+s.slice(5, 7) - 1) : 82);
const X0 = 60;
const X1 = 740;
const mx = m => X0 + ((X1 - X0) * m) / 84;

function Strip({ t }) {
  const i = Math.min(jobs.length - 1, Math.floor(t));
  const k = clamp(t - i);
  const j = jobs[i];
  const cursor = mx(lerp(month(j.from), month(j.to), k));
  return (
    <g className="strip">
      {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((y, n) => (
        <text key={y} x={mx(n * 12) + 4} y="30">{y}</text>
      ))}
      <line x1={X0} y1="44" x2={X1} y2="44" className="rail" />
      {work.map(w => (
        <rect key={w.id} x={mx(month(w.from)) + 1} y="38" width={mx(month(w.to)) - mx(month(w.from)) - 2} height="12"
          className={w.id === j.id ? 'seg on' : 'seg'} />
      ))}
      <line x1={cursor} y1="32" x2={cursor} y2="58" className="cursor" />
    </g>
  );
}

function Saathi({ k }) {
  const schools = [{ x: 150, y: 150, n: 'Oakridge School' }, { x: 330, y: 250, n: 'St. Mary’s' }, { x: 150, y: 360, n: 'Delhi Public' }];
  const parents = [[60, 230], [250, 110], [260, 400], [400, 140], [410, 380], [70, 420]];
  const links = [[0, 1], [1, 2], [0, 2], [0, 0], [1, 3], [1, 4], [2, 2], [2, 5], [0, 1]];
  const net = span(k, 0, 0.45);
  const feed = Math.round(span(k, 0.35, 0.9) * 4);
  const ph = span(k, 0.5, 0.95);
  const posts = [
    ['Inter-school debate', 'Oakridge School · open to Grades 9–12'],
    ['Science fair partners wanted', 'St. Mary’s · 3 schools joined'],
    ['Scholarship: Grade 11', 'Delhi Public · deadline 30 Jun'],
    ['Parent volunteers for sports day', 'Oakridge School'],
  ];
  return (
    <g>
      <text x="60" y="90" className="lbl dim">A network of schools and parents · sample</text>
      {[[0, 1], [1, 2], [0, 2]].map(([a, b], n) => (
        <line key={n} x1={schools[a].x} y1={schools[a].y} x2={schools[b].x} y2={schools[b].y} className="wire"
          pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1 - net }} />
      ))}
      {parents.map(([x, y], n) => {
        const sc = schools[links[n + 3]?.[0] ?? 0];
        return (
          <g key={n} style={{ opacity: net }}>
            <line x1={sc.x} y1={sc.y} x2={x} y2={y} className="wire" />
            <circle cx={x} cy={y} r="7" className="dot" />
          </g>
        );
      })}
      {schools.map(sc => (
        <g key={sc.n}>
          <rect x={sc.x - 62} y={sc.y - 18} width="124" height="36" className="box on" />
          <text x={sc.x} y={sc.y + 5} className="lbl sm c">{sc.n}</text>
        </g>
      ))}
      {k > 0.5 && k < 0.98 && (
        <rect x={lerp(schools[1].x, 410, ph) - 5} y={lerp(schools[1].y, 380, ph) - 5} width="10" height="10" className="pkt" />
      )}
      <text x="300" y="455" className="lbl sm dim" style={{ opacity: span(k, 0.5, 0.7) }}>live message over WebSocket</text>
      <rect x="480" y="70" width="260" height="370" className="box" />
      <text x="496" y="96" className="lbl dim">Shared opportunities</text>
      {posts.slice(0, feed).map(([t1, t2], n) => (
        <g key={t1}>
          <rect x="496" y={112 + n * 78} width="228" height="64" className={n === feed - 1 ? 'bubble me' : 'bubble'} />
          <text x="508" y={138 + n * 78} className="lbl sm">{t1}</text>
          <text x="508" y={158 + n * 78} className="lbl sm dim">{t2}</text>
        </g>
      ))}
    </g>
  );
}

function Dxp({ k }) {
  const tiles = Math.round(span(k, 0.05, 0.55) * 120);
  const teams = span(k, 0.45, 0.75);
  const form = span(k, 0.7, 1);
  return (
    <g>
      <text x="70" y="100" className="lbl dim">DXP design system · StencilJS web components</text>
      {Array.from({ length: 120 }, (_, n) => (
        <rect key={n} x={70 + (n % 15) * 22} y={115 + Math.floor(n / 15) * 22} width="16" height="16"
          className={n < tiles ? 'tile on' : 'tile'} />
      ))}
      <text x="70" y="315" className="num">{tiles}</text>
      <text x="125" y="315" className="lbl">components</text>
      {Array.from({ length: 10 }, (_, n) => (
        <line key={n} x1="400" y1="200" x2={lerp(400, 690, teams)} y2={lerp(200, 105 + n * 22, teams)} className="wire" />
      ))}
      {teams > 0.95 && Array.from({ length: 10 }, (_, n) => <circle key={n} cx="700" cy={105 + n * 22} r="6" className="dot" />)}
      <text x="560" y="345" className="lbl" style={{ opacity: teams }}>200+ product teams</text>
      <text x="70" y="400" className="lbl dim">Enterprise form, start to finish</text>
      <rect x="70" y="415" width={lerp(660, 26, form)} height="26" className="bar" />
      <text x="70" y="466" className={form < 0.98 ? 'lbl' : 'lbl sig'}>{form < 0.98 ? 'two weeks' : '~20 minutes'}</text>
    </g>
  );
}

function Commerce({ k }) {
  const merge = span(k, 0.05, 0.5);
  const gates = span(k, 0.55, 0.95);
  const parts = ['Onboarding', 'Users', 'Dashboards', 'Activity'];
  return (
    <g>
      <text x="70" y="100" className="lbl dim">Partner and merchant portal</text>
      <rect x="70" y="112" width="440" height="260" className="box" style={{ opacity: merge }} />
      <text x="85" y="135" className="lbl" style={{ opacity: merge }}>One Angular app · shared components, routes, state</text>
      {parts.map((p, n) => {
        const sx = 70 + n * 120;
        const sy = n % 2 ? 190 : 150;
        const ex = 90 + (n % 2) * 205;
        const ey = 155 + Math.floor(n / 2) * 100;
        return (
          <g key={p}>
            <rect x={lerp(sx, ex, merge)} y={lerp(sy, ey, merge)} width={lerp(100, 195, merge)} height="80"
              className={merge > 0.98 ? 'box on' : 'box'} />
            <text x={lerp(sx, ex, merge) + 12} y={lerp(sy, ey, merge) + 46} className="lbl">{p}</text>
          </g>
        );
      })}
      <text x="560" y="100" className="lbl dim">CI gates before merge</text>
      {[['Bundle size', 0.62], ['axe-core a11y', 0.45], ['Perf budget', 0.7]].map(([g, v], n) => {
        const on = clamp(gates * 3 - n);
        return (
          <g key={g}>
            <text x="560" y={140 + n * 70} className="lbl">{g}</text>
            <rect x="560" y={152 + n * 70} width="170" height="14" className="track" />
            <rect x="560" y={152 + n * 70} width={170 * v * on} height="14" className="bar" />
            <line x1={560 + 170 * 0.8} y1={146 + n * 70} x2={560 + 170 * 0.8} y2={172 + n * 70} className="budget" />
            {on > 0.98 && <g><Tick x={560} y={180 + n * 70} /><text x="580" y={190 + n * 70} className="lbl ok">under budget</text></g>}
          </g>
        );
      })}
    </g>
  );
}

const scenes = { 'mastercard-commerce': Commerce, 'mastercard-dxp': Dxp, saathi: Saathi };

export function Stage({ t }) {
  const i = Math.min(jobs.length - 1, Math.floor(t));
  const Scene = scenes[jobs[i].id];
  return (
    <svg className="stage-map story" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid meet">
      <Strip t={t} />
      <g key={i} className="scene"><Scene k={clamp(t - i)} /></g>
    </svg>
  );
}
