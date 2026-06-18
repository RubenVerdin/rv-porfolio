export const name = 'Ruben Verdin'
export const firstName = name.trim().split(/\s+/)[0]
export const role = 'Frontend Engineer'
export const email = 'contact@rubenverdin.com'
export const location = 'Canada'
export const mailtoHref = `mailto:${email}`
export const year = new Date().getFullYear()

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const stats = [
  { num: '4+', label: 'Years experience' },
  { num: '20+', label: 'Projects delivered' },
  { num: '20+', label: 'Happy clients' },
]

export const skills = [
  { group: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3', 'Solidity'] },
  { group: 'Frameworks & libraries', items: ['React', 'Next.js', 'NestJS', 'Node.js', 'Tailwind CSS', 'Framer Motion', 'Prisma'] },
  { group: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Redis'] },
  { group: 'Tools & platforms', items: ['Git', 'Docker', 'AWS', 'Vercel', 'Linux', 'Figma', 'Cloudflare', 'GraphQL'] },
]

export const experiences = [
  {
    role: 'Senior Frontend Engineer',
    period: 'Apr 2025 — Present',
    company: 'Stantech AI',
    location: 'Gurugram',
    bullets: [
      'Led frontend development of a no-code form builder SaaS enabling MSMEs to build customizable dynamic forms',
      'Designed reusable, responsive component libraries, accelerating feature delivery across teams',
      'Implemented real-time validation and conditional logic in form builders, reducing user errors',
      'Built a performant dashboard with virtualized lists and infinite scroll, handling 100+ form entries without UI lag',
    ],
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'JavaScript'],
  },
  {
    role: 'Senior Frontend Developer',
    period: 'Oct 2024 — Apr 2025',
    company: 'Quantx Technology Pvt. Ltd.',
    location: 'Gurugram',
    bullets: [
      'Integrated TradingView Advanced Charting Library to provide interactive financial charts with technical indicators',
      'Developed and optimized a real-time trading platform using React, TypeScript, and WebSockets for high-frequency data updates',
      'Implemented a docking layout using Dockview, allowing all trading components to be draggable, resizable, and organized within dockable panels',
    ],
    tech: ['React', 'TypeScript', 'WebSockets', 'TradingView', 'Dockview'],
  },
  {
    role: 'Senior Frontend Engineer',
    period: 'Mar 2023 — Oct 2024',
    company: 'HKS Manpower Pvt. Ltd.',
    location: 'Gurugram',
    bullets: [
      'Led frontend architecture decisions, improving scalability and development efficiency',
      'Reduced engineering workload by 20% by building a production-ready React & React Native boilerplate',
      'Improved website load time by 30% through bundle optimization and performance tuning',
      'Designed a WebSocket-based real-time chat system with PDF sharing',
      'Enabled large file uploads (100GB+) with automated retry and failure recovery',
    ],
    tech: ['React', 'React Native', 'TypeScript', 'WebSockets', 'Node.js'],
  },
  {
    role: 'Frontend Developer',
    period: 'Oct 2021 — Mar 2023',
    company: 'Healthmug Pvt. Ltd.',
    location: 'Delhi',
    bullets: [
      'Core contributor to the Healthmug iOS application, from initial development to production release',
      'Architected shared business logic to minimize re-renders and unnecessary network calls',
      'Used Redux Toolkit & RTK Query for efficient caching and state management',
      'Implemented WebRTC video calling, handling low-latency communication and network edge cases',
    ],
    tech: ['React Native', 'Redux Toolkit', 'RTK Query', 'WebRTC', 'TypeScript'],
  },
]

const icons = {
  github: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.46c.52.1.71-.23.71-.5v-1.94c-2.92.63-3.54-1.25-3.54-1.25-.48-1.21-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.07 1.61 1.09 1.61 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.66-1.4-2.33-.27-4.78-1.17-4.78-5.18 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.34.1-2.78 0 0 .88-.28 2.88 1.08a9.9 9.9 0 0 1 5.24 0c2-1.36 2.88-1.08 2.88-1.08.57 1.44.21 2.51.1 2.78.67.74 1.08 1.67 1.08 2.82 0 4.02-2.46 4.9-4.8 5.16.38.33.71.97.71 1.96v2.9c0 .28.19.61.72.5A10.5 10.5 0 0 0 12 1.5Z"/></svg>`,
  linkedin: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 .78 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z"/></svg>`,
  twitter: `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.96 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z"/></svg>`,
}

export const socials = [
  { label: 'GitHub', href: 'https://github.com/RubenVerdin', icon: icons.github },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: icons.linkedin },
  { label: 'Twitter', href: 'https://twitter.com', icon: icons.twitter },
]
