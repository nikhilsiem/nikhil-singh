import { motion } from 'framer-motion';

const skillGroups = [
  {
    label: 'AI & Augmented Dev',
    color: '#6EE7B7',
    skills: ['Cursor', 'Cline', 'GitHub Copilot', 'Prompt Engineering', 'LLM Code Review', 'LLM Code Generation', 'Claude Code'],
  },
  {
    label: 'Frontend Frameworks',
    color: '#3B82F6',
    skills: ['React.js', 'Vue 2/3', 'Next.js','Nuxt.js', 'Angular', 'StencilJS', 'Javascript', 'TypeScript', 'Storybook'],
  },
  {
    label: 'Languages',
    color: '#A78BFA',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java'],
  },
  {
    label: 'State & Testing',
    color: '#F59E0B',
    skills: ['Pinia', 'Vuex', 'Redux', 'Jest', 'Vitest', 'Cypress', 'Playwright'],
  },
  {
    label: 'Backend & APIs',
    color: '#34D399',
    skills: ['Node.js', 'Express.js', 'Flask', 'Django', 'REST', 'GraphQL' , 'Websockets', 'Spring Boot'],
  },
  {
    label: 'Databases & Infra',
    color: '#F87171',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'supabase'],
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

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '120px 40px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div {...fadeUp()} style={{ marginBottom: 64 }}>
        <div className="section-label">Skills</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Love working on:
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            {...fadeUp(0.08 * gi)}
            style={{
              padding: '28px', borderRadius: 16,
              border: '1px solid var(--border)', background: 'var(--bg-card)',
              transition: 'border-color 0.25s, transform 0.25s',
            }}
            whileHover={{ borderColor: `${group.color}40`, y: -4 }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: group.color, boxShadow: `0 0 10px ${group.color}80` }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: group.color }}>
                {group.label}
              </span>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {group.skills.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 * gi + 0.04 * si, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    fontSize: 13, padding: '6px 14px', borderRadius: 100,
                    background: `${group.color}0f`,
                    border: `1px solid ${group.color}20`,
                    color: 'var(--text-primary)',
                    fontWeight: 500, cursor: 'default',
                    transition: 'background 0.2s',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education */}
      <motion.div
        {...fadeUp(0.3)}
        style={{
          marginTop: 40, padding: '32px', borderRadius: 16,
          border: '1px solid var(--border)', background: 'var(--bg-card)',
          display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap',
        }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: 12, background: '#1a1a1a',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0,
        }}>
          🎓
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Institute of Engineering & Management, Kolkata</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>B.Tech in Electrical and Electronics Engineering · 2016 – 2020</div>
        </div>
        <div style={{ padding: '8px 16px', borderRadius: 100, background: '#1a1a1a', fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
          Foundation
        </div>
      </motion.div>
    </section>
  );
}
