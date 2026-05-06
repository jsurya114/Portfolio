import { useEffect, useCallback } from 'react'
import { useCursorTracker } from '../hooks/useAnimations'

export default function CustomCursor() {
  const { dotRef, ringRef } = useCursorTracker()

  const handleEnter = useCallback(() => {
    dotRef.current?.classList.add('expanded')
    ringRef.current?.classList.add('expanded')
  }, [dotRef, ringRef])

  const handleLeave = useCallback(() => {
    dotRef.current?.classList.remove('expanded')
    ringRef.current?.classList.remove('expanded')
  }, [dotRef, ringRef])

  useEffect(() => {
    const isTouch = matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const els = document.querySelectorAll('[data-cursor="pointer"]')
    els.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter)
      el.addEventListener('mouseleave', handleLeave)
    })

    // Re-observe when DOM changes (for reveal animations)
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll('[data-cursor="pointer"]')
      newEls.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
      observer.disconnect()
    }
  }, [handleEnter, handleLeave])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
