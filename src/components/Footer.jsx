export default function Footer() {
  return (
    <footer className="bg-charcoal px-12 py-6 border-t border-warm-white/[0.05]">
      <p className="font-mono text-xs font-light text-warm-white/30 text-center tracking-wide">
        Jayasoorya S &copy; {new Date().getFullYear()} — Made with care.
      </p>
    </footer>
  )
}
