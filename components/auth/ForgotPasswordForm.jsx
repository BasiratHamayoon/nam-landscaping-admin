"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Mail, ArrowLeft, Send, KeyRound } from "lucide-react"
import gsap from "gsap"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { forgotPassword } from "@/store/slices/authSlice"

export function ForgotPasswordForm() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fp-element", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" })
    }, formRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await dispatch(forgotPassword(email)).unwrap()
      toast.success("Reset link sent to your email!")
      setSent(true)
    } catch (err) {
      toast.error(err || "Failed to send reset link")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      ref={formRef}
      className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
    >
      <div className="fp-element flex flex-col items-center text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center mb-5 shadow-lg shadow-primary-600/40">
          <KeyRound className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
          Forgot Password?
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      {sent ? (
        <div className="fp-element text-center py-6">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Check Your Inbox!</h3>
          <p className="text-sm text-muted-foreground mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <Link href="/login">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="fp-element">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@namlandscaping.ae"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11"
                required
              />
            </div>
          </div>

          <div className="fp-element space-y-3 pt-2">
            <Button type="submit" loading={loading} className="w-full" size="lg">
              <Send className="w-4 h-4" />
              Send Reset Link
            </Button>
            <Link href="/login" className="block">
              <Button variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Button>
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}