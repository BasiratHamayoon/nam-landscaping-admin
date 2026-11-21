'use client';

import React from 'react';

export default function MapleLogo({
  variant = 'horizontal', // 'horizontal' | 'stacked' | 'iconOnly'
  size = 32,
  className = '',
  textClassName = '',
  isDark = true,
}) {
  // Standalone vector emblem
  const MapleIcon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'shrink-0'}
    >
      <defs>
        <linearGradient id="mapleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Decorative Upper Framing Arc */}
      <path
        d="M 18 50 A 35 35 0 0 1 82 50"
        stroke="url(#mapleGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Central Maple Leaf Silhouette */}
      <path
        d="M 50 16 
           C 51 24, 55 27, 60 27 
           C 58 30, 57 33, 62 36 
           C 66 38, 73 35, 78 41 
           C 75 44, 71 45, 74 49 
           C 77 52, 83 51, 84 56 
           C 80 58, 73 57, 70 61 
           C 68 64, 71 70, 68 73 
           C 64 71, 61 65, 57 65 
           C 54 65, 52 70, 50 78 
           C 48 70, 46 65, 43 65 
           C 39 65, 36 71, 32 73 
           C 29 70, 32 64, 30 61 
           C 27 57, 20 58, 16 56 
           C 17 51, 23 52, 26 49 
           C 29 45, 25 44, 22 41 
           C 27 35, 34 38, 38 36 
           C 43 33, 42 30, 40 27 
           C 45 27, 49 24, 50 16 Z"
        fill="url(#mapleGrad)"
      />

      {/* Internal Vein Filigree */}
      <path
        d="M 50 30 L 50 74"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M 50 44 L 66 39"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M 50 44 L 34 39"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M 50 54 L 68 53"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M 50 54 L 32 53"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Lower Base Sprouting Blades & Arc */}
      <path
        d="M 28 80 C 40 76, 60 76, 72 80"
        stroke="url(#goldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 35 86 C 45 83, 55 83, 65 86"
        stroke="url(#mapleGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'iconOnly') {
    return MapleIcon;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
        {MapleIcon}
        <div className={`leading-tight ${textClassName}`}>
          <span
            className={`block text-base font-bold tracking-[0.14em] uppercase ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            The Maple
          </span>
          <span className="block text-[9px] font-semibold text-emerald-500 uppercase tracking-[0.24em] mt-0.5">
            Landscaping LLC
          </span>
        </div>
      </div>
    );
  }

  // Default: 'horizontal'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {MapleIcon}
      <div className={`leading-tight ${textClassName}`}>
        <span
          className={`block text-sm sm:text-base font-bold tracking-[0.12em] uppercase ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          The Maple
        </span>
        <span className="block text-[8.5px] font-bold text-emerald-500 uppercase tracking-[0.22em] mt-0.5">
          Landscaping
        </span>
      </div>
    </div>
  );
}