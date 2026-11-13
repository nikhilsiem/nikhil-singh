export const person = {
  name: 'Nikhil Singh',
  role: 'Senior frontend engineer',
  line: 'I build real-time and geospatial frontends: an AI agent that drives a live map, editing tools with undo you can trust, and design systems hundreds of teams build on.',
  location: 'Noida, India',
  email: 's.nikhil2023@gmail.com',
  phone: '+91 90518 06528',
  linkedin: 'https://www.linkedin.com/in/nikhilsiem',
  github: 'https://github.com/nikhilsiem',
};

export const work = [
  {
    id: 'siterecon',
    company: 'SiteRecon',
    role: 'Senior Software Engineer',
    period: 'Feb 2025 – now',
    sector: 'AI geospatial property measurement',
    live: true,
    dims: [
      { value: '$30K+', label: 'new subscriptions in 3 months' },
      { value: '+68%', label: 'mobile-generated measurements' },
    ],
    points: [
      'Built the React, Vite and TypeScript frontend for Scout, where a conversational agent drives a live deck.gl map: an SSE pipeline streams agent tokens and runs 20+ real-time map and UI commands across a ~400-module codebase.',
      'Designed a Command-Pattern undo/redo engine with per-layer isolated history and point-level granularity, and shipped cut, split and modify tools for map layers with automatic server sync.',
      'Delivered the measurement → estimation → proposal workflow (8 UI stages, Redux Toolkit, 6 backend services), the Scout v2 order page and Stripe billing.',
      'Rebuilt the AI chat and map experience for mobile, and built an account-less guest flow for trade-show visitors.',
      'Added Sentry across the app and map library, a Playwright suite of 39 specs on desktop and mobile CI, and Vitest/RTL/MSW coverage of 70–80% on critical flows, with TypeScript strictness and Zod validation as CI gates.',
    ],
    stack: 'React · TypeScript · deck.gl · SSE · Redux Toolkit · Playwright · Sentry',
  },
  {
    id: 'mastercard-commerce',
    company: 'Mastercard',
    role: 'Software Engineer 2',
    period: 'Jul 2023 – Jan 2025',
    sector: 'Cloud commerce and payments',
    dims: [{ value: '0', label: 'releases with a performance regression, held by CI budgets' }],
    points: [
      'Engineered a role-based Angular portal for partners and merchants (onboarding, user management, dashboards) with route-level permission guards driven by the RBAC model.',
      'Re-architected modules around standalone components, lazy routes, OnPush and typed state, improving LCP, CLS and INP and shrinking the merchant portal bundle.',
      'Consolidated several legacy micro-frontends into one Angular codebase with shared components, routing and state.',
      'Built CI gates for bundle size, axe-core accessibility and performance budgets; led sprint planning for a squad of 4–6.',
    ],
    stack: 'Angular · TypeScript · Spring Boot · axe-core · Web Vitals',
  },
  {
    id: 'mastercard-dxp',
    company: 'Mastercard',
    role: 'Software Engineer',
    period: 'Oct 2021 – Jun 2023',
    sector: 'Design systems and developer tooling',
    dims: [
      { value: '120+', label: 'web components, used by 200+ product teams' },
      { value: '2 wk → 20 min', label: 'to build an enterprise form' },
    ],
    points: [
      'Evolved the DXP design system: 120+ StencilJS web components, tuned for accessibility and Core Web Vitals at enterprise scale.',
      'Built Design Studio, a drag-and-drop web app builder (Vue, Express, PostgreSQL); moved layout computation into indexed queries to keep API responses under 100 ms.',
      'Built form-builder workflows in Vue with 95%+ Jest coverage, and set code-review standards the team adopted.',
    ],
    stack: 'StencilJS · Vue · Express · PostgreSQL · Jest',
  },
  {
    id: 'saathi',
    company: 'Saathi Global Education Network',
    role: 'Frontend Engineer',
    period: 'Jul 2020 – Sep 2021',
    sector: 'EdTech',
    dims: [],
    points: [
      'Architected a Vue 2 frontend from scratch on a Django REST API, translating Figma designs into pixel-accurate interfaces.',
      'Built real-time cohort chat with Redis, Django Channels and WebSockets.',
    ],
    stack: 'Vue 2 · Vuex · Django · WebSockets · Redis',
  },
];

