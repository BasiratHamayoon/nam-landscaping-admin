'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Leaf
} from 'lucide-react';
import { loginSuccess } from '@/redux/slices/authSlice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('admin@maplelandscaping.ae');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentYear, setCurrentYear] = useState('2025');

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      if (email === 'admin@maplelandscaping.ae' && password === 'admin123') {
        dispatch(
          loginSuccess({
            id: 'admin-01',
            name: 'Hamayoon Basirat',
            email: 'admin@maplelandscaping.ae',
            role: 'Super Administrator',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80'
          })
        );
        router.push('/dashboard');
      } else {
        setIsLoading(false);
        setErrorMessage('Invalid administrator credentials. Please check your email and password.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#07190e] flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Brand */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Leaf className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-medium text-white tracking-wide">
              The Maple Landscaping
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-emerald-400/80 font-semibold">
              Enterprise Admin Portal
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-emerald-200/70">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>256-Bit Encrypted Security</span>
        </div>
      </div>

      {/* Center Login Form */}
      <div className="relative z-10 max-w-md w-full mx-auto my-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-serif font-medium text-white">
            Welcome Back
          </h2>
          <p className="text-sm text-emerald-100/60">
            Sign in to access corporate orders, contract approvals, and system controls.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-200/80">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-200/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@maplelandscaping.ae"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:border-emerald-400 text-sm text-white placeholder-white/30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-emerald-200/80">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-200/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 focus:outline-none focus:border-emerald-400 text-sm text-white placeholder-white/30"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#07190e] font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-pulse">Authenticating...</span>
            ) : (
              <>
                Sign In to Admin Portal
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/50 pt-6 border-t border-white/10">
        <span>&copy; {currentYear} The Maple Landscaping LLC, Dubai UAE</span>
        <span className="flex items-center gap-1.5 text-emerald-400/80">
          <CheckCircle2 size={14} /> Systems 100% Operational
        </span>
      </div>
    </div>
  );
}