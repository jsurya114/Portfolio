import { useState, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useAnimations'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001'

function Star({ filled, hovered, onClick, onHover }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onHover}
      className="cursor-none p-0.5 transition-colors duration-150"
      data-cursor="pointer"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={filled || hovered ? '#c9a96e' : 'none'}
        stroke={filled || hovered ? '#c9a96e' : '#8a9ba8'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  )
}

function StarDisplay({ rating, size = 16 }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={s <= rating ? '#c9a96e' : 'none'}
          stroke={s <= rating ? '#c9a96e' : 'rgba(245,243,238,0.15)'}
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

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

function TestimonialCard({ testimonial, index }) {
  const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000)
    if (seconds < 60) return 'Just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <RevealItem delay={index * 80}>
      <div className="bg-card-bg border border-warm-white/[0.06] rounded-xl p-7 transition-all duration-200 hover:border-warm-white/[0.12] group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rust/20 flex items-center justify-center shrink-0">
              <span className="font-display text-base font-light text-rust">
                {testimonial.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-body text-sm font-medium text-warm-white">{testimonial.name}</p>
              {testimonial.role && (
                <p className="font-mono text-[11px] font-light text-slate-custom tracking-wide">{testimonial.role}</p>
              )}
            </div>
          </div>
          <span className="font-mono text-[10px] font-light text-warm-white/25 tracking-wide whitespace-nowrap">
            {timeAgo(testimonial.createdAt)}
          </span>
        </div>
        <StarDisplay rating={testimonial.rating} />
        <p className="text-sm leading-relaxed text-warm-white/55 mt-3">
          &ldquo;{testimonial.message}&rdquo;
        </p>
      </div>
    </RevealItem>
  )
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([])
  const [meta, setMeta] = useState({ total: 0, averageRating: 0 })
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [message, setMessage] = useState('')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/api/testimonials`)
      const data = await res.json()
      if (data.success) {
        setTestimonials(data.data)
        setMeta(data.meta)
      }
    } catch {
      // API unavailable — show empty state
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim() || !message.trim() || !rating) {
      setError('Please fill in your name, a message, and select a rating.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/api/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), role: role.trim(), message: message.trim(), rating }),
      })
      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
        setName('')
        setRole('')
        setMessage('')
        setRating(0)
        fetchTestimonials()
        setTimeout(() => {
          setSubmitted(false)
          setShowForm(false)
        }, 3000)
      } else {
        setError(data.error || 'Something went wrong.')
      }
    } catch {
      setError('Could not connect to server. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="testimonials" className="bg-charcoal py-24 max-sm:py-18">
      <div className="max-w-[1080px] mx-auto px-6">
        <RevealItem>
          <span className="block font-mono text-xs font-normal tracking-widest uppercase text-rust mb-4">
            Testimonials
          </span>
        </RevealItem>
        <RevealItem delay={80}>
          <h2 className="font-display font-light text-[clamp(32px,5vw,52px)] leading-[1.15] text-warm-white mb-5">
            What clients say<br />about working with me.
          </h2>
        </RevealItem>

        {/* Stats + CTA Row */}
        <RevealItem delay={160}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div className="flex items-center gap-6">
              {meta.total > 0 && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-3xl font-light text-gold">{meta.averageRating}</span>
                    <StarDisplay rating={Math.round(meta.averageRating)} size={14} />
                  </div>
                  <span className="font-mono text-xs font-light text-warm-white/30 tracking-wide">
                    {meta.total} review{meta.total !== 1 ? 's' : ''}
                  </span>
                </>
              )}
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center justify-center font-body text-sm font-medium px-6 py-3 rounded-md bg-rust text-warm-white border border-rust hover:bg-rust/90 transition-all duration-250 cursor-none tracking-wide"
              data-cursor="pointer"
            >
              {showForm ? 'Cancel' : 'Leave a Review'}
            </button>
          </div>
        </RevealItem>

        {/* Submit Form */}
        {showForm && (
          <RevealItem>
            <div className="bg-card-bg border border-warm-white/[0.06] rounded-xl p-8 mb-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#2ecc71]/10 flex items-center justify-center mx-auto mb-4">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-light text-warm-white mb-2">Thank you!</h3>
                  <p className="text-sm text-slate-custom">Your review has been submitted.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className="font-display text-xl font-light text-warm-white mb-6">Share your experience</h3>

                  <div className="grid grid-cols-2 gap-4 mb-4 max-sm:grid-cols-1">
                    <div>
                      <label className="block font-mono text-[11px] font-normal text-slate-custom tracking-wider uppercase mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        maxLength={80}
                        className="w-full bg-charcoal border border-warm-white/[0.08] rounded-lg px-4 py-3 text-sm text-warm-white placeholder-warm-white/20 font-body focus:outline-none focus:border-rust/50 transition-colors duration-200 cursor-none"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[11px] font-normal text-slate-custom tracking-wider uppercase mb-2">
                        Your Role
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="CEO at Company"
                        maxLength={100}
                        className="w-full bg-charcoal border border-warm-white/[0.08] rounded-lg px-4 py-3 text-sm text-warm-white placeholder-warm-white/20 font-body focus:outline-none focus:border-rust/50 transition-colors duration-200 cursor-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block font-mono text-[11px] font-normal text-slate-custom tracking-wider uppercase mb-2">
                      Your Review *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell others about your experience working with me..."
                      rows={4}
                      maxLength={500}
                      className="w-full bg-charcoal border border-warm-white/[0.08] rounded-lg px-4 py-3 text-sm text-warm-white placeholder-warm-white/20 font-body focus:outline-none focus:border-rust/50 transition-colors duration-200 resize-none cursor-none"
                    />
                    <span className="block text-right font-mono text-[10px] text-warm-white/20 mt-1">
                      {message.length}/500
                    </span>
                  </div>

                  <div className="mb-6">
                    <label className="block font-mono text-[11px] font-normal text-slate-custom tracking-wider uppercase mb-2">
                      Rating *
                    </label>
                    <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          filled={s <= rating}
                          hovered={s <= hoverRating}
                          onClick={() => setRating(s)}
                          onHover={() => setHoverRating(s)}
                        />
                      ))}
                      {rating > 0 && (
                        <span className="font-mono text-xs text-gold ml-2 self-center">
                          {rating}/5
                        </span>
                      )}
                    </div>
                  </div>

                  {error && (
                    <p className="text-sm text-rust mb-4">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center font-body text-sm font-medium px-8 py-3.5 rounded-md bg-warm-white text-charcoal border border-warm-white hover:bg-[#e8e6e0] transition-all duration-250 cursor-none tracking-wide disabled:opacity-50"
                    data-cursor="pointer"
                  >
                    {submitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              )}
            </div>
          </RevealItem>
        )}

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-2 border-warm-white/10 border-t-rust rounded-full animate-spin mx-auto" />
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t._id} testimonial={t} index={i} />
            ))}
          </div>
        ) : (
          <RevealItem>
            <div className="text-center py-16 border border-dashed border-warm-white/[0.06] rounded-xl">
              <p className="font-display text-2xl font-light text-warm-white/30 mb-2">No reviews yet</p>
              <p className="text-sm text-warm-white/20">Be the first to leave a review!</p>
            </div>
          </RevealItem>
        )}
      </div>
    </section>
  )
}
