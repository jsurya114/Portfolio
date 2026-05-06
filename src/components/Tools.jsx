import { useScrollReveal } from '../hooks/useAnimations'

const tools = [
  { name: 'React', desc: 'Builds the interface' },
  { name: 'Node.js', desc: 'Powers the backend' },
  { name: 'Express', desc: 'Fast server framework' },
  { name: 'MongoDB', desc: 'Flexible data storage' },
  { name: 'PostgreSQL', desc: 'Reliable relational data' },
  { name: 'TypeScript', desc: 'Fewer bugs, more confidence' },
  { name: 'JavaScript', desc: 'The language of the web' },
  { name: 'REST API', desc: 'Connects everything together' },
  { name: 'Socket.io', desc: 'Real-time communication' },
  { name: 'AWS', desc: 'Keeps it online, always' },
  { name: 'Docker', desc: 'Runs anywhere, consistently' },
  { name: 'CI/CD Pipeline', desc: 'Ships code safely' },
  { name: 'Git', desc: 'Tracks every change' },
  { name: 'Figma', desc: 'Where design starts' },
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

export default function Tools() {
  return (
    <section id="tools" className="bg-warm-white py-24 max-sm:py-18">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealItem>
          <span className="block font-mono text-xs font-normal tracking-widest uppercase text-rust mb-4">
            Tools I Use
          </span>
        </RevealItem>
        <RevealItem delay={80}>
          <h2 className="font-display font-light text-[clamp(32px,5vw,52px)] leading-[1.15] text-charcoal mb-5">
            The right tool for<br />every job.
          </h2>
        </RevealItem>
        <RevealItem delay={160}>
          <p className="text-base leading-relaxed text-slate-custom max-w-[540px] mb-12">
            You don&apos;t need to know what these are — just know they&apos;re used by Airbnb, Shopify, and Apple.
          </p>
        </RevealItem>

        <div className="flex flex-wrap gap-3">
          {tools.map((tool, i) => (
            <RevealItem key={tool.name} delay={i * 60}>
              <div
                className="flex flex-col gap-0.5 px-6 py-3.5 rounded-[10px] border border-charcoal/[0.08] bg-white transition-all duration-200 hover:border-blue-custom hover:-translate-y-0.5 cursor-none"
                data-cursor="pointer"
              >
                <span className="font-body text-sm font-medium text-charcoal">{tool.name}</span>
                <span className="font-mono text-[11px] font-light text-slate-custom tracking-wide">{tool.desc}</span>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  )
}
