import { useEffect } from "react"

export function ParallaxBackground() {
  useEffect(() => {
    let ticking = false

    const updateParallax = () => {
      const scrollY = window.scrollY
      
      const slowSpeed = scrollY * 0.15
      const mediumSpeed = scrollY * 0.25
      const fastSpeed = scrollY * 0.4
      const gridSpeed = scrollY * 0.1

      const bodyAfter = document.querySelector('body') as HTMLElement
      if (bodyAfter) {
        bodyAfter.style.setProperty('--parallax-slow', `${slowSpeed}px`)
        bodyAfter.style.setProperty('--parallax-medium', `${mediumSpeed}px`)
        bodyAfter.style.setProperty('--parallax-fast', `${fastSpeed}px`)
        bodyAfter.style.setProperty('--parallax-grid', `${gridSpeed}px`)
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateParallax()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null
}