export const projects = [
  {
    id: 'fixproof',
    name: 'Fixproof',
    aka: 'Signal',
    tagline: 'AI incident response that has to prove its fix.',
    dims: [
      { value: '9', label: 'alert platforms ingested' },
      { value: '24', label: 'architecture decision records' },
    ],
    body: 'Alerts arrive from Sentry, Datadog, CloudWatch, Grafana, New Relic and four more. An LLM agent diagnoses the cause and proposes a fix from a strict allowlist with an explainable confidence score; then it diagnoses only, asks a person to approve, or runs a low-blast-radius fix on its own.',
    points: [
      'A fix PR only counts if its test fails on the old code and passes on the new, followed by a staged canary with automatic revert.',
      'One pnpm monorepo: API, queue worker, Next.js dashboard and Expo app over a shared typed client. Web and mobile choose confirm screens from the same core helpers, including hold-to-confirm for risky approvals.',
      '60+ test files, lint-enforced boundaries, and a deliberately breakable "Bug Zoo" API with 16 seeded failure scenarios to test it end to end.',
    ],
    stack: 'TypeScript · Next.js · Expo · Fastify · Postgres · Redis · LLM agents',
    links: [],
  },
  {
    id: 'tayyari',
    name: 'Tayyari',
    aka: 'Vigya',
    tagline: 'A voice tutor for JEE, NEET and Class 9–12, in seven Indian languages.',
    dims: [
      { value: '7', label: 'languages, by voice, text or photo' },
      { value: '185', label: 'original practice questions' },
    ],
    body: 'Students ask a doubt in English, Hindi, Tamil, Telugu, Marathi, Bengali or Kannada. Vigya works the answer step by step in KaTeX and speaks a short summary while her portrait avatar lip-syncs to the audio.',
    points: [
      'Runs free in the browser with no keys: WebLLM (Qwen3 on WebGPU) plus the browser’s own speech recognition and voices.',
      'With Sarvam AI it handles Hinglish code-mixed speech and natural Indian voices; hard maths and physics route to a stronger reasoning model.',
      'Canvas avatar with mouth movement driven by the audio level; BM25 retrieval over an original syllabus; keys never reach the browser.',
    ],
    stack: 'Next.js · React 19 · WebLLM · WebGPU · Web Speech · KaTeX',
    links: [],
  },
  {
    id: 'learn-this',
    name: 'Learn This',
    tagline: 'Turn any topic into a structured course.',
    dims: [{ value: '4–8', label: 'modules planned per course, with prerequisites' }],
    body: 'Give it a topic, your level, a goal and a time budget. An LLM planner returns a module graph with prerequisites, then streams each lesson, a quiz and a tutoring chat on demand.',
    points: [
      'Lessons stream in as Markdown on first open and are cached in Supabase Postgres.',
      'Passing a quiz unlocks the modules that depend on it; courses export to Markdown.',
      'NextAuth with Google, Upstash Redis rate limits on generation, and a provider swap in three environment variables.',
    ],
    stack: 'Next.js 16 · React 19 · NextAuth · Supabase · Upstash Redis',
    links: [
      { label: 'Live demo', href: 'https://learn-this.vercel.app' },
      { label: 'Source', href: 'https://github.com/nikhilsiem/learn-this' },
    ],
  },
];

export const toolkit = [
  ['Frontend', 'React, Next.js, Angular, Vue 3, TypeScript, Redux Toolkit, Tailwind CSS, React Native / Expo'],
  ['Real-time & maps', 'deck.gl, WebGL, server-sent events, WebSockets'],
  ['Quality', 'Playwright, Vitest, React Testing Library, MSW, Jest, Cypress, axe-core, Sentry, CI quality gates'],
  ['Backend', 'Node.js, Express, Spring Boot, FastAPI, REST, GraphQL, Zod'],
  ['Data', 'PostgreSQL, MongoDB, Redis, Supabase'],
  ['AI tooling', 'Claude Code, Cursor, GitHub Copilot, LLM agents, prompt engineering'],
];

export const notes = [
  'First Prize, Mastercard Tech-Fest, January 2023, for a CI-integrated Lighthouse system that reported on every pull request and enforced Web Vitals budgets before merge.',
  'B.Tech, Electrical & Electronics Engineering, Institute of Engineering & Management, Kolkata, 2016–2020.',
];
