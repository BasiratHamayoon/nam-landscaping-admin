"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function AnimatedBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return
    const orbs = containerRef.current.querySelectorAll(".orb")
    
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        scale: "random(0.8, 1.3)",
        duration: "random(6, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.5,
      })
    })
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/10 dark:bg-primary-500/15 blur-3xl" />
      <div className="orb absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-emerald-600/10 dark:bg-emerald-500/10 blur-3xl" />
      <div className="orb absolute top-2/3 left-1/3 w-80 h-80 rounded-full bg-primary-400/10 dark:bg-primary-400/10 blur-3xl" />
    </div>
  )
}

export default AnimatedBackground