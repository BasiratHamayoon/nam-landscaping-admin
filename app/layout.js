import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: 'The Maple Landscaping | Executive Command Suite',
  description: 'Enterprise Landscape & Nursery Operations Control Center - Dubai, UAE',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable} scroll-smooth`}>
      <body
        suppressHydrationWarning
        className="font-sans bg-[#f6f9f7] text-slate-800 antialiased selection:bg-emerald-600 selection:text-white"
        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}