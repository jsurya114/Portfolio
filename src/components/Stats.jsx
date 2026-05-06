import { useScrollReveal, useCountUp } from '../hooks/useAnimations'

function StatItem({ target, label, showPlus = false }) {
  const [ref, isVisible] = useScrollReveal(0.3)
  const value = useCountUp(target, 1800, isVisible)

  return (
    <div
      ref={ref}
      className={`flex-1 text-center px-8 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
    >
      <span className="font-display text-5xl font-light text-warm-white">{value}</span>
      {showPlus && <span className="font-display text-4xl font-light text-rust">+</span>}
      <span className="block mt-1.5 font-mono text-xs font-light tracking-wider text-slate-custom">
        {label}
      </span>
    </div>
  )
}

export default function Stats() {
  return (
    <section id="stats" className="bg-charcoal py-14 px-12 max-sm:px-6 max-sm:py-10">
      <div className="max-w-[900px] mx-auto flex items-center justify-center max-sm:flex-col max-sm:gap-8">
        <StatItem target={5} label="Projects Delivered" showPlus />
        <div className="w-px h-[60px] bg-warm-white/[0.08] max-sm:w-[60px] max-sm:h-px" />
        <StatItem target={3} label="Happy Clients" showPlus />
        <div className="w-px h-[60px] bg-warm-white/[0.08] max-sm:w-[60px] max-sm:h-px" />
        <StatItem target={2} label="Years Experience" />
      </div>
    </section>
  )
}
