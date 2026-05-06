import { useScrollReveal } from '../hooks/useAnimations'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
)

const projects = [
  {
    num: '01',
    name: 'VersionVault',
    desc: 'A full-stack version control and CI/CD platform — like a custom-built GitHub. Developers can manage repositories, track issues, and run automated build pipelines, all from one place.',
    results: [
      'CI/CD pipelines run in isolated Docker containers — zero bleed between builds',
      'Live log streaming via WebSockets so developers watch builds happen in real-time',
      'AI-powered repo scaffolding — pick a tech stack, get a full project structure instantly',
      'Async job queues handle heavy Git operations without ever blocking the server',
    ],
    tags: ['Developer Platform', 'CI/CD Pipeline', 'Real-Time App'],
    featured: true,
    link: 'https://github.com/jayasuryas',
  },
  {
    num: '02',
    name: 'Dental Buddy',
    desc: 'A smart EMR system built for dental clinics. Doctors, receptionists, and admins each see exactly what they need — appointments, prescriptions, patient records, billing, and analytics, all in one secure dashboard.',
    results: [
      'Role-based access for 5 user types across multiple clinics',
      'Clinical modules for case sheets, prescriptions, and X-ray imaging',
      'Enterprise-grade security with refresh tokens and HTTP-only cookies',
    ],
    tags: ['Healthcare App', 'Admin Dashboard', 'Freelance Project'],
    featured: true,
    link: '#',
  },
  {
    num: '03',
    name: 'CycloneX',
    desc: 'A production-ready e-commerce platform for selling bicycles and accessories. Clean product pages, wishlist, cart, coupons, and a full admin dashboard for managing everything behind the scenes.',
    tags: ['Online Store', 'Admin Panel', 'Full-Stack App'],
    link: 'https://github.com/jayasuryas',
  },
  {
    num: '04',
    name: 'Nasa Logistics',
    desc: 'A logistics and driver management platform. Admins assign orders, track driver availability in real-time, generate Excel reports, and manage the full delivery workflow — built for scale with AWS infrastructure.',
    tags: ['Logistics Platform', 'Admin Dashboard', 'Cloud Deployed'],
    link: 'https://github.com/jayasuryas',
  },
]

function RevealItem({ children, delay = 0 }) {
  const [ref, isVisible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" className="bg-charcoal py-24 max-sm:py-18">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealItem>
          <span className="block font-mono text-xs font-normal tracking-widest uppercase text-rust mb-4">
            My Work
          </span>
        </RevealItem>
        <RevealItem delay={80}>
          <h2 className="font-display font-light text-[clamp(32px,5vw,52px)] leading-[1.15] text-warm-white mb-5">
            Projects that speak<br />for themselves.
          </h2>
        </RevealItem>

        {projects.map((proj, i) => (
          <RevealItem key={proj.num} delay={i * 80}>
            <div
              className={`flex items-start justify-between border-t border-warm-white/[0.06] transition-colors duration-200 hover:bg-blue-custom/[0.03] cursor-none max-sm:flex-col ${proj.featured ? 'py-12' : 'py-9'} ${i === projects.length - 1 ? 'border-b border-warm-white/[0.06]' : ''}`}
              data-cursor="pointer"
            >
              <div className="flex-1">
                <span className="block font-mono text-xs font-light text-slate-custom tracking-wider mb-2">
                  {proj.num}
                </span>
                <h3 className="font-display text-[28px] font-light text-warm-white mb-2.5">
                  {proj.name}
                </h3>
                <p className={`text-sm leading-relaxed text-warm-white/55 max-w-[520px] ${proj.featured ? 'mb-4' : ''}`}>
                  {proj.desc}
                </p>

                {proj.results && (
                  <ul className="my-4 pl-4">
                    {proj.results.map((r) => (
                      <li key={r} className="text-[13px] leading-[1.8] text-warm-white/50 relative pl-3 before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-1 before:h-1 before:rounded-full before:bg-rust">
                        {r}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex gap-2 flex-wrap mt-4">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[11px] font-light px-3 py-1 rounded-full border border-warm-white/10 text-warm-white/45 tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-start pt-1 ml-8 max-sm:ml-0 max-sm:mt-4">
                <a
                  href={proj.link || '#'}
                  target={proj.link && proj.link !== '#' ? '_blank' : undefined}
                  rel={proj.link && proj.link !== '#' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-light text-warm-white opacity-50 tracking-wide px-4 py-2 border border-warm-white/[0.12] rounded-md hover:opacity-100 hover:border-warm-white/30 transition-all duration-200 whitespace-nowrap"
                  data-cursor="pointer"
                >
                  View Project <ArrowIcon />
                </a>
              </div>
            </div>
          </RevealItem>
        ))}
      </div>
    </section>
  )
}
