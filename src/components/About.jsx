import { useScrollReveal } from '../hooks/useAnimations'

const facts = [
  { label: 'Based In', value: 'Kottayam, Kerala' },
  { label: 'Experience', value: '2 Years' },
  { label: 'Response Time', value: 'Within 24 hrs' },
  { label: 'Languages', value: 'English' },
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

export default function About() {
  return (
    <section id="about" className="bg-warm-white py-24 max-md:py-18">
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="grid grid-cols-[1fr_1.4fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-10">
          {/* Photo */}
          <RevealItem>
            <div className="w-full aspect-[3/4] rounded-2xl flex items-center justify-center overflow-hidden max-md:max-w-[280px]"
              style={{ background: 'linear-gradient(145deg, #1a1612, #2a2420)' }}
            >
              <span className="font-display text-7xl font-light text-warm-white/[0.12] tracking-wider">
                JS
              </span>
            </div>
          </RevealItem>

          {/* Content */}
          <div>
            <RevealItem>
              <span className="block font-mono text-xs font-normal tracking-widest uppercase text-rust mb-4">
                About
              </span>
            </RevealItem>
            <RevealItem delay={80}>
              <h2 className="font-display font-light text-[clamp(32px,5vw,52px)] leading-[1.15] text-charcoal mb-5">
                A developer who<br />keeps it simple.
              </h2>
            </RevealItem>
            <RevealItem delay={160}>
              <p className="text-[15px] leading-[1.75] text-slate-custom mb-4">
                I&apos;m Jayasoorya — a software developer based in Kottayam, Kerala. I&apos;ve spent the last two years building digital products for startups, agencies, and small businesses. I care about clean code, but I care more about whether the thing I build actually helps you.
              </p>
            </RevealItem>
            <RevealItem delay={240}>
              <p className="text-[15px] leading-[1.75] text-slate-custom mb-4">
                I communicate like a normal person. I send updates without being asked. I give honest timelines. And if something isn&apos;t worth building, I&apos;ll tell you — even if it means less work for me.
              </p>
            </RevealItem>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {facts.map((fact, i) => (
                <RevealItem key={fact.label} delay={280 + i * 60}>
                  <div className="bg-charcoal/[0.03] rounded-[10px] px-5 py-4">
                    <span className="block font-mono text-[11px] font-normal text-slate-custom tracking-wider uppercase mb-1">
                      {fact.label}
                    </span>
                    <span className="font-body text-sm font-medium text-charcoal">
                      {fact.value}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
