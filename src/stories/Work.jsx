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
  const clients = [{ y: 150, n: 'Student A' }, { y: 270, n: 'Student B' }, { y: 390, n: 'Mentor' }];
  const hub = { x: 400, y: 270 };
  const msgs = Math.round(span(k, 0.2, 0.95) * 5);
  return (
    <g>
      <rect x="350" y="220" width="100" height="100" className="box on" />
      <text x="400" y="262" className="lbl c">Django</text>
      <text x="400" y="280" className="lbl c">Channels</text>
      <text x="400" y="300" className="lbl c dim">+ Redis</text>
      {clients.map((c, n) => {
        const ph = (k * 3 + n * 0.33) % 1;
        const out = n % 2 === 0;
        const px = out ? lerp(200, 350, ph) : lerp(350, 200, ph);
        const py = out ? lerp(c.y, hub.y, ph) : lerp(hub.y, c.y, ph);
        return (
          <g key={c.n}>
            <rect x="90" y={c.y - 22} width="110" height="44" className="box" />
            <text x="145" y={c.y + 5} className="lbl c">{c.n}</text>
            <line x1="200" y1={c.y} x2="350" y2={hub.y} className="wire" />
            {k > 0.05 && <rect x={px - 5} y={py - 5} width="10" height="10" className="pkt" />}
          </g>
        );
      })}
      <text x="275" y="200" className="lbl dim">WebSocket</text>
      <rect x="500" y="110" width="230" height="330" className="box" />
      <text x="515" y="135" className="lbl dim">Cohort chat · Vue 2</text>
      {['Is the essay due Friday?', 'Yes, by 6 pm.', 'Can we review drafts?', 'Sharing mine now.', 'Thanks, everyone!'].slice(0, msgs).map((m, n) => (
        <g key={m}>
          <rect x={n % 2 ? 560 : 515} y={155 + n * 52} width="155" height="38" className={n % 2 ? 'bubble me' : 'bubble'} />
          <text x={(n % 2 ? 560 : 515) + 10} y={179 + n * 52} className="lbl sm">{m}</text>
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
