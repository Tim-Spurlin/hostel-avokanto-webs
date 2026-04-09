import { useEffect, useRef } from 'react'

export function BackgroundInteractor() {
  const activeRef = useRef(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!activeRef.current) return
      
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      
      document.documentElement.style.setProperty('--mouse-x', `${x}%`)
      document.documentElement.style.setProperty('--mouse-y', `${y}%`)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('.card-hover-effect') ||
        target.closest('.pattern-ripple')
      ) {
        activeRef.current = true
        document.body.classList.add('pattern-hover-active')
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const relatedTarget = e.relatedTarget as HTMLElement
      
      if (
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('.card-hover-effect') ||
        target.closest('.pattern-ripple')
      ) {
        if (
          !relatedTarget ||
          (
            relatedTarget.tagName !== 'BUTTON' &&
            !relatedTarget.closest('button') &&
            !relatedTarget.closest('.card-hover-effect') &&
            !relatedTarget.closest('.pattern-ripple')
          )
        ) {
          activeRef.current = false
          document.body.classList.remove('pattern-hover-active')
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.body.classList.remove('pattern-hover-active')
    }
  }, [])

  return null
}
