import { useEffect, useRef, useState } from 'react';
import { Dim } from './Parcel';

// "Inside Scout": a pinned drawing driven by scroll. Each text step advances the
// stage; t runs 0 → STEPS across the chapter, and every element is a pure
// function of t, so scrolling backwards rewinds the story exactly.

const STEPS = 5;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = x => 1 - Math.pow(1 - clamp(x), 3);
const span = (t, a, b) => ease((t - a) / (b - a));
const lerp = (a, b, k) => a + (b - a) * k;

const steps = [
  {
    title: 'A contractor asks for a measurement',
    body: 'Scout is SiteRecon’s AI measurement product. You ask in plain words, and an agent does the work on a live map.',
  },
  {
    title: 'The agent talks to the map',
    body: 'Agent tokens stream in over server-sent events. I built the pipeline that reads them and runs 20+ real-time map and UI commands inside a ~400-module React and deck.gl codebase.',
  },
  {
    title: 'Measurements draw themselves',
    body: 'Each command lands as a layer on the map while the answer is still streaming, so the user watches the measurement happen instead of waiting for it.',
  },
  {
    title: 'Every edit can be undone, exactly',
    body: 'Cut, split and modify tools sit on a Command-Pattern undo/redo engine with per-layer history and point-level granularity, synced to the server automatically.',
  },
  {
    title: 'The measurement becomes a proposal',
    body: 'Measurement, estimate and proposal run as one 8-stage flow over 6 backend services, with the Scout v2 order page and Stripe billing at the end.',
    dims: [
      { value: '$30K+', label: 'new subscriptions in 3 months' },
      { value: '+68%', label: 'mobile-generated measurements' },
    ],
  },
];

const PROMPT = 'Measure the front lawn and the driveway.';
const REPLY = ['Finding', ' the', ' lot', '…', ' drawing', ' the', ' lawn', ' and', ' driveway', '…', ' 2', ' areas', ' measured.'];
const COMMANDS = ['map.flyTo(lot)', 'layer.draw("lawn")', 'layer.draw("driveway")', 'measure.area(2 layers)'];

const LOT = '120,90 680,70 700,470 140,490';
const HOUSE = '300,150 520,140 530,300 310,310';
const DRIVE = '540,300 610,296 620,482 552,486';
const LAWN = '160,336 310,312 530,302 540,484 166,488';
const LAWN_A = '160,336 310,312 352,309 330,487 166,488';
const LAWN_B = '352,309 530,302 540,484 330,487';

function Path({ points, k, className }) {
  return (
    <polygon
      points={points}
      pathLength="1"
      className={className}
      style={{ strokeDasharray: 1, strokeDashoffset: 1 - k }}
    />
  );
}

