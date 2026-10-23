"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import Link from "next/link"
import gsap from "gsap"
import toast from "react-hot-toast"
import { Lock, Eye, EyeOff, CheckCircle2, ArrowLeft, KeyRound } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Card } from "@/components/ui/Card"
import AnimatedBackground from "@/components/auth/AnimatedBackground"
import { resetPassword } from "@/store/slices/authSlice"

export default function ResetPasswordTokenPage() {
  const { token } = useParams()
  const router = useRouter()
  const dispatch = useDispatch()

  const cardRef = useRef(null)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    )
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long")
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match")
    }

    setLoading(true)
    try {
      await dispatch(resetPassword({ token, password })).unwrap()
      toast.success("Password reset successfully!")
      setIsSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 2500)
    } catch (err) {
      toast.error(err || "Failed to reset password. Link may be expired.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 bg-[#f8f9fa] dark:bg-[#0a0f0c] overflow-hidden">
      <AnimatedBackground />

      <div ref={cardRef} className="w-full max-w-md relative z-10">
        <Card className="p-8 shadow-2xl border-primary-100 dark:border-white/10 bg-white/90 dark:bg-[#141a16]/90 backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center mx-auto mb-4 border border-primary-200 dark:border-primary-500/20">
              <KeyRound className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-primary-900 dark:text-white">
              Set New Password
            </h1>
            <p className="text-sm text-primary-500 dark:text-primary-400 mt-1">
              Please enter and confirm your new security password.
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm text-primary-700 dark:text-primary-200 font-medium">
                Your password has been updated. Redirecting to login page...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-primary-400 hover:text-primary-600 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full h-11 text-base font-semibold shadow-lg shadow-primary-600/20 mt-2"
              >
                Reset Password
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Login
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </main>
  )
}