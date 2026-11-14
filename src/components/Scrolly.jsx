import { useEffect, useRef, useState } from 'react';
import { Dim } from './Parcel';
import Arrow from './Arrow';
import { clamp } from '../motion';

// Scrollytelling engine. A stage (a pure function of t) stays pinned while the
// steps scroll; t runs 0 → steps.length, so scrolling back rewinds exactly.
// On phones, mobile="caption" keeps the pinned stage with the active step under
// it; mobile="cards" turns each step into a card with its own small stage that
// plays as the card passes through the viewport.

const NARROW = '(max-width: 760px)';
const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 0 → 1 as an element rises from the bottom edge to `span` of the viewport above it.
function entrance(r, span = 0.38) {
  if (still()) return 1;
  const vh = window.innerHeight;
  return clamp((vh - r.top) / (vh * span));
}

function useNarrow() {
  const [narrow, setNarrow] = useState(() => window.matchMedia(NARROW).matches);
  useEffect(() => {
    const mq = window.matchMedia(NARROW);
    const sync = () => setNarrow(mq.matches);
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return narrow;
}

// Calls measure() once per animation frame while scrolling or resizing.
function useScrollMeasure(measure) {
  const latest = useRef(measure);
  useEffect(() => { latest.current = measure; });
  useEffect(() => {
    let frame = 0;
    const run = () => { frame = 0; latest.current(); };
    const on = () => { if (!frame) frame = requestAnimationFrame(run); };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);
}

export function StepBody({ step, full = true, groupLabel = true }) {
  return (
    <>
      {groupLabel && step.groupStart && <p className="sr-only">{step.group.title}, {step.group.meta}.</p>}
      <h3>{step.title}</h3>
      {step.meta && <p className="step-meta">{step.meta}</p>}
      {step.body && <p className="step-body">{step.body}</p>}
      {step.dims && <div className="entry-dims">{step.dims.map(d => <Dim key={d.label} {...d} />)}</div>}
      {full && step.points && <ul className="points">{step.points.map(p => <li key={p}>{p}</li>)}</ul>}
      {full && step.stack && <p className="stack">{step.stack}</p>}
      {full && step.links && (
        <p className="project-links">
          {step.links.map(l => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}<Arrow /></a>)}
        </p>
      )}
      {full && step.private && <p className="project-links private">{step.private}</p>}
    </>
  );
}

function Pinned({ steps, Stage, mobile, note, size }) {
  const ref = useRef(null);
  const [t, setT] = useState(0);
  const n = steps.length;

  useScrollMeasure(() => {
    const el = ref.current;
    if (!el) return;
    const line = window.innerHeight * 0.55;
    let next = 0;
    const calm = still();
    const lis = [...el.querySelectorAll(':scope > .scrolly-steps > li')];
    lis.forEach((li, i) => {
      const r = li.getBoundingClientRect();
      const local = (line - r.top) / r.height;
      if (r.top <= line) next = i + clamp(local);
      // text in as the step approaches the line, out once it is mostly past
      const tin = calm ? 1 : clamp((local + 0.3) / 0.32);
      const tout = calm || i === lis.length - 1 ? 0 : clamp((local - 0.78) / 0.24);
      li.style.setProperty('--in', tin.toFixed(3));
      li.style.setProperty('--out', tout.toFixed(3));
    });
    setT(clamp(next, 0, n));
  });

  const active = Math.min(n - 1, Math.floor(t));
  const calm = still();
  const k = t - active;
  const cap = {
    '--in': calm || active === 0 ? 1 : clamp(k / 0.2),
    '--out': calm || active === n - 1 ? 0 : clamp((k - 0.8) / 0.2),
  };
  let grp = null;
  if (steps[active].group) {
    const key = steps[active].group.key;
    let gs = active;
    while (gs > 0 && steps[gs - 1].group?.key === key) gs -= 1;
    let ge = active;
    while (ge < n - 1 && steps[ge + 1].group?.key === key) ge += 1;
    const g = (t - gs) / (ge - gs + 1);
    grp = {
      '--in': calm || gs === 0 ? 1 : clamp(g / 0.1),
      '--out': calm || ge === n - 1 ? 0 : clamp((g - 0.92) / 0.08),
    };
  }
  return (
    <div className={`scrolly${mobile === 'caption' ? ' with-caption' : ''}${size ? ` ${size}` : ''}`} ref={ref}>
      <div className="scrolly-pin">
        {steps[active].group && (
          <div className="scrolly-group" aria-hidden="true">
            <div className="group-in text-flow" style={grp}>
              <p className="group-title display">{steps[active].group.title}</p>
              <p className="group-meta">{steps[active].group.meta}</p>
            </div>
          </div>
        )}
        <div className="stage" aria-hidden="true" data-reveal="lens">
          <Stage t={t} />
          {note && <p className="stage-note">{note}</p>}
        </div>
        <div className="scrolly-caption" aria-hidden="true">
          <div className="text-flow" style={cap}><StepBody step={steps[active]} full={false} /></div>
        </div>
        <div className="scrolly-progress" aria-hidden="true">
          {steps.map((s, i) => (
            <span key={s.title} className={`${i < active ? 'past' : i === active ? 'now' : ''}${s.groupStart && i > 0 ? ' gs' : ''}`}
              style={i === active ? { '--k': t - active } : undefined} />
          ))}
        </div>
      </div>
      <ol className="scrolly-steps">
        {steps.map((s, i) => (
          <li key={s.title} id={s.id} className={`text-flow${i === active ? ' on' : ''}`}>
            <StepBody step={s} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function CardGroup({ group }) {
  const ref = useRef(null);
  const [e, setE] = useState(1);
  useScrollMeasure(() => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setE(entrance(r, 0.3));
  });
  return (
    <li ref={ref} className="card-group" style={{ '--e': e }}>
      <h3 className="display">{group.title}</h3>
      <p className="group-meta">{group.meta}</p>
    </li>
  );
}

function Card({ step, i, Stage, note }) {
  const ref = useRef(null);
  const [k, setK] = useState(0);
  const [e, setE] = useState(1);
  const [o, setO] = useState(0);
  const body = useRef(null);
  useScrollMeasure(() => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const vh = window.innerHeight;
    setK(clamp((vh * 0.9 - r.top) / (vh * 0.55)));
    setE(entrance(r));
    const b = body.current?.getBoundingClientRect();
    setO(b && !still() ? clamp((vh * 0.4 - b.bottom) / (vh * 0.3)) : 0);
  });
  return (
    <li ref={ref} id={step.id} className="scrolly-card" style={{ '--e': e, '--k': k }}>
      <div className="stage" aria-hidden="true">
        <Stage t={i + k * 0.999} />
      </div>
      {note && <p className="card-note">{note}</p>}
      <div className="card-body text-flow" ref={body} style={{ '--in': e, '--out': o }}>
        <StepBody step={step} groupLabel={false} />
      </div>
    </li>
  );
}

export default function Scrolly({ steps: raw, Stage, mobile = 'caption', note, size }) {
  const narrow = useNarrow();
  const steps = raw.map((s, i) => ({ ...s, groupStart: !!s.group && s.group.key !== raw[i - 1]?.group?.key }));
  if (narrow && mobile === 'cards') {
    return (
      <ol className="scrolly-cards">
        {steps.flatMap((s, i) => [
          s.groupStart && <CardGroup key={`g-${s.group.key}`} group={s.group} />,
          <Card key={s.title} step={s} i={i} Stage={Stage} note={i === 0 ? note : null} />,
        ].filter(Boolean))}
      </ol>
    );
  }
  return <Pinned steps={steps} Stage={Stage} mobile={mobile} note={note} size={size} />;
}
