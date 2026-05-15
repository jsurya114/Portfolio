import { useState } from 'react'
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
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true)
      setSubmitting(false)
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => {
        setSubmitted(false)
        setShowForm(false)
      }, 3000)
    }, 1000)
  }

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
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center justify-center font-body text-sm font-medium px-8 py-3.5 rounded-md hover:opacity-80 transition-all duration-250 cursor-none tracking-wide"
              style={{ backgroundColor: '#f5f3ee', color: '#0a0a0a', border: '1px solid #f5f3ee' }}
              data-cursor="pointer"
            >
              {showForm ? 'Cancel' : 'Send me an email'}
            </button>
          </div>
        </RevealItem>

        {showForm && (
          <RevealItem delay={0}>
            <div className="max-w-[600px] mx-auto mt-12 bg-card-bg border border-warm-white/[0.06] rounded-xl p-8 text-left">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#2ecc71]/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-light text-warm-white mb-2">Message sent!</h3>
                  <p className="text-sm text-slate-custom">I'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display text-xl font-light text-warm-white mb-6">Send me a message</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4 max-sm:grid-cols-1">
                    <div>
                      <label className="block font-mono text-[11px] font-normal text-slate-custom tracking-wider uppercase mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-charcoal border border-warm-white/[0.08] rounded-lg px-4 py-3 text-sm text-warm-white placeholder-warm-white/20 font-body focus:outline-none focus:border-rust/50 transition-colors duration-200 cursor-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] font-normal text-slate-custom tracking-wider uppercase mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-charcoal border border-warm-white/[0.08] rounded-lg px-4 py-3 text-sm text-warm-white placeholder-warm-white/20 font-body focus:outline-none focus:border-rust/50 transition-colors duration-200 cursor-none"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block font-mono text-[11px] font-normal text-slate-custom tracking-wider uppercase mb-2">
                      Message *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can I help you?"
                      rows={4}
                      className="w-full bg-charcoal border border-warm-white/[0.08] rounded-lg px-4 py-3 text-sm text-warm-white placeholder-warm-white/20 font-body focus:outline-none focus:border-rust/50 transition-colors duration-200 resize-none cursor-none"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-rust mb-4">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center font-body text-sm font-medium px-8 py-3.5 rounded-md bg-[#f5f3ee] text-[#0a0a0a] border border-[#f5f3ee] hover:bg-[#e8e6e0] transition-all duration-250 cursor-none tracking-wide disabled:opacity-50"
                    data-cursor="pointer"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </RevealItem>
        )}
      </div>
    </section>
  )
}
