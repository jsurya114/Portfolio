import { useState } from 'react'

const links = [
  { href: '#services', label: 'What I Do' },
  { href: '#work', label: 'My Work' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact Me' },
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
      <nav className={`fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-12 py-6 max-md:px-6 max-md:py-5 transition-all duration-300 ${!menuOpen ? 'mix-blend-difference' : ''}`} data-cursor="pointer">
        <a 
          href="#" 
          className="group relative flex items-center justify-center w-11 h-11"
          style={{ color: '#fff' }}
        >
          {/* Outer Ring */}
          <span className="absolute inset-0 border border-white/20 rounded-full group-hover:scale-[1.15] group-hover:border-white/40 transition-all duration-500 ease-out" />
          {/* Initials */}
          <span className="font-display text-2xl font-light italic tracking-tighter pr-1">
            JS
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[13px] font-light tracking-wide opacity-50 hover:opacity-100 transition-opacity duration-300"
              style={{ color: '#fff' }}
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
      <div 
        className={`fixed inset-0 z-[99] flex flex-col items-center justify-center gap-8 transition-opacity duration-400 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: '#0a0a0a' }}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-display text-4xl font-light opacity-70 hover:opacity-100 transition-opacity duration-300"
            style={{ color: '#f5f3ee' }}
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
