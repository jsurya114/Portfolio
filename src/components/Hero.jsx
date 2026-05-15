import { useEffect, useRef } from 'react'

export default function Hero() {
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)

  useEffect(() => {
    const isTouch = matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const onScroll = () => {
      const y = window.scrollY
      const f1 = y * 0.08
      const f2 = y * 0.05
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${-f1}px, ${-f1 * 0.6}px)`
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${f2}px, ${-f2 * 0.4}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center bg-warm-white overflow-hidden">
      {/* Parallax Orbs */}
      <div
        ref={orb1Ref}
        className="absolute w-[500px] h-[500px] -top-[10%] -right-[5%] rounded-full blur-[100px] pointer-events-none will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(196,81,42,0.12) 0%, transparent 70%)' }}
      />
      <div
        ref={orb2Ref}
        className="absolute w-[400px] h-[400px] -bottom-[5%] -left-[8%] rounded-full blur-[100px] pointer-events-none will-change-transform"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)' }}
      />

      {/* Vertical Rules */}
      <div className="absolute top-[10%] h-[80%] w-px bg-charcoal/[0.06] left-12 max-sm:hidden" />
      <div className="absolute top-[10%] h-[80%] w-px bg-charcoal/[0.06] right-12 max-sm:hidden" />

      {/* Content */}
      <div className="text-center max-w-[740px] px-6 relative z-2">
        {/* Badge */}
        <div className="hero-anim-badge inline-flex items-center gap-2 mb-10">
          <span className="w-2 h-2 bg-[#2ecc71] rounded-full badge-dot" />
          <span className="font-mono text-xs font-light tracking-wider text-slate-custom">
            Available for new projects
          </span>
        </div>

        {/* Headline */}
        <h1 className="mb-7">
          <span className="hero-anim-line1 block font-display font-light text-[clamp(42px,7vw,82px)] leading-[1.1] text-charcoal">
            I build things
          </span>
          <span className="hero-anim-line2 block font-display font-light text-[clamp(42px,7vw,82px)] leading-[1.1] italic text-rust">
            people actually
          </span>
          <span className="hero-anim-line3 block font-display font-light text-[clamp(42px,7vw,82px)] leading-[1.1] text-charcoal">
            love using.
          </span>
        </h1>

        {/* Subtext */}
        <p className="hero-anim-sub text-base leading-relaxed text-slate-custom max-w-[520px] mx-auto mb-9">
          I&apos;m a software developer with two years of experience turning ideas into digital products. I work with startups, small businesses, and established companies to build things that look great and actually work.
        </p>

        {/* Buttons */}
        <div className="hero-anim-buttons flex gap-4 justify-center max-sm:flex-col max-sm:items-center">
          <a
            href="#work"
            className="inline-flex items-center justify-center font-body text-sm font-medium px-8 py-3.5 rounded-md hover:opacity-80 transition-all duration-250 cursor-none tracking-wide"
            style={{ backgroundColor: '#0a0a0a', color: '#f5f3ee', border: '1px solid #0a0a0a' }}
            data-cursor="pointer"
          >
            See My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center font-body text-sm font-medium px-8 py-3.5 rounded-md hover:opacity-80 transition-all duration-250 cursor-none tracking-wide"
            style={{ backgroundColor: 'transparent', color: '#0a0a0a', border: '1px solid rgba(10,10,10,0.2)' }}
            data-cursor="pointer"
          >
            Get in Touch
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 font-body text-sm font-medium px-8 py-3.5 rounded-md hover:opacity-80 transition-all duration-250 cursor-none tracking-wide"
            style={{ backgroundColor: 'transparent', color: '#0a0a0a', border: '1px solid rgba(10,10,10,0.2)' }}
            data-cursor="pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-anim-scroll absolute bottom-10 flex flex-col items-center gap-2">
        <span className="font-mono text-[11px] tracking-widest text-slate-custom uppercase">
          Scroll
        </span>
        <span className="w-px h-10 relative overflow-hidden bg-slate-custom/20 scroll-line-anim" />
      </div>
    </section>
  )
}
