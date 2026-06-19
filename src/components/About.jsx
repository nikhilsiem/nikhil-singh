import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: '6+', label: 'Years building', sub: 'web products' },
  { value: '50%', label: 'Dev velocity boost', sub: 'via AI tooling' },
  { value: '95%', label: 'Test coverage', sub: 'at Mastercard' },
  { value: '4', label: 'Companies', sub: 'shaped' },
];

const traits = [
  { icon: '⚡', title: 'AI-first workflow', desc: 'Cursor, Composer, GitHub Copilot — not just tools, but thinking partners integrated into every PR.' },
  { icon: '🏗️', title: 'Systems thinker', desc: 'From DXP component libraries to full-stack drag-and-drop builders — I design for reuse and scale.' },
  { icon: '🎯', title: 'Outcome driven', desc: 'Whether it\'s FCP scores, estimate time cuts, or velocity metrics — I measure impact, not effort.' },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

export default function About() {
  return (
    <section id="about" style={{ padding: '120px 40px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div {...fadeUp()} style={{ marginBottom: 80 }}>
        <div className="section-label">About</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 700 }}>
          I turn complex problems into<br />
          <span style={{ color: 'var(--text-muted)' }}>elegant, fast interfaces</span>
        </h2>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        {/* Left: bio */}
        <motion.div {...fadeUp(0.1)}>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: 24 }}>
            With over 6 years across fintech, enterprise SaaS, and AI-powered platforms, I've led frontend builds at
            companies like Mastercard, Spring Financial, and SiteRecon. My work has touched millions of users through 
            admin portals, drag-and-drop builders, and real-time AI chatbots.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--text-secondary)', marginBottom: 40 }}>
            I'm obsessed with the intersection of developer experience and user experience — building component systems 
            that teams love to use, and shipping interfaces that users barely notice because they just work.
          </p>

          {/* Traits */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {traits.map((t, i) => (
              <motion.div
                key={t.title}
                {...fadeUp(0.15 + i * 0.1)}
                style={{
                  display: 'flex', gap: 16, padding: '20px', borderRadius: 12,
                  border: '1px solid var(--border)', background: 'var(--bg-card)',
                  transition: 'border-color 0.2s',
                  cursor: 'default',
                }}
                whileHover={{ borderColor: '#333' }}
              >
                <span style={{ fontSize: 24, flexShrink: 0 }}>{t.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{t.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: stats */}
        <motion.div {...fadeUp(0.2)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeUp(0.2 + i * 0.08)}
                style={{
                  padding: '28px 24px', borderRadius: 16,
                  border: '1px solid var(--border)', background: 'var(--bg-card)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 8 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Award */}
          <motion.div
            {...fadeUp(0.4)}
            style={{
              padding: '24px', borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(110,231,183,0.06), rgba(59,130,246,0.06))',
              border: '1px solid rgba(110,231,183,0.15)',
            }}
          >
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 28 }}>🏆</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>First Prize — Mastercard Tech-Fest 2023</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Awarded for building a CI-integrated Lighthouse automation system that enforced Web Vitals quality gates on every pull request.
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
