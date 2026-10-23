"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function AnimatedBackground() {
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".orb-1", {
        x: 100, y: -60, scale: 1.2,
        duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
      })
      gsap.to(".orb-2", {
        x: -80, y: 100, scale: 1.3,
        duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut",
      })
      gsap.to(".orb-3", {
        x: 60, y: 80, scale: 0.9,
        duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut",
      })
      gsap.to(".leaf", {
        rotation: "+=360",
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    }, bgRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={bgRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb-1 absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-[120px]" />
      <div className="orb-2 absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px]" />
      <div className="orb-3 absolute top-1/2 left-1/2 w-80 h-80 bg-teal-500/25 rounded-full blur-[100px]" />
      
      <svg className="leaf absolute top-20 right-32 w-24 h-24 text-primary-500/10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C12 2 6 8 6 14C6 18.5 8.5 22 12 22C15.5 22 18 18.5 18 14C18 8 12 2 12 2Z" />
      </svg>
      <svg className="leaf absolute bottom-32 left-20 w-20 h-20 text-primary-500/10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C12 2 6 8 6 14C6 18.5 8.5 22 12 22C15.5 22 18 18.5 18 14C18 8 12 2 12 2Z" />
      </svg>
    </div>
  )
}