import { span, lerp, clamp } from '../motion';
import { Tick, Cross, Lock } from './marks';

// Three short chapters, one per project. Stages are sample-data drawings; the
// step text carries the real facts from each repository.

const PRIVATE = 'Private repository. Happy to walk through the code on a call.';

function scene(t, n) {
  const i = Math.min(n - 1, Math.floor(t));
  return [i, clamp(t - i)];
}

function Frame({ i, children }) {
  return (
    <svg className="stage-map story" viewBox="0 0 800 480" preserveAspectRatio="xMidYMid meet">
      <g key={i} className="scene">{children}</g>
    </svg>
  );
}

/* ── Fixproof ─────────────────────────────────────────────── */

const SOURCES = ['Sentry', 'Datadog', 'CloudWatch', 'Azure Monitor', 'Grafana', 'Alertmanager', 'New Relic', 'Splunk', 'GCP'];

export const fixproof = {
  steps: [
    {
      title: 'Nine alert platforms, one incident',
      body: 'Alerts arrive from Sentry, Datadog, AWS CloudWatch, Azure Monitor, Grafana, Prometheus Alertmanager, New Relic, Splunk and GCP. Each one is normalised into a single incident with its evidence attached.',
      dims: [{ value: '9', label: 'alert platforms ingested' }],
    },
    {
      title: 'A diagnosis with an honest confidence score',
      body: 'An LLM agent diagnoses the cause and proposes a fix from a strict allowlist. Its confidence score picks the tier: diagnose only, ask a person to approve, or, opt-in and low blast radius only, run the fix itself.',
      points: ['Web and mobile choose their confirm screens from the same core helpers, including hold-to-confirm for risky approvals.'],
    },
    {
      title: 'A fix has to prove itself',
      body: 'A fix PR only counts if its test fails on the old code and passes on the new. Then a staged canary rolls it out and reverts automatically if the metrics turn.',
      dims: [{ value: '24', label: 'architecture decision records' }],
      points: ['One pnpm monorepo: API, queue worker, Next.js dashboard and Expo app over a shared typed client, with 60+ test files and a deliberately breakable "Bug Zoo" API of 16 failure scenarios.'],
      stack: 'TypeScript · Next.js · Expo · Fastify · Postgres · Redis · LLM agents',
      private: PRIVATE,
    },
  ],
  Stage({ t }) {
    const [i, k] = scene(t, 3);
    if (i === 0) {
      const lit = span(k, 0.05, 0.7) * SOURCES.length;
      const card = span(k, 0.55, 0.95);
      return (
        <Frame i={i}>
          {SOURCES.map((s, n) => {
            const y = 70 + n * 42;
            const on = lit > n;
            const ph = (k * 2.5 + n * 0.11) % 1;
            return (
              <g key={s}>
                <rect x="60" y={y - 16} width="150" height="30" className={on ? 'chip on' : 'chip'} />
                <text x="72" y={y + 4} className="lbl sm">{s}</text>
                <line x1="210" y1={y} x2="470" y2="240" className="wire" style={{ opacity: on ? 1 : 0.25 }} />
                {on && <rect x={lerp(210, 470, ph) - 4} y={lerp(y, 240, ph) - 4} width="8" height="8" className="pkt" />}
              </g>
            );
          })}
          <rect x="470" y="160" width="270" height="160" className="box on" />
          <text x="488" y="190" className="lbl dim">Incident · sample</text>
          <text x="488" y="222" className="lbl" style={{ opacity: card }}>checkout API returning 5xx</text>
          <text x="488" y="250" className="lbl sm dim" style={{ opacity: card }}>sources  Sentry, Datadog, CloudWatch</text>
          <text x="488" y="272" className="lbl sm dim" style={{ opacity: card }}>evidence  3 traces, 1 deploy, error rate</text>
          <text x="488" y="300" className="num sm" style={{ opacity: card }}>{Math.round(card * 14)} alerts → 1</text>
        </Frame>
      );
    }
    if (i === 1) {
      const c = span(k, 0.1, 0.7) * 0.82;
      const tier = c < 0.5 ? 0 : c < 0.9 ? 1 : 2;
      const tiers = ['Diagnose only', 'Ask a person to approve', 'Auto-execute · opt-in, low blast radius'];
      return (
        <Frame i={i}>
          <rect x="60" y="70" width="380" height="190" className="box" />
          <text x="78" y="100" className="lbl dim">Agent diagnosis · sample</text>
          <text x="78" y="135" className="lbl" style={{ opacity: span(k, 0, 0.3) }}>Likely cause: deploy a1f3 raised p95 latency</text>
          <text x="78" y="165" className="lbl" style={{ opacity: span(k, 0.15, 0.45) }}>Proposed fix: roll back deploy a1f3</text>
          <text x="78" y="195" className="lbl sm dim" style={{ opacity: span(k, 0.3, 0.6) }}>From the allowlist · blast radius: one service</text>
          <text x="60" y="330" className="lbl dim">Confidence</text>
          <rect x="60" y="345" width="380" height="18" className="track" />
          <rect x="60" y="345" width={380 * c} height="18" className="bar" />
          <line x1={60 + 380 * 0.5} y1="338" x2={60 + 380 * 0.5} y2="370" className="budget" />
          <line x1={60 + 380 * 0.9} y1="338" x2={60 + 380 * 0.9} y2="370" className="budget" />
          <text x="60" y="415" className="num">{c.toFixed(2)}</text>
          {tiers.map((tt, n) => (
            <g key={tt}>
              <rect x="490" y={110 + n * 90} width="250" height="64" className={n === tier && k > 0.15 ? 'box on' : 'box'} />
              <text x="506" y={147 + n * 90} className={n === tier && k > 0.15 ? 'lbl sig' : 'lbl dim'}>{tt}</text>
            </g>
          ))}
        </Frame>
      );
    }
    const old = span(k, 0.0, 0.25);
    const fix = span(k, 0.2, 0.45);
    const canary = span(k, 0.5, 0.95);
    const stages = [5, 25, 50, 100];
    return (
      <Frame i={i}>
        <text x="60" y="80" className="lbl dim">The fix’s own test</text>
        <rect x="60" y="95" width="320" height="90" className={old > 0.98 ? 'box fail' : 'box'} />
        <text x="78" y="128" className="lbl">on the old code</text>
        <rect x="78" y="145" width={220 * old} height="10" className="bar" />
        {old > 0.98 && <><Cross x={325} y={127} /><text x="300" y="170" className="lbl sm sig">fails</text></>}
        <rect x="420" y="95" width="320" height="90" className={fix > 0.98 ? 'box on' : 'box'} />
        <text x="438" y="128" className="lbl">on the fix</text>
        <rect x="438" y="145" width={220 * fix} height="10" className="bar ink" />
        {fix > 0.98 && <><Tick x={683} y={125} /><text x="655" y="170" className="lbl sm">passes</text></>}
        <text x="60" y="260" className="lbl dim">Staged canary</text>
        {stages.map((p, n) => {
          const on = clamp(canary * 4 - n);
          return (
            <g key={p}>
              <rect x={60 + n * 172} y="275" width="160" height="40" className="track" />
              <rect x={60 + n * 172} y="275" width={160 * on} height="40" className="bar" />
              <text x={70 + n * 172} y="301" className="lbl c-left">{p}% of traffic</text>
            </g>
          );
        })}
        <line x1="60" y1="370" x2="740" y2="370" className="budget" />
        <text x="60" y="395" className="lbl sm dim">auto-revert if the error rate crosses this line</text>
        <polyline points={Array.from({ length: 30 }, (_, n) => `${60 + n * 23.4},${400 - 60 - Math.sin(n * 1.3) * 6 - 4}`).join(' ')}
          className="trace" style={{ strokeDasharray: 1, strokeDashoffset: 1 - canary }} pathLength="1" />
      </Frame>
    );
  },
};

/* ── Tayyari ──────────────────────────────────────────────── */

const LANGS = ['English', 'हिन्दी', 'தமிழ்', 'తెలుగు', 'मराठी', 'বাংলা', 'ಕನ್ನಡ'];
const WORK = ['Given  u = 0,  a = 2 m/s²,  t = 5 s', 'v = u + at', 'v = 0 + 2 × 5', 'v = 10 m/s'];
const SAY = ['The', 'car', 'ends', 'up', 'at', 'ten', 'metres', 'per', 'second.'];

export const tayyari = {
  steps: [
    {
      title: 'Ask in your own language',
      body: 'Students ask a doubt by voice, text or a photo of the question, in English, Hindi, Tamil, Telugu, Marathi, Bengali or Kannada. With Sarvam AI, Hinglish code-mixed speech works too.',
      dims: [{ value: '7', label: 'Indian languages, by voice, text or photo' }],
    },
    {
      title: 'Worked out, step by step',
      body: 'Vigya writes the solution step by step in KaTeX. Hard maths and physics route to a stronger reasoning model, and BM25 retrieval grounds answers in an original syllabus and practice bank.',
      dims: [{ value: '185', label: 'original practice questions' }],
    },
    {
      title: 'Then she says it out loud',
      body: 'A short spoken summary plays while her portrait avatar’s mouth follows the audio level. With no API keys it all runs in the browser: WebLLM (Qwen3) on WebGPU plus the browser’s own speech.',
      stack: 'Next.js · React 19 · WebLLM · WebGPU · Web Speech · KaTeX',
      private: PRIVATE,
    },
  ],
  Stage({ t }) {
    const [i, k] = scene(t, 3);
    if (i === 0) {
      const on = Math.min(LANGS.length - 1, Math.floor(span(k, 0, 0.7) * LANGS.length));
      const said = 'Ek car 2 m/s² se 5 second accelerate karti hai, final speed?';
      const typed = Math.round(span(k, 0.35, 0.95) * said.length);
      return (
        <Frame i={i}>
          {LANGS.map((l, n) => (
            <g key={l}>
              <rect x={60 + n * 98} y="70" width="88" height="34" className={n === on ? 'chip on' : 'chip'} />
              <text x={104 + n * 98} y="92" className={n === on ? 'lbl c sig' : 'lbl c'}>{l}</text>
            </g>
          ))}
          <text x="60" y="160" className="lbl dim">Voice</text>
          {Array.from({ length: 48 }, (_, n) => {
            const h = 6 + Math.abs(Math.sin(n * 0.7 + k * 30)) * 46 * span(k, 0.1, 0.4);
            return <rect key={n} x={60 + n * 8} y={225 - h / 2} width="4" height={h} className="wave" />;
          })}
          <text x="490" y="160" className="lbl dim">or a photo of the question</text>
          <rect x="490" y="175" width="250" height="110" className="box" />
          {[0, 1, 2, 3].map(n => <rect key={n} x="508" y={195 + n * 22} width={190 - n * 30} height="8" className="track" />)}
          <text x="60" y="340" className="lbl dim">Heard (Hinglish, sample)</text>
          <rect x="60" y="355" width="680" height="56" className="box" />
          <text x="78" y="389" className="lbl">{said.slice(0, typed)}</text>
        </Frame>
      );
    }
    if (i === 1) {
      const shown = span(k, 0.05, 0.85) * WORK.length;
      return (
        <Frame i={i}>
          <text x="60" y="80" className="lbl dim">Vigya’s working · sample</text>
          <rect x="60" y="95" width="460" height="330" className="box" />
          {WORK.map((w, n) => {
            const o = clamp(shown - n);
            return (
              <g key={w} style={{ opacity: o }} transform={`translate(${(1 - o) * 12} 0)`}>
                <text x="84" y={150 + n * 72} className="lbl sm dim">{n === 0 ? 'Given' : `Step ${n}`}</text>
                <text x="84" y={178 + n * 72} className={n === WORK.length - 1 ? 'math sig' : 'math'}>{w}</text>
              </g>
            );
          })}
          <rect x="560" y="95" width="180" height="100" className="box on" style={{ opacity: span(k, 0.1, 0.4) }} />
          <text x="575" y="125" className="lbl sm dim" style={{ opacity: span(k, 0.1, 0.4) }}>Routed to</text>
          <text x="575" y="150" className="lbl" style={{ opacity: span(k, 0.1, 0.4) }}>reasoning model</text>
          <text x="575" y="172" className="lbl sm dim" style={{ opacity: span(k, 0.1, 0.4) }}>physics · hard</text>
          <rect x="560" y="225" width="180" height="100" className="box" style={{ opacity: span(k, 0.4, 0.7) }} />
          <text x="575" y="255" className="lbl sm dim" style={{ opacity: span(k, 0.4, 0.7) }}>Grounded in</text>
          <text x="575" y="280" className="lbl" style={{ opacity: span(k, 0.4, 0.7) }}>syllabus · BM25</text>
        </Frame>
      );
    }
    const words = Math.round(span(k, 0.1, 0.9) * SAY.length);
    const level = words < SAY.length ? Math.abs(Math.sin(k * 60)) : 0;
    return (
      <Frame i={i}>
        <rect x="80" y="70" width="240" height="300" className="box on" />
        <circle cx="200" cy="190" r="80" className="face" />
        <line x1="168" y1="170" x2="182" y2="170" className="feature" />
        <line x1="218" y1="170" x2="232" y2="170" className="feature" />
        <ellipse cx="200" cy="225" rx="18" ry={2 + level * 12} className="mouth" />
        <text x="80" y="398" className="lbl sm dim">Portrait avatar · mouth follows the audio level</text>
        {Array.from({ length: 20 }, (_, n) => (
          <rect key={n} x={360 + n * 18} y={150 - (6 + level * Math.abs(Math.sin(n + k * 40)) * 60)} width="10"
            height={6 + level * Math.abs(Math.sin(n + k * 40)) * 60} className="wave" />
        ))}
        <text x="360" y="190" className="lbl dim">Spoken summary</text>
        <text x="360" y="225" className="lbl">
          {SAY.map((w, n) => <tspan key={n} className={n < words ? '' : 'dim'}>{w} </tspan>)}
        </text>
        <rect x="360" y="270" width="380" height="44" className="chip on" />
        <text x="376" y="297" className="lbl">No keys: WebLLM on WebGPU, in the browser</text>
        <rect x="360" y="324" width="380" height="44" className="chip" />
        <text x="376" y="351" className="lbl">With a key: Sarvam voices and Hinglish STT</text>
      </Frame>
    );
  },
};

/* ── Learn This ───────────────────────────────────────────── */

const FIELDS = [['Topic', 'Graph algorithms'], ['Level', 'Intermediate'], ['Goal', 'Pass coding interviews'], ['Time', '6 hours']];
const NODES = [
  { id: 'basics', l: 'Graph basics', x: 90, y: 230 },
  { id: 'bfs', l: 'BFS', x: 270, y: 140 },
  { id: 'dfs', l: 'DFS', x: 270, y: 320 },
  { id: 'paths', l: 'Shortest paths', x: 450, y: 140 },
  { id: 'mst', l: 'Spanning trees', x: 450, y: 320 },
  { id: 'prac', l: 'Practice set', x: 630, y: 230 },
];
const EDGES = [['basics', 'bfs'], ['basics', 'dfs'], ['bfs', 'paths'], ['dfs', 'mst'], ['paths', 'prac'], ['mst', 'prac']];
const at = id => NODES.find(n => n.id === id);

function Graph({ draw, open = [], unlocked = [], focus }) {
  return (
    <g>
      {EDGES.map(([a, b], n) => {
        const A = at(a); const B = at(b);
        return <line key={n} x1={A.x + 60} y1={A.y} x2={B.x - 60} y2={B.y} className="wire" pathLength="1"
          style={{ strokeDasharray: 1, strokeDashoffset: 1 - clamp(draw * 6 - n) }} />;
      })}
      {NODES.map((nd, n) => {
        const vis = clamp(draw * 6 - n + 1);
        const locked = !open.includes(nd.id);
        return (
          <g key={nd.id} style={{ opacity: vis }}>
            <rect x={nd.x - 60} y={nd.y - 22} width="120" height="44"
              className={nd.id === focus ? 'box on' : locked ? 'box own' : 'box'} />
            <text x={nd.x - 46} y={nd.y + 5} className="lbl sm">{nd.l}</text>
            {(locked || unlocked.includes(nd.id)) && n > 0 && (
              <Lock x={nd.x + 38} y={nd.y - 10} open={unlocked.includes(nd.id) ? 1 : 0} />
            )}
          </g>
        );
      })}
    </g>
  );
}

export const learnThis = {
  steps: [
    {
      title: 'Tell it what you want to learn',
      body: 'A topic, your level, a goal and a time budget. An LLM planner returns 4 to 8 modules as JSON, with concepts, prerequisites and time estimates, and the course is stored for you.',
      dims: [{ value: '4–8', label: 'modules planned per course' }],
    },
    {
      title: 'Lessons stream in as you open them',
      body: 'Each lesson is generated the first time you open its module, streamed to the page as Markdown, then cached in Supabase Postgres. Every module also has a tutor chat with saved conversations.',
    },
    {
      title: 'Pass the quiz, unlock what comes next',
      body: 'Quiz scores are saved, and passing one unlocks the modules that depend on it. Courses export to Markdown, and generation is rate-limited per user with Upstash Redis.',
      stack: 'Next.js 16 · React 19 · NextAuth · Supabase · Upstash Redis',
      links: [
        { label: 'Live demo', href: 'https://learn-this.vercel.app' },
        { label: 'Source', href: 'https://github.com/nikhilsiem/learn-this' },
      ],
    },
  ],
  Stage({ t }) {
    const [i, k] = scene(t, 3);
    if (i === 0) {
      const f = span(k, 0, 0.6) * FIELDS.length;
      const plan = span(k, 0.65, 1);
      return (
        <Frame i={i}>
          {FIELDS.map(([l, v], n) => {
            const typed = Math.round(clamp(f - n) * v.length);
            return (
              <g key={l}>
                <text x="60" y={95 + n * 74} className="lbl sm dim">{l}</text>
                <rect x="60" y={105 + n * 74} width="300" height="40" className={typed === v.length ? 'box' : 'box faint'} />
                <text x="74" y={131 + n * 74} className="lbl">{v.slice(0, typed)}</text>
              </g>
            );
          })}
          <rect x="60" y="410" width="140" height="40" className={plan > 0 ? 'btn-shape on' : 'btn-shape'} />
          <text x="78" y="436" className="lbl ink-on">Plan course</text>
          <g transform="translate(150 0) scale(0.78) translate(240 60)" style={{ opacity: plan }}>
            <Graph draw={plan} open={['basics', 'bfs']} />
          </g>
        </Frame>
      );
    }
    if (i === 1) {
      const lines = Math.round(span(k, 0.15, 0.9) * 7);
      const md = ['# Breadth-first search', 'Visit a node, then every neighbour', 'before going deeper.', '', '```queue = [start]```', '- O(V + E) time', '- shortest path in unweighted graphs'];
      return (
        <Frame i={i}>
          <g transform="translate(0 -20) scale(0.62) translate(10 60)">
            <Graph draw={1} open={['basics', 'bfs']} focus="bfs" />
          </g>
          <rect x="400" y="60" width="340" height="360" className="box on" />
          <text x="416" y="88" className="lbl sm dim">BFS · lesson streaming</text>
          {md.slice(0, lines).map((l, n) => (
            <text key={n} x="416" y={125 + n * 34} className={n === 0 ? 'lbl strong' : 'lbl'}>{l.replaceAll('```', '')}</text>
          ))}
          {lines < 7 && <rect x="416" y={110 + lines * 34} width="8" height="18" className="caret-r" />}
          <text x="60" y="380" className="lbl sm dim">Cached in Postgres after the first open</text>
          <text x="60" y="404" className="lbl sm dim">Tutor chat saved per module</text>
        </Frame>
      );
    }
    const score = Math.round(span(k, 0.05, 0.4) * 4);
    const unlock = span(k, 0.45, 0.75);
    const exp = span(k, 0.8, 1);
    return (
      <Frame i={i}>
        <g transform="translate(0 20) scale(0.88) translate(0 0)">
          <Graph draw={1} open={unlock > 0.5 ? ['basics', 'bfs', 'paths'] : ['basics', 'bfs']} unlocked={unlock > 0.5 ? ['paths'] : []} focus="bfs" />
        </g>
        <rect x="60" y="370" width="280" height="80" className="box on" />
        <text x="76" y="398" className="lbl sm dim">BFS quiz</text>
        <text x="76" y="432" className="num sm">{score} / 5</text>
        {score >= 4 && <><Tick x={190} y={420} /><text x="212" y="432" className="lbl">passed</text></>}
        <rect x="560" y="400" width="180" height="40" className="btn-shape on" style={{ opacity: exp }} />
        <text x="578" y="426" className="lbl ink-on" style={{ opacity: exp }}>Export to Markdown</text>
      </Frame>
    );
  },
};
