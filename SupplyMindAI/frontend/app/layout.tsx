import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';

import { Providers } from './providers';
import '@/styles/globals.css';

// ─── Fonts ───────────────────────────────────────────────────────────────────

const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN',
  description:
    'AI-Powered Enterprise Procurement Intelligence — manage procurement, inventory, logistics, and vendors in one unified platform.',
  keywords: ['procurement', 'inventory', 'logistics', 'supply chain', 'AI', 'enterprise', 'SaaS'],
  authors: [{ name: 'AUTONOMOUS PROCUREMENT AND LOGISTICS BRAIN' }],
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#09090B' },
    { media: '(prefers-color-scheme: dark)', color: '#09090B' },
  ],
};

// ─── Root Layout ─────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
      style={
        {
          '--font-inter': inter.variable,
          '--font-mono': geistMono.variable,
        } as React.CSSProperties
      }
    >
      <body
        className={`${inter.variable} ${geistMono.variable} min-h-screen bg-[#09090B] font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Toaster
              position="bottom-right"
              theme="dark"
              richColors
              closeButton
              toastOptions={{
                style: {
                  background: '#111827',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#F9FAFB',
                },
              }}
            />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
