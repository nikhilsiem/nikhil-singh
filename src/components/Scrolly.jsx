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

export function StepBody({ step, full = true }) {
  return (
    <>
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
    [...el.querySelectorAll(':scope > .scrolly-steps > li')].forEach((li, i) => {
      const r = li.getBoundingClientRect();
      if (r.top <= line) next = i + clamp((line - r.top) / r.height);
    });
    setT(clamp(next, 0, n));
  });

  const active = Math.min(n - 1, Math.floor(t));
  return (
    <div className={`scrolly${mobile === 'caption' ? ' with-caption' : ''}${size ? ` ${size}` : ''}`} ref={ref}>
      <div className="scrolly-pin">
        <div className="stage" aria-hidden="true">
          <Stage t={t} />
          {note && <p className="stage-note">{note}</p>}
        </div>
        <div className="scrolly-caption" aria-hidden="true"><StepBody step={steps[active]} full={false} /></div>
        <div className="scrolly-progress" aria-hidden="true">
          {steps.map((s, i) => (
            <span key={s.title} className={i < active ? 'past' : i === active ? 'now' : ''}
              style={i === active ? { '--k': t - active } : undefined} />
          ))}
        </div>
      </div>
      <ol className="scrolly-steps">
        {steps.map((s, i) => (
          <li key={s.title} id={s.id} className={i === active ? 'on' : ''}>
            <StepBody step={s} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Card({ step, i, Stage, note }) {
  const ref = useRef(null);
  const [k, setK] = useState(0);
  useScrollMeasure(() => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const vh = window.innerHeight;
    setK(clamp((vh * 0.9 - r.top) / (vh * 0.55)));
  });
  return (
    <li ref={ref} id={step.id} className="scrolly-card">
      <div className="stage" aria-hidden="true">
        <Stage t={i + k * 0.999} />
      </div>
      {note && <p className="card-note">{note}</p>}
      <div className="card-body"><StepBody step={step} /></div>
    </li>
  );
}

export default function Scrolly({ steps, Stage, mobile = 'caption', note, size }) {
  const narrow = useNarrow();
  if (narrow && mobile === 'cards') {
    return (
      <ol className="scrolly-cards">
        {steps.map((s, i) => <Card key={s.title} step={s} i={i} Stage={Stage} note={i === 0 ? note : null} />)}
      </ol>
    );
  }
  return <Pinned steps={steps} Stage={Stage} mobile={mobile} note={note} size={size} />;
}
