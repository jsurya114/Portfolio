import { useScrollReveal } from '../hooks/useAnimations'

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

export default function Contact() {
  return (
    <section id="contact" className="bg-charcoal py-28 max-sm:py-20">
      <div className="max-w-[1080px] mx-auto px-6 text-center">
        <RevealItem>
          <h2 className="font-display font-light text-[clamp(36px,5vw,56px)] leading-[1.15] text-warm-white mb-5">
            Ready to build<br />something?
          </h2>
        </RevealItem>
        <RevealItem delay={80}>
          <p className="text-base leading-relaxed text-slate-custom max-w-[500px] mx-auto mb-9">
            Whether you have a clear plan or just a rough idea — reach out. I&apos;ll help you figure out the next step, for free.
          </p>
        </RevealItem>
        <RevealItem delay={160}>
          <div className="flex gap-4 justify-center max-sm:flex-col max-sm:items-center">
            <a
              href="mailto:hello@alex.dev"
              className="inline-flex items-center justify-center font-body text-sm font-medium px-8 py-3.5 rounded-md bg-warm-white text-charcoal border border-warm-white hover:bg-[#e8e6e0] transition-all duration-250 cursor-none tracking-wide"
              data-cursor="pointer"
            >
              Send me an email
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center font-body text-sm font-medium px-8 py-3.5 rounded-md bg-transparent text-warm-white border border-warm-white/25 hover:border-warm-white transition-all duration-250 cursor-none tracking-wide"
              data-cursor="pointer"
            >
              Book a free call
            </a>
          </div>
        </RevealItem>
      </div>
    </section>
  )
}
