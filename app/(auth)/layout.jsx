import { AnimatedBackground } from "@/components/auth/AnimatedBackground"

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden p-4">
      <AnimatedBackground />
      {children}
    </div>
  )
}