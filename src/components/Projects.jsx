import { motion } from 'framer-motion';

const projects = [
  {
    name: 'Fixproof',
    codename: 'Signal',
    tagline: 'AI incident response with confidence-gated autonomy',
    color: '#6EE7B7',
    description:
      'Ingests alerts from 9 monitoring platforms (Sentry, Datadog, CloudWatch, Grafana, New Relic and more), has an LLM agent diagnose the cause, and proposes a fix from a strict allowlist with an explainable confidence score. It then diagnoses only, asks a human to approve, or auto-executes low-blast-radius fixes.',
    highlights: [
      'TypeScript pnpm monorepo: API, queue worker, Next.js dashboard and Expo mobile app over one shared typed client',
      'Fix PRs must prove themselves: the test fails on the old code and passes on the fix, then a staged canary with automatic revert',
      'Hold-to-confirm for risky approvals; web and mobile pick confirm screens from the same core helpers',
      '24 ADRs, lint-enforced boundaries and 60+ test files, plus a deliberately breakable "Bug Zoo" API with 16 seeded failure scenarios to test it end to end',
    ],
    tags: ['Next.js', 'Expo', 'TypeScript', 'LLM Agents', 'Postgres', 'Redis', 'Fastify'],
    stat: { value: '9', label: 'alert platforms' },
  },
  {
    name: 'Tayyari',
    codename: 'Vigya',
    tagline: 'Multilingual voice AI tutor for JEE, NEET & Class 9–12',
    color: '#F59E0B',
    description:
      'Students ask a doubt by voice, text or a photo of the question in English, Hindi, Tamil, Telugu, Marathi, Bengali or Kannada. Vigya explains it with step-by-step KaTeX working and speaks a short summary while her photo avatar lip-syncs to the audio.',
    highlights: [
      'Runs free in the browser with no keys: WebLLM (Qwen3 on WebGPU) plus built-in speech recognition and voices',
      'Sarvam AI mode for Hinglish code-mix speech-to-text and natural Indian voices; hard maths/physics routed to a stronger reasoning model',
      'Canvas avatar with lip movement driven by audio level, blinks and idle motion',
      'BM25 retrieval over an original syllabus and a 185-question practice bank; API keys never reach the browser',
    ],
    tags: ['Next.js 15', 'React 19', 'WebLLM', 'WebGPU', 'Speech AI', 'KaTeX', 'RAG'],
    stat: { value: '7', label: 'Indian languages' },
  },
  {
    name: 'Learn This',
    tagline: 'Turn any topic into a structured AI course',
    color: '#3B82F6',
    description:
      'Tell it what you want to learn, your level, your goal and how much time you have. An LLM planner builds a module graph with prerequisites, then streams each lesson, a quiz and a tutoring chat on demand.',
    highlights: [
      'Lessons stream to the page as Markdown on first open, then cache in Supabase Postgres',
      'Quiz scores unlock dependent modules: prerequisite-locked navigation across the course graph',
      'Per-module tutor chat with saved conversations and auto-generated titles; export a course to Markdown',
      'NextAuth (Google), Upstash Redis rate limiting on generation; swap LLM providers with three env vars',
    ],
    tags: ['Next.js 16', 'React 19', 'NextAuth', 'Supabase', 'Upstash Redis', 'Tailwind 4'],
    stat: { value: '4–8', label: 'modules per course' },
    live: 'https://learn-this.vercel.app',
    repo: 'https://github.com/nikhilsiem/learn-this',
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function LinkPill({ href, color, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        fontSize: 13, fontWeight: 600, color,
        padding: '8px 16px', borderRadius: 100,
        border: `1px solid ${color}40`, background: `${color}0d`,
        transition: 'background 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = `${color}22`)}
      onMouseLeave={e => (e.currentTarget.style.background = `${color}0d`)}
    >
      {children}
    </a>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: '120px 40px', maxWidth: 1200, margin: '0 auto' }}>
      <style>{`
        @media (max-width: 768px) {
          #projects { padding: 48px 12px !important; max-width: 100% !important; }
          .project-card { padding: 24px 20px !important; }
          .project-body { display: block !important; }
          .project-stat { margin-top: 20px; }
        }
      `}</style>

      <motion.div {...fadeUp()} style={{ marginBottom: 64 }}>
        <div className="section-label">Projects</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Things I've built<br />
          <span style={{ color: 'var(--text-muted)' }}>on my own time</span>
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {projects.map((p, i) => (
          <motion.article
            key={p.name}
            className="project-card"
            {...fadeUp(0.08 * i)}
            whileHover={{ borderColor: `${p.color}50` }}
            style={{
              background: 'var(--bg-card)', border: `1px solid ${p.color}20`,
              borderRadius: 20, padding: '40px', position: 'relative', overflow: 'hidden',
              transition: 'border-color 0.25s',
            }}
          >
            <div style={{
              position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%',
              background: p.color, filter: 'blur(90px)', opacity: 0.07, pointerEvents: 'none',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {p.name}
                  </h3>
                  {p.codename && (
                    <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>aka {p.codename}</span>
                  )}
                </div>
                <div style={{ fontSize: 15, color: p.color, fontWeight: 600 }}>{p.tagline}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {p.live && <LinkPill href={p.live} color={p.color}>Live demo ↗</LinkPill>}
                {p.repo && <LinkPill href={p.repo} color={p.color}>GitHub ↗</LinkPill>}
                {!p.repo && (
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '8px 14px', borderRadius: 100, background: '#1a1a1a' }}>
                    Private repo · walkthrough on request
                  </span>
                )}
              </div>
            </div>

            <div className="project-body" style={{ display: 'grid', gridTemplateColumns: '1fr 180px', gap: 40, alignItems: 'start' }}>
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: 24 }}>{p.description}</p>
                <div style={{ marginBottom: 24 }}>
                  {p.highlights.map((h, hi) => (
                    <div key={hi} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, flexShrink: 0, marginTop: 8 }} />
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{h}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: 11, padding: '5px 12px', borderRadius: 100,
                      background: `${p.color}12`, color: p.color,
                      border: `1px solid ${p.color}25`, fontWeight: 500,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-stat" style={{ padding: '24px', borderRadius: 16, border: '1px solid var(--border)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: p.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {p.stat.value}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8 }}>{p.stat.label}</div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