function Stage({ t }) {
  const lot = span(t, 0.1, 0.9);
  const typed = Math.round(span(t, 0.2, 0.95) * PROMPT.length);
  const tokens = Math.round(span(t, 1.0, 1.9) * REPLY.length);
  const cmds = Math.round(span(t, 1.15, 2.2) * COMMANDS.length);
  const zoom = span(t, 1.0, 1.9);
  const lawn = span(t, 2.0, 2.6);
  const drive = span(t, 2.25, 2.85);
  const area = span(t, 2.4, 2.95);
  const cut = span(t, 3.05, 3.4);
  const split = t >= 3.4 && t < 3.75;
  const undone = t >= 3.75;
  const quote = span(t, 4.05, 4.6);

  const s = lerp(0.82, 1.18, zoom);
  const cx = lerp(410, 360, zoom);
  const cy = lerp(280, 330, zoom);

  const panel = t < 3 ? 'log' : t < 4 ? 'undo' : 'quote';
  const undo = [
    { label: 'draw lawn', on: true },
    { label: 'draw driveway', on: true },
    { label: 'split lawn', on: t >= 3.4 && !undone, gone: undone },
  ];

  return (
    <div className="stage" aria-hidden="true">
      <svg className="stage-map" viewBox="0 0 800 560" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="9" />
          </pattern>
        </defs>
        <g transform={`translate(400 280) scale(${s}) translate(${-cx} ${-cy})`}>
          <rect className="street" x="40" y="500" width="760" height="70" />
          <Path points={LOT} k={lot} className="lot" />
          <polygon points={HOUSE} className="house" style={{ opacity: lot }} />
          <g className="trees" style={{ opacity: lot }}>
            <circle cx="215" cy="160" r="26" /><circle cx="250" cy="215" r="18" /><circle cx="630" cy="160" r="22" />
          </g>

          {!split && (
            <g style={{ opacity: lawn > 0 ? 1 : 0 }}>
              <polygon points={LAWN} className="fill-lawn" style={{ opacity: lawn * 0.9 }} />
              <Path points={LAWN} k={lawn} className="m-line" />
            </g>
          )}
          {split && (
            <g>
              <polygon points={LAWN_A} className="fill-lawn" />
              <polygon points={LAWN_B} className="fill-lawn alt" />
              <polygon points={LAWN_A} className="m-line" />
              <polygon points={LAWN_B} className="m-line" />
            </g>
          )}
          <polygon points={DRIVE} className="fill-drive" style={{ opacity: drive * 0.9 }} />
          <Path points={DRIVE} k={drive} className="m-line dashed" />
          {t >= 3 && !undone && (
            <line className="cut" x1="356" y1="290" x2="326" y2="505" pathLength="1"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 - cut }} />
          )}

          <g className="area-labels" style={{ opacity: area }}>
            <text x="300" y="410">LAWN <tspan className="v">{Math.round(4820 * area).toLocaleString('en-US')} sq ft</tspan></text>
            <text x="582" y="392" textAnchor="middle" transform="rotate(-90 582 392)">DRIVE <tspan className="v">{Math.round(1140 * area).toLocaleString('en-US')} sq ft</tspan></text>
          </g>
        </g>
      </svg>

      <div className="chat">
        <p className="chat-user">{PROMPT.slice(0, typed)}{typed > 0 && typed < PROMPT.length && <i className="caret" />}</p>
        {tokens > 0 && (
          <p className="chat-agent">
            {REPLY.slice(0, tokens).map((tok, i) => <span key={i} className="tok">{tok}</span>)}
            {tokens < REPLY.length && <i className="caret" />}
          </p>
        )}
        {tokens > 0 && <p className="chat-meta">text/event-stream · {tokens} tokens</p>}
      </div>

      <div className="stage-panel">
        {panel === 'log' && (
          <>
            <p className="panel-name">Command log</p>
            <ol className="cmds">
              {COMMANDS.map((c, i) => (
                <li key={c} className={i < cmds ? 'done' : ''}>{c}</li>
              ))}
            </ol>
          </>
        )}
        {panel === 'undo' && (
          <>
            <p className="panel-name">Undo stack · lawn layer</p>
            <ol className="cmds">
              {undo.map(u => (
                <li key={u.label} className={u.gone ? 'gone' : u.on ? 'done' : ''}>{u.label}</li>
              ))}
            </ol>
            <p className="panel-note">{undone ? 'Undo: split reverted, points restored' : t >= 3.4 ? 'Split into 2 parts' : 'Cutting…'}</p>
          </>
        )}
        {panel === 'quote' && (
          <div style={{ opacity: quote, transform: `translateY(${(1 - quote) * 12}px)` }}>
            <p className="panel-name">Estimate</p>
            <table className="quote">
              <tbody>
                <tr><td>Lawn aeration</td><td>4,820 sq ft</td><td>$145</td></tr>
                <tr><td>Driveway seal coat</td><td>1,140 sq ft</td><td>$285</td></tr>
                <tr className="total"><td>Total</td><td /><td>$430</td></tr>
              </tbody>
            </table>
            <p className="panel-note">Send proposal →</p>
          </div>
        )}
      </div>

      <p className="stage-note">Illustration with sample data, not the production interface</p>
    </div>
  );
}

export default function Scrolly() {
  const ref = useRef(null);
  const [t, setT] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.55;
      const items = [...ref.current.querySelectorAll('.scrolly-steps > li')];
      let next = 0;
      items.forEach((li, i) => {
        const r = li.getBoundingClientRect();
        if (r.top <= line) next = i + clamp((line - r.top) / r.height);
      });
      setT(clamp(next, 0, STEPS));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const active = Math.min(STEPS - 1, Math.floor(t));

  return (
    <div className="scrolly" ref={ref} style={{ '--steps': STEPS }}>
      <div className="scrolly-pin">
        <Stage t={t} />
        <div className="scrolly-caption" aria-hidden="true">
          <h3>{steps[active].title}</h3>
          <p>{steps[active].body}</p>
          {steps[active].dims && <div className="entry-dims">{steps[active].dims.map(d => <Dim key={d.label} {...d} />)}</div>}
        </div>
        <div className="scrolly-progress" aria-hidden="true">
          {steps.map((s, i) => (
            <span key={s.title} className={i < active ? 'past' : i === active ? 'now' : ''}
              style={i === active ? { '--k': t - active } : undefined} />
          ))}
        </div>
      </div>
      <ol className="scrolly-steps">
        {steps.map((s, i) => (
          <li key={s.title} className={i === active ? 'on' : ''}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            {s.dims && <div className="entry-dims">{s.dims.map(d => <Dim key={d.label} {...d} />)}</div>}
          </li>
        ))}
      </ol>
    </div>
  );
}
