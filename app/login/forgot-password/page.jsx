'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, KeyRound, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { sendResetLink } from '@/redux/actions/authActions';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('admin@royalplantscape.ae');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(sendResetLink(email));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#07150d] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative z-10"
      >
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-emerald-300 mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Sign In
        </Link>

        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-5">
          <KeyRound size={22} className="text-emerald-400" />
        </div>

        <h1
          className="text-2xl sm:text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Account Recovery
        </h1>
        <p className="text-xs text-emerald-100/60 leading-relaxed mb-6">
          Enter your administrator email address and we\'ll send an encrypted password reset link.
        </p>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto">
              <Send size={20} className="text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Recovery Link Dispatched</h3>
              <p className="text-xs text-emerald-200/70 mt-1">
                Instructions have been sent to <span className="text-white font-semibold">{email}</span>
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/login/reset-password"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all"
              >
                <span>Simulate Clicking Email Reset Link</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-emerald-200/80 uppercase tracking-wider mb-2">
                Registered Admin Email
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Sending Recovery Link...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}