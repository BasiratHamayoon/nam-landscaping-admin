'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { loginAdmin } from '@/redux/actions/authActions';
import { selectAuth } from '@/redux/slices/authSlice';
import MapleLogo from '@/components/MapleLogo';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, savedEmail } = useSelector(selectAuth);

  const [email, setEmail] = useState('admin@themaplelandscaping.com');
  const [password, setPassword] = useState('TheMapleDubai#2025');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('maple_admin_remember_email');
      if (stored) {
        setEmail(stored);
        setRememberMe(true);
      } else if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  }, [savedEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await dispatch(loginAdmin({ email, password, rememberMe }));
    if (ok) {
      router.push('/dashboard');
    }
  };

  const handleQuickDemo = async () => {
    setEmail('admin@themaplelandscaping.com');
    setPassword('TheMapleDubai#2025');
    const ok = await dispatch(
      loginAdmin({
        email: 'admin@themaplelandscaping.com',
        password: 'TheMapleDubai#2025',
        rememberMe: true,
      })
    );
    if (ok) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#05140b] flex flex-col lg:flex-row relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[580px] h-[580px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[580px] h-[580px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Brand Side Showcase */}
      <div className="hidden lg:flex lg:w-1/2 relative p-14 xl:p-20 flex-col justify-between border-r border-white/10 bg-gradient-to-br from-[#07190e] via-[#05140b] to-[#030d07]">
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shadow-lg shadow-emerald-950/60">
            <MapleLogo variant="iconOnly" size={30} className="text-emerald-400" />
          </div>
          <div>
            <span
              className="block text-lg font-bold text-white tracking-wider uppercase"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              The Maple Landscaping
            </span>
            <span className="block text-[10px] text-emerald-400 uppercase tracking-[0.24em] font-medium">
              Enterprise Command Suite
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-lg space-y-6"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <Sparkles size={13} /> Dubai&apos;s Premier Landscape ERP
          </span>
          <h1
            className="text-4xl xl:text-5xl font-bold text-white leading-[1.15]"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Command Every Villa Project &amp; Nursery Order in Real Time.
          </h1>
          <p className="text-sm text-emerald-100/70 leading-relaxed font-light">
            Live telemetry for revenue performance across Dubai luxury communities, nursery inventory control, maintenance crew dispatch, and VIP consultation conversion.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                AED 1.8M+
              </p>
              <p className="text-[11px] text-emerald-300/70 mt-1">YTD Tracked Volume</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                18 Zones
              </p>
              <p className="text-[11px] text-emerald-300/70 mt-1">Dubai Communities</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <p
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                99.6%
              </p>
              <p className="text-[11px] text-emerald-300/70 mt-1">SLA Dispatch Rate</p>
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 flex items-center justify-between text-xs text-emerald-200/50">
          <span>&copy; {new Date().getFullYear()} The Maple Landscaping LLC, Dubai UAE</span>
          <span className="flex items-center gap-1.5 text-emerald-400/80">
            <CheckCircle2 size={14} /> Systems 100% Operational
          </span>
        </div>
      </div>

      {/* Login Form Box */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl"
        >
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <MapleLogo variant="iconOnly" size={24} className="text-emerald-400" />
              </div>
              <span
                className="text-base font-bold text-white uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                The Maple Admin
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Sign In to Suite
            </h2>
            <p className="text-xs text-emerald-100/60 mt-1.5">
              Enter authorized administrator credentials or use instant demo access.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-emerald-200/80 uppercase tracking-wider mb-2">
                Administrator Email
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400/70"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@themaplelandscaping.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[11px] font-semibold text-emerald-200/80 uppercase tracking-wider">
                  Security Key / Password
                </label>
                <Link
                  href="/login/forgot-password"
                  className="text-[11px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400/70"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/10 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0"
                />
                <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                  Remember session on this device
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all disabled:opacity-50 group"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : (
                <>
                  <span>Launch Executive Dashboard</span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={handleQuickDemo}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2 transition-all"
            >
              <Sparkles size={14} className="text-emerald-400" />
              <span>One-Click Instant Demo Login</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              256-Bit SSL Encrypted Admin Gateway
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}