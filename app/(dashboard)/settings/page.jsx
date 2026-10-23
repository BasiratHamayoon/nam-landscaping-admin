"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ProfileForm } from "@/components/settings/ProfileForm"
import { PasswordForm } from "@/components/settings/PasswordForm"
import { SiteSettingsForm } from "@/components/settings/SiteSettingsForm"

export default function SettingsPage() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".setting-card", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account and site configuration</p>
      </div>

      <div className="setting-card">
        <ProfileForm />
      </div>
      <div className="setting-card">
        <PasswordForm />
      </div>
      <div className="setting-card">
        <SiteSettingsForm />
      </div>
    </div>
  )
}