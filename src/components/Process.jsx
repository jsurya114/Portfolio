import { useScrollReveal } from '../hooks/useAnimations'

const steps = [
  {
    num: '01',
    title: 'We Talk',
    desc: "Tell me what you're trying to build. No tech jargon, just a real conversation about your goal. I'll listen, ask the right questions, and figure out the best path forward.",
    active: true,
  },
  {
    num: '02',
    title: 'I Plan It',
    desc: "I'll map out what needs to be built, how long it takes, and what it costs — before we agree to anything. No hidden fees, no scope creep, no surprises halfway through.",
  },
  {
    num: '03',
    title: 'I Build It',
    desc: "I design and develop your product. You'll see progress along the way and can give feedback at any point. Think of it less like a black box and more like an open kitchen.",
  },
  {
    num: '04',
    title: 'We Launch',
    desc: "Your product goes live. I stay available to fix anything and make sure everything runs smoothly. The relationship doesn't end at launch — it starts there.",
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

export default function Process() {
  return (
    <section id="process" className="bg-charcoal py-24 max-sm:py-18">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealItem>
          <span className="block font-mono text-xs font-normal tracking-widest uppercase text-rust mb-4">
            How It Works
          </span>
        </RevealItem>
        <RevealItem delay={80}>
          <h2 className="font-display font-light text-[clamp(32px,5vw,52px)] leading-[1.15] text-warm-white mb-5">
            Simple, honest,<br />no surprises.
          </h2>
        </RevealItem>

        <div className="grid grid-cols-4 mt-3 max-[900px]:grid-cols-2 max-sm:grid-cols-1">
          {steps.map((step, i) => (
            <RevealItem key={step.num} delay={i * 80}>
              <div className={`py-7 px-6 border-l-2 ${step.active ? 'border-l-rust' : 'border-l-warm-white/[0.08]'}`}>
                <span className="block font-mono text-xs font-light text-rust tracking-wider mb-3">
                  {step.num}
                </span>
                <h3 className="font-display text-2xl font-light text-warm-white mb-2.5">
                  {step.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-warm-white/50">
                  {step.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  )
}
