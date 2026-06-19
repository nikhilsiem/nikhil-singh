import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const experiences = [
  {
    company: 'SiteRecon',
    role: 'Senior Product Engineer',
    period: 'Jan 2026 – Present',
    location: 'Noida, UP',
    color: '#6EE7B7',
    highlights: [
      'Boosted team development velocity by 50% embedding Cursor AI & Composer into daily workflows',
      'Architected a greenfield React-based Construction Takeoff platform for automated blueprint measurement',
      'Led tablet-responsive redesign of Scout AI chatbot — cut on-site estimate generation to under 10 min',
      'Built a scalable React component library enforcing design system consistency across all product squads',
      'Overhauled the PDF upload pipeline with advanced caching, achieving best-in-class FCP',
    ],
    tags: ['React', 'AI Tooling', 'Cursor', 'Component Library', 'PDF Pipeline'],
    link: 'https://app.siterecon.ai/agent',
  },
  {
    company: 'Spring Financial',
    role: 'Software Engineer 2',
    period: 'Feb 2025 – Dec 2025',
    location: 'Gurugram, HR',
    color: '#3B82F6',
    highlights: [
      'Designed and shipped scalable user-facing features with Vue 3, Nuxt 3, and Pinia',
      'Automated engineering workflows using AI tools for PR review and Figma-to-Vue code generation',
      'Profiled and optimized rendering pipelines across all device tiers, improving Core Web Vitals',
    ],
    tags: ['Vue 3', 'Nuxt 3', 'Pinia', 'Core Web Vitals', 'AI Automation'],
  },
  {
    company: 'Mastercard',
    role: 'Software Engineer 2',
    period: 'Jul 2023 – Jan 2025',
    location: 'Pune',
    color: '#F59E0B',
    highlights: [
      'Built and maintained a partner & merchant admin portal in Angular with real-time earnings monitoring',
      'Enhanced the merchant management client portal, streamlining operations for Mastercard\'s partner network',
      'Led sprint planning, story estimation, and cross-functional deliverable alignment',
    ],
    tags: ['Angular', 'Admin Portals', 'Agile', 'TypeScript'],
  },
  {
    company: 'Mastercard',
    role: 'Software Engineer',
    period: 'Oct 2021 – Jun 2023',
    location: 'Pune',
    color: '#F59E0B',
    highlights: [
      'Maintained Mastercard\'s DXP component library (StencilJS) — optimized Core Web Vitals',
      'Developed Design Studio: a full-stack drag-and-drop web app builder using Vue.js + PostgreSQL + Express',
      'Reduced enterprise form creation time from two weeks to 20 minutes with FaaS UI',
      'Achieved 95% code coverage across lines, branches, and functions with Jest',
    ],
    tags: ['StencilJS', 'Vue.js', 'PostgreSQL', 'Jest', 'Drag-and-drop'],
  },
  {
    company: 'Saathi Global Education',
    role: 'Frontend Engineer',
    period: 'Jul 2020 – Dec 2021',
    location: 'Bengaluru',
    color: '#A78BFA',
    highlights: [
      'Transformed Figma designs into pixel-perfect Vue 2 interfaces integrated with Django backend',
      'Built a real-time group chat app using Redis, Django Channels, and WebSockets',
    ],
    tags: ['Vue 2', 'Django', 'Redis', 'WebSockets'],
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

export default function Experience() {
  const [active, setActive] = useState(0);
  const exp = experiences[active];

  return (
    <section id="experience" style={{ padding: '120px 40px', maxWidth: 1200, margin: '0 auto' }}>
      <style>{`
        .exp-mobile-tabs { display: none; }

        @media (max-width: 768px) {
          #experience { padding: 48px 12px !important; max-width: 100% !important; }
          .exp-grid { display: block !important; }
          .exp-left { display: none !important; }
          .exp-right { padding: 20px !important; }
          .exp-mobile-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 12px; }
          .exp-mobile-tabs button { flex: 0 0 calc(50% - 8px); min-width: 0; white-space: normal; text-align: left; }
          .exp-mobile-tabs button div { color: var(--text-primary); }
        }
      `}</style>
      <motion.div {...fadeUp()} style={{ marginBottom: 64 }}>
        <div className="section-label">Experience</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Where I've built
        </h2>
      </motion.div>

      <div className="exp-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 32 }}>
        {/* Left nav */}
        <div className="exp-left" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {experiences.map((e, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              {...fadeUp(0.05 * i)}
              style={{
                background: active === i ? 'var(--bg-card)' : 'transparent',
                border: active === i ? `1px solid ${e.color}33` : '1px solid transparent',
                borderRadius: 12,
                padding: '16px 20px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{ backgroundColor: '#111' }}
            >
              {active === i && (
                <motion.div
                  layoutId="active-bar"
                  style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                    background: e.color, borderRadius: '0 2px 2px 0',
                  }}
                />
              )}
              <div style={{ fontSize: 14, fontWeight: 700, color: active === i ? 'var(--text-primary)' : 'var(--text-secondary)', marginBottom: 2 }}>
                {e.company}
              </div>
              <div style={{ fontSize: 11, color: active === i ? e.color : 'var(--text-muted)', fontWeight: 500 }}>
                {e.role}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{e.period}</div>
            </motion.button>
          ))}
        </div>

        {/* Mobile tabs (shown only on small screens) */}
        <div className="exp-mobile-tabs">
          {experiences.map((e, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ padding: '10px 12px', borderRadius: 10, background: active===i ? 'var(--bg-card)' : 'transparent', border: active===i ? `1px solid ${e.color}33` : '1px solid transparent', cursor: 'pointer' }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{e.company}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{e.period}</div>
            </button>
          ))}
        </div>

        {/* Right detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'var(--bg-card)', border: `1px solid ${exp.color}20`,
              borderRadius: 20, padding: '40px',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Subtle glow */}
            <div style={{
              position: 'absolute', top: -60, right: -60,
              width: 200, height: 200, borderRadius: '50%',
              background: exp.color, filter: 'blur(80px)', opacity: 0.06,
              pointerEvents: 'none',
            }} />

            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>
                    {exp.role}
                  </h3>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span style={{ fontSize: 15, color: exp.color, fontWeight: 600 }}>{exp.company}</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>·</span>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{exp.location}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#1a1a1a', padding: '8px 14px', borderRadius: 100 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: exp.color }} />
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{exp.period}</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              {exp.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: exp.color, flexShrink: 0, marginTop: 7 }} />
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{h}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {exp.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 11, padding: '5px 12px', borderRadius: 100,
                  background: `${exp.color}12`, color: exp.color,
                  border: `1px solid ${exp.color}25`, fontWeight: 500,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {exp.link && (
              <a href={exp.link} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 24,
                fontSize: 13, color: exp.color, fontWeight: 600,
                transition: 'gap 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
              >
                View live product ↗
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
