import { useEffect, useState } from 'react';
import { person, work, projects, toolkit, notes } from './content';
import Sheet from './components/Sheet';
import Parcel, { Dim } from './components/Parcel';
import SurveyTool from './components/SurveyTool';
import Arrow from './components/Arrow';
import ObliqueDim from './components/ObliqueDim';

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'projects', label: 'Projects' },
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
  const scout = work[0];
  return (
    <header className="hero" id="top">
      <div className="hero-id">
        <h1 className="display">Nikhil<br />Singh</h1>
        <p className="hero-line">{person.line}</p>
        <div className="hero-cta">
          <a className="btn" href={`mailto:${person.email}`}>Email me</a>
          <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={person.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>

      <div className="hero-plot">
        <Parcel as="a" href="#siterecon" data-plot-id="scout" kind="live" i={0} style={{ '--x': 6.6, '--y': 1.25, '--w': 3.1 }}
          dim={scout.dims[0]}>
          <h3>Scout AI map</h3>
          <p>SiteRecon, 2025 to now. An agent drives a live deck.gl map: 20+ real-time commands over SSE.</p>
        </Parcel>
        <Parcel as="a" href="#mastercard-dxp" i={1} style={{ '--x': 10, '--y': 2.35, '--w': 1.75 }}
          dim={{ value: '200+', label: 'teams' }}>
          <h3>DXP design system</h3>
          <p>Mastercard. 120+ web components.</p>
        </Parcel>
        <Parcel as="a" href="#fixproof" kind="own" i={2} style={{ '--x': 7.25, '--y': 3.5, '--w': 2.35 }}>
          <h3>Fixproof</h3>
          <p>AI incident response that has to prove its fix.</p>
        </Parcel>
        <Parcel as="a" href="#tayyari" data-plot-id="tayyari" kind="own" i={3} style={{ '--x': 5.55, '--y': 4.7, '--w': 2.1 }}>
          <h3>Tayyari</h3>
          <p>Voice tutor in 7 Indian languages.</p>
        </Parcel>
        <Parcel as="a" href="#learn-this" kind="own" i={4} style={{ '--x': 8.15, '--y': 4.55, '--w': 2.0 }}>
          <h3>Learn This</h3>
          <p>Any topic into a course.</p>
        </Parcel>
      </div>

      <ObliqueDim from="scout" to="tayyari" fromAt={0.22} toAt={0.55}
        value={scout.dims[1].value} label="mobile measurements" />

      <p className="legend">
        <span><i className="live" />Live work</span>
        <span><i />Shipped at work</span>
        <span><i className="own" />Built on my own</span>
        <span className="hint">Click anywhere on the sheet to measure</span>
      </p>

      <dl className="title-block" aria-label="Sheet details">
        <div className="wide"><dt>Sheet NS-01</dt><dd><b>{person.name}, {person.role}</b></dd></div>
        <div><dt>Location</dt><dd><b>{person.location}</b></dd></div>
        <div><dt>Scale</dt><dd><b>1 : 6 years</b></dd></div>
        <div><dt>Contact</dt><dd><a href={`mailto:${person.email}`}><b>{person.email}</b></a></dd></div>
        <div><dt>Revised</dt><dd><b>Nov 2026</b></dd></div>
      </dl>
    </header>
  );
}

function Work() {
  return (
    <section className="section" id="work" aria-labelledby="work-h">
      <div className="section-head">
        <h2 className="display" id="work-h">Work</h2>
        <p>Six years of frontends that carry real load: an AI map product, payments portals, and a design system other teams build on.</p>
      </div>
      <ol>
        {work.map(job => (
          <li key={job.id} id={job.id} className={`entry${job.live ? ' live' : ''}`}>
            <div className="entry-id">
              <h3 className="display">{job.company}</h3>
              <p className="entry-meta">{job.role}<span>{job.period} · {job.sector}</span></p>
            </div>
            <div className="entry-body">
              {job.dims.length > 0 && (
                <div className="entry-dims">{job.dims.map(d => <Dim key={d.label} {...d} />)}</div>
              )}
              <ul className="points">{job.points.map(p => <li key={p}>{p}</li>)}</ul>
              <p className="stack">{job.stack}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-h">
      <div className="section-head">
        <h2 className="display" id="projects-h">Built on<br />my own</h2>
        <p>Products I designed and shipped end to end outside work, with agentic workflows (Claude Code) doing the heavy lifting under tests and written decisions.</p>
      </div>
      {projects.map((p, i) => (
        <Parcel as="article" key={p.id} id={p.id} kind="own" i={i} className="project" aria-labelledby={`${p.id}-h`}>
          <h3 className="display" id={`${p.id}-h`}>{p.name}{p.aka && <small>also called {p.aka}</small>}</h3>
          <div>
            <p className="tag">{p.tagline}</p>
            <p className="lede">{p.body}</p>
            <div className="entry-dims">{p.dims.map(d => <Dim key={d.label} {...d} />)}</div>
          </div>
          <div>
            <ul className="points">{p.points.map(t => <li key={t}>{t}</li>)}</ul>
            <p className="stack">{p.stack}</p>
            {p.links.length > 0 ? (
              <p className="project-links">
                {p.links.map(l => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}<Arrow /></a>)}
              </p>
            ) : (
              <p className="project-links private">Private repository. Happy to walk through the code on a call.</p>
            )}
          </div>
        </Parcel>
      ))}
    </section>
  );
}

function Toolkit() {
  return (
    <section className="section" id="toolkit" aria-labelledby="toolkit-h">
      <div className="section-head">
        <h2 className="display" id="toolkit-h">Key</h2>
        <p>What I reach for, grouped the way I use it.</p>
      </div>
      <dl className="key">
        {toolkit.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>
      <ol className="notes" aria-label="Notes">
        {notes.map(n => <li key={n}>{n}</li>)}
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
      <a className="contact-mail" href={`mailto:${person.email}`}>{person.email}</a>
      <div className="contact-row">
        <CopyEmail />
        <a href={person.linkedin} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a>
        <a href={person.github} target="_blank" rel="noreferrer">GitHub<Arrow /></a>
        <a href={`tel:${person.phone.replace(/\s/g, '')}`}>{person.phone}</a>
      </div>
      <dl className="title-block" aria-label="Sheet details">
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
  return (
    <>
      <a className="skip" href="#work">Skip to work</a>
      <Nav />
      <Sheet>
        <Hero />
        <main>
          <Work />
          <Projects />
          <Toolkit />
        </main>
        <Contact />
      </Sheet>
      <SurveyTool />
    </>
  );
}
