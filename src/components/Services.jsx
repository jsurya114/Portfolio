import { useScrollReveal } from '../hooks/useAnimations'

const services = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    name: 'Websites That Win Clients',
    desc: 'Your website is where first impressions happen. I build fast, beautiful sites that make visitors want to stick around — and eventually reach out.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
    name: 'Apps Your Team Will Love',
    desc: 'Internal tools, customer dashboards, mobile apps — if your team or your customers need to interact with it daily, it has to feel effortless.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
    name: 'Online Stores That Sell',
    desc: 'A good online store doesn\'t just list products — it guides people to the checkout. I build e-commerce experiences that are smooth and conversion-focused.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    name: 'Fixes & Speed Improvements',
    desc: "Already have something built that's slow, broken, or just not quite right? I'll dig in, figure out what's wrong, and fix it — usually faster than you'd expect.",
  },
]

function RevealItem({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useScrollReveal()
  return (
    <div
      ref={ref}
      className={`transition-all duration-600 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default function Services() {
  return (
    <section id="services" className="bg-warm-white py-24 max-sm:py-18">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealItem>
          <span className="block font-mono text-xs font-normal tracking-widest uppercase text-rust mb-4">
            What I Do
          </span>
        </RevealItem>
        <RevealItem delay={80}>
          <h2 className="font-display font-light text-[clamp(32px,5vw,52px)] leading-[1.15] text-charcoal mb-5">
            Solutions that make a<br />real difference.
          </h2>
        </RevealItem>
        <RevealItem delay={160}>
          <p className="text-base leading-relaxed text-slate-custom max-w-[540px] mb-12">
            Every project I take on starts with a conversation — not a quote. I want to understand what you&apos;re trying to achieve, and then I&apos;ll tell you honestly how I can help.
          </p>
        </RevealItem>

        <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
          {services.map((svc, i) => (
            <RevealItem key={svc.name} delay={i * 80}>
              <div
                className="bg-white border border-charcoal/[0.06] rounded-xl p-9 transition-all duration-200 hover:-translate-y-[3px] hover:border-blue-custom hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-none"
                data-cursor="pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-custom/10 text-blue-custom flex items-center justify-center mb-5">
                  {svc.icon}
                </div>
                <h3 className="font-body text-lg font-medium text-charcoal mb-2.5">{svc.name}</h3>
                <p className="text-sm leading-relaxed text-slate-custom">{svc.desc}</p>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  )
}
