export const name = 'Ruben Verdin'
export const firstName = name.trim().split(/\s+/)[0]
export const role = 'Frontend Developer'
export const email = 'contact@rubenverdin.com'
export const location = 'Toronto, Canada'
export const mailtoHref = `mailto:${email}`
export const year = new Date().getFullYear()

export const experiences = [
  {
    role: 'Senior Frontend Engineer',
    period: 'Apr 2025 — Present',
    company: 'Stantech AI',
    location: 'Gurugram',
    desc: 'Led frontend development of a no-code form builder SaaS enabling MSMEs to build customizable dynamic forms. Designed reusable component libraries and built a performant dashboard with virtualized lists handling 100+ entries without UI lag.',
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
  },
  {
    role: 'Senior Frontend Developer',
    period: 'Oct 2024 — Apr 2025',
    company: 'Quantx Technology',
    location: 'Gurugram',
    desc: 'Integrated TradingView Advanced Charting Library for interactive financial charts with technical indicators. Developed a real-time trading platform with WebSockets for high-frequency data updates and a docking layout with draggable, resizable panels.',
    tech: ['React', 'TypeScript', 'WebSockets', 'TradingView', 'Dockview'],
  },
  {
    role: 'Senior Frontend Engineer',
    period: 'Mar 2023 — Oct 2024',
    company: 'HKS Manpower',
    location: 'Gurugram',
    desc: 'Led frontend architecture decisions, improving scalability and development efficiency. Built a production-ready boilerplate that cut engineering onboarding time by 20%. Designed a WebSocket-based real-time chat system with PDF sharing and large-file uploads.',
    tech: ['React', 'React Native', 'TypeScript', 'WebSockets', 'Node.js'],
  },
  {
    role: 'Frontend Developer',
    period: 'Oct 2021 — Mar 2023',
    company: 'Healthmug',
    location: 'Delhi',
    desc: 'Core contributor to the Healthmug iOS application from initial development to production release. Architected shared business logic to minimize re-renders, implemented Redux Toolkit for caching, and added WebRTC video calling with low-latency communication.',
    tech: ['React Native', 'Redux Toolkit', 'RTK Query', 'WebRTC', 'TypeScript'],
  },
]

export const technologies: string[] = [
  'Vue.js', 'TypeScript', 'Tailwind CSS', 'Pinia',
  'HTML', 'CSS', 'JavaScript', 'Vite',
  'React', 'Next.js', 'Node.js', 'Git',
]

export const tools = [
  { name: 'VS Code', slotId: 'tool-vscode' },
  { name: 'GitHub', slotId: 'tool-github' },
  { name: 'Figma', slotId: 'tool-figma' },
  { name: 'Notion', slotId: 'tool-notion' },
  { name: 'Linear', slotId: 'tool-linear' },
]

export const interests = [
  {
    key: 'architecture',
    title: 'Architecture',
    desc: "I'm fascinated by how buildings shape our experiences and how form meets function in the built environment.",
  },
  {
    key: 'urbanism',
    title: 'Urbanism',
    desc: 'Cities are systems. I write about urban design, transit, and the future of our neighborhoods.',
  },
  {
    key: 'history',
    title: 'History',
    desc: "Understanding the past helps build a better future. I'm always reading.",
  },
  {
    key: 'psychology',
    title: 'Psychology',
    desc: 'Human behavior drives design. I enjoy learning how we think, decide, and interact.',
  },
]

export const articles = [
  {
    slug: 'vue-component-libraries',
    category: 'Vue',
    title: 'Building Maintainable Vue Component Libraries',
    dek: 'Lessons learned shipping a token-driven component library that scales across projects without turning into a maintenance burden.',
    date: 'May 28, 2025',
    read: '8 min read',
    isOpinion: false,
  },
  {
    slug: 'modern-css',
    category: 'CSS',
    title: 'Modern CSS I Reach For Every Day',
    dek: 'Container queries, :has(), subgrid and color-mix have quietly replaced half the JavaScript I used to write.',
    date: 'May 14, 2025',
    read: '6 min read',
    isOpinion: true,
  },
  {
    slug: 'javascript-patterns',
    category: 'JavaScript',
    title: 'JavaScript Patterns That Aged Well',
    dek: 'A look at the small, boring patterns that have survived a decade of framework churn — and why they still hold up.',
    date: 'Apr 30, 2025',
    read: '7 min read',
    isOpinion: false,
  },
  {
    slug: 'freelancing-2025',
    category: 'Career',
    title: 'Freelancing as a Developer in 2025',
    dek: "What I've learned about pricing, scoping and saying no while running a small independent practice.",
    date: 'Apr 12, 2025',
    read: '9 min read',
    isOpinion: true,
  },
  {
    slug: 'city-living',
    category: 'City Living',
    title: 'What City Living Taught Me About Interfaces',
    dek: "Sidewalks, transit maps and signage are interfaces too — and they're better at wayfinding than most apps.",
    date: 'Mar 26, 2025',
    read: '5 min read',
    isOpinion: false,
  },
  {
    slug: 'urban-studies',
    category: 'Urban Studies',
    title: 'Cities Are Systems: Notes on Urban Studies',
    dek: 'Reading urban planning as systems design — feedback loops, constraints, and the cost of optimizing the wrong metric.',
    date: 'Mar 8, 2025',
    read: '10 min read',
    isOpinion: false,
  },
]

const icons = {
  github: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.52.1.71-.23.71-.5v-1.94c-2.92.63-3.54-1.25-3.54-1.25-.48-1.21-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.07 1.61 1.09 1.61 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.66-1.4-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.34.1-2.78 0 0 .88-.28 2.88 1.08a9.9 9.9 0 0 1 5.24 0c2-1.36 2.88-1.08 2.88-1.08.57 1.44.21 2.51.1 2.78.67.74 1.08 1.67 1.08 2.82 0 4.02-2.46 4.9-4.8 5.16.38.33.71.97.71 1.96v2.9c0 .28.19.61.72.5A10.5 10.5 0 0 0 12 1.5Z"/></svg>`,
  linkedin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z"/></svg>`,
  mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm.4 2L12 12.3 20.6 6H3.4Z"/></svg>`,
}

export const socials = [
  { id: 'github',   label: 'GitHub',   handle: '@RubenVerdin', url: 'https://github.com/RubenVerdin', icon: icons.github },
  { id: 'linkedin', label: 'LinkedIn', handle: 'ruben-verdin',  url: 'https://linkedin.com',           icon: icons.linkedin },
  { id: 'mail',     label: 'Email',    handle: email,            url: mailtoHref,                        icon: icons.mail },
]
