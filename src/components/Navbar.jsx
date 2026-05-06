import { useState } from 'react'

const links = [
  { href: '#services', label: 'What I Do' },
  { href: '#work', label: 'My Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Hire Me' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
    document.body.style.overflow = !menuOpen ? 'hidden' : ''
  }

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-12 py-6 mix-blend-difference max-md:px-6 max-md:py-5" data-cursor="pointer">
        <a href="#" className="font-mono text-sm font-normal tracking-wider text-white opacity-70 hover:opacity-100 transition-opacity duration-300">
          Jayasoorya S
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[13px] font-light tracking-wide text-white opacity-50 hover:opacity-100 transition-opacity duration-300"
              data-cursor="pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-1 bg-transparent border-none cursor-none"
          onClick={toggleMenu}
          aria-label="Open menu"
          data-cursor="pointer"
        >
          <span className={`block w-6 h-[1.5px] bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-x-1 translate-y-[5px]' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-[1.5px] bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 translate-x-1 -translate-y-[5px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-charcoal z-[99] flex flex-col items-center justify-center gap-8 transition-opacity duration-400 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-display text-4xl font-light text-warm-white opacity-70 hover:opacity-100 transition-opacity duration-300"
            onClick={closeMenu}
            data-cursor="pointer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  )
}
