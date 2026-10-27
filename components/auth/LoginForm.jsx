"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { Mail, Lock, Eye, EyeOff, LogIn, Leaf, Sparkles, ShieldCheck } from "lucide-react"
import gsap from "gsap"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { loginAdmin, clearError } from "@/store/slices/authSlice"

export function LoginForm() {
  const dispatch = useDispatch()
  const router = useRouter()

  const { actionLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  )

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const formRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".login-element", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      })
    }, formRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (actionLoading) return

    const result = await dispatch(loginAdmin(formData))
    if (loginAdmin.fulfilled.match(result)) {
      toast.success("Welcome back!")
    }
  }

  return (
    <div
      ref={formRef}
      className="w-full max-w-md bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-10 shadow-2xl relative z-10"
    >
      <div className="login-element flex flex-col items-center text-center mb-8">
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-700 flex items-center justify-center shadow-xl shadow-primary-600/40 rotate-6">
            <Leaf className="w-8 h-8 text-white -rotate-6" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400" />
        </div>

        <h1 className="font-heading text-3xl md:text-4xl text-foreground mb-2">
          Welcome <span className="italic text-primary-600 dark:text-primary-400">Back</span>
        </h1>

        <p className="text-sm text-muted-foreground">
          Sign in to NAM Landscaping Admin Panel
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="login-element">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="admin@namlandscaping.ae"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-11"
              required
            />
          </div>
        </div>

        <div className="login-element">
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="password" className="mb-0">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline font-semibold"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-11 pr-11"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="login-element pt-2">
          <Button
            type="submit"
            loading={actionLoading}
            disabled={actionLoading}
            className="w-full"
            size="lg"
          >
            <LogIn className="w-4 h-4" />
            Sign In to Dashboard
          </Button>
        </div>
      </form>

      <p className="login-element text-xs text-center text-muted-foreground mt-8 flex items-center justify-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-primary-500" />
        Secured by JWT & bcrypt encryption
      </p>
    </div>
  )
}