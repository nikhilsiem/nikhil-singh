import { useEffect, useMemo, useState } from 'react';
import { person, work, projects, builds, toolkit, notes } from './content';
import Sheet from './components/Sheet';
import Parcel from './components/Parcel';
import Timeline, { Readout } from './components/Timeline';
import { toItems } from './timeline';
import useScrollPlot from './useScrollPlot';
import useReveal from './useReveal';
import Arrow from './components/Arrow';
import Scrolly from './components/Scrolly';
import * as scoutStory from './stories/Scout';
import * as workStory from './stories/Work';
import { fixproof, tayyari, learnThis } from './stories/Projects';

const sections = [
  { id: 'siterecon', label: 'Now' },
  { id: 'before', label: 'Before' },
  { id: 'projects', label: 'On my own' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
];

function Nav() {
  const [current, setCurrent] = useState(null);
  useEffect(() => {
    const els = sections.map(s => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <nav className="nav" aria-label="Sections">
      {sections.map(s => (
        <a key={s.id} href={`#${s.id}`} aria-current={current === s.id ? 'true' : undefined}>{s.label}</a>
      ))}
    </nav>
  );
}

function CopyEmail() {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setDone(true);
      setTimeout(() => setDone(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };
  return (
    <button type="button" className="copy" data-done={done} onClick={copy} aria-live="polite">
      {done ? 'Copied to clipboard' : 'Copy address'}
    </button>
  );
}

function Hero() {
  const items = useMemo(() => toItems(work, projects, builds), []);
  const [selected, setSelected] = useState(items[0].id);
  const item = items.find(i => i.id === selected);
  return (
    <header className="hero" id="top">
      <div className="hero-top">
        <div className="hero-id">
          <h1 className="display">Nikhil<br />Singh</h1>
          <p className="hero-line">{person.line}</p>
          <div className="hero-cta">
            <a className="btn" href={`mailto:${person.email}`}>Email me</a>
            <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={person.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <Readout item={item} />
      </div>
      <Timeline items={items} selected={selected} onSelect={setSelected} />
    </header>
  );
}

function Now() {
  return (
    <section className="section" id="siterecon" aria-labelledby="now-h">
      <div className="section-head">
        <h2 className="display" id="now-h">Now</h2>
        <p>At SiteRecon since February 2025, I build the frontend of Scout, an AI measurement product. Scroll to run it.</p>
      </div>
      <Scrolly steps={scoutStory.steps} Stage={scoutStory.Stage}
        note="Illustration with sample data, not the production interface" />
    </section>
  );
}

function Before() {
  return (
    <section className="section" id="before" aria-labelledby="before-h">
      <div className="section-head">
        <h2 className="display" id="before-h">Before</h2>
        <p>The four years before SiteRecon, rewound: payments and design systems at Mastercard, and my first frontend job in EdTech.</p>
      </div>
      <Scrolly steps={workStory.steps} Stage={workStory.Stage} mobile="cards" size="short"
        note="Illustrations with sample data" />
    </section>
  );
}

const stories = { fixproof, tayyari, 'learn-this': learnThis };

function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-h">
      <div className="section-head">
        <h2 className="display" id="projects-h">On my own</h2>
        <p>Outside work I keep shipping: nine public builds since 2020 on the timeline above. These three are the newest, each built end to end with agentic workflows (Claude Code) under tests and written decisions.</p>
      </div>
      {projects.map((p, i) => (
        <article key={p.id} id={p.id} className="project-chapter" aria-labelledby={`${p.id}-h`}>
          <Parcel kind="own" i={i} className="project-head" data-reveal="plot">
            <h3 className="display" id={`${p.id}-h`}>{p.name}{p.aka && <small>also called {p.aka}</small>}</h3>
            <p className="tag">{p.tagline}</p>
          </Parcel>
          <Scrolly steps={stories[p.id].steps} Stage={stories[p.id].Stage} mobile="cards" size="short"
            note="Illustration with sample data" />
        </article>
      ))}
    </section>
  );
}

function Toolkit() {
  return (
    <section className="section" id="toolkit" aria-labelledby="toolkit-h">
      <div className="section-head">
        <h2 className="display" id="toolkit-h">Toolkit</h2>
        <p>All of that, condensed: what I reach for, grouped the way I use it.</p>
      </div>
      <dl className="key">
        {toolkit.map(([k, v]) => (
          <div key={k} data-reveal="rule"><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
      <ol className="notes" aria-label="Notes">
        {notes.map(n => <li key={n} data-reveal="rise">{n}</li>)}
      </ol>
    </section>
  );
}

function Contact() {
  return (
    <footer className="section contact" id="contact" aria-labelledby="contact-h">
      <div className="section-head">
        <h2 className="display" id="contact-h">Get in touch</h2>
        <p>Open to senior and staff frontend roles. Email is the fastest way to reach me.</p>
      </div>
      <a className="contact-mail" href={`mailto:${person.email}`} data-reveal="type">{person.email}</a>
      <div className="contact-row" data-reveal="rise">
        <CopyEmail />
        <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a>
        <a href={person.github} target="_blank" rel="noreferrer">GitHub<Arrow /></a>
        <a href={`tel:${person.phone.replace(/\s/g, '')}`}>{person.phone}</a>
      </div>
      <dl className="title-block" aria-label="Sheet details" data-reveal="wipe">
        <div className="wide"><dt>Drawn by</dt><dd><b>{person.name}</b></dd></div>
        <div><dt>Location</dt><dd><b>{person.location}</b></dd></div>
        <div><dt>Revised</dt><dd><b>Nov 2026</b></dd></div>
        <div className="wide"><dt>Built with</dt><dd><b>React 19, Vite, hand-written CSS</b></dd></div>
        <div><dt>Sheet</dt><dd><b>NS-01 of 01</b></dd></div>
        <div><dt>Return</dt><dd><a href="#top"><b>Back to top<Arrow dir="up" /></b></a></dd></div>
      </dl>
    </footer>
  );
}

export default function App() {
  useScrollPlot();
  useReveal();
  return (
    <>
      <a className="skip" href="#siterecon">Skip to the story</a>
      <Nav />
      <Sheet>
        <Hero />
        <main>
          <Now />
          <Before />
          <Projects />
          <Toolkit />
        </main>
        <Contact />
      </Sheet>
    </>
  );
}
