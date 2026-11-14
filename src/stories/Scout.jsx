import { span, lerp, clamp } from '../motion';

// Inside Scout: sample-data illustration of the agent-driven map.

export const steps = [
  {
    title: 'A contractor asks for a measurement',
    meta: 'Senior Software Engineer · Feb 2025 – now',
    body: 'Scout is SiteRecon’s AI measurement product. You ask in plain words, and an agent does the work on a live map. I build its React, Vite and TypeScript frontend on the @siterecon/ui design system.',
  },
  {
    title: 'The agent talks to the map',
    body: 'Agent tokens stream in over server-sent events. I built the pipeline that reads them and runs 20+ real-time map and UI commands inside a ~400-module deck.gl codebase.',
  },
  {
    title: 'Measurements draw themselves',
    body: 'Each command lands as a layer while the answer is still streaming, with per-layer model confidence from the new scout-core endpoint. I profiled and tuned deck.gl rendering so large polygon layers stay smooth, and rebuilt this chat and map experience for phones.',
    dims: [{ value: '+68%', label: 'mobile-generated measurements after the rebuild' }],
  },
  {
    title: 'Every edit can be undone, exactly',
    body: 'Cut, split and modify tools sit on a Command-Pattern undo/redo engine with per-layer history and point-level granularity, synced to the server automatically.',
  },
  {
    title: 'The measurement becomes a proposal',
    body: 'Measurement, estimate and proposal run as one 8-stage flow over 6 backend services, ending in the Scout v2 order page and Stripe billing, with feature-flagged upsell nudges measured through Mixpanel and Segment event schemas.',
    dims: [{ value: '$30K+', label: 'new subscriptions in the first 3 months' }],
  },
  {
    title: 'It holds up in production',
    body: 'A Playwright suite of 39 specs runs on desktop and mobile CI, Vitest, RTL and MSW cover 70–80% of critical flows, and TypeScript strictness and Zod validation gate every merge. Sentry traces the app and the map library, with PII kept out of payloads.',
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

function Quality({ k }) {
  const runs = Math.round(span(k, 0.05, 0.75) * 78);
  const cov = span(k, 0.6, 0.95);
  return (
    <g>
      <text x="70" y="70" className="lbl dim">Playwright · 39 specs on desktop and mobile CI</text>
      <text x="70" y="98" className="lbl sm dim">desktop</text>
      <text x="70" y="218" className="lbl sm dim">mobile</text>
      {Array.from({ length: 78 }, (_, n) => {
        const row = n < 39 ? 0 : 1;
        const c = n % 39;
        return (
          <rect key={n} x={70 + (c % 13) * 30} y={108 + row * 120 + Math.floor(c / 13) * 30} width="22" height="22"
            className={n < runs ? 'tile on' : 'tile'} />
        );
      })}
      <text x="70" y="400" className="num">{runs}</text>
      <text x="130" y="400" className="lbl">of 78 runs green</text>
      <text x="520" y="98" className="lbl dim">Vitest · RTL · MSW</text>
      <rect x="520" y="110" width="200" height="16" className="track" />
      <rect x="520" y="110" width={200 * 0.75 * cov} height="16" className="bar" />
      <text x="520" y="150" className="lbl">{cov > 0.98 ? '70–80% on critical flows' : 'coverage…'}</text>
      <text x="520" y="210" className="lbl dim">Sentry tracing spans</text>
      {[[0, 180], [20, 120], [40, 60], [70, 90]].map(([x, w], n) => (
        <rect key={n} x={520 + x} y={224 + n * 22} width={w * span(k, 0.3 + n * 0.1, 0.6 + n * 0.1)} height="14" className="span" />
      ))}
      <text x="520" y="350" className="lbl dim">Merge gates</text>
      {['TypeScript strict', 'Zod API validation'].map((g, n) => (
        <text key={g} x="520" y={378 + n * 24} className="lbl" style={{ opacity: span(k, 0.5 + n * 0.15, 0.7 + n * 0.15) }}>{g}</text>
      ))}
    </g>
  );
}

export function Stage({ t }) {
  if (t >= 5) {
    return (
      <svg className="stage-map story" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid meet">
        <g className="scene"><Quality k={clamp(t - 5)} /></g>
      </svg>
    );
  }
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
    <>
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

    </>
  );
}
