import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { cn } from '@/lib/utils';
import '@/utils/dayjsConfig';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'TrustRate - Platforma Opinii i Feedbacku dla Biznesu',
  description: 'Nowoczesne narzędzie do wymiany opinii i sugestii między firmami. Wspieraj komunikację, zwiększaj zaangażowanie, buduj zaufanie na rynku biznesu.',
  keywords: [
    'TrustRate',
    'opinie biznesowe',
    'feedback',
    'zarządzanie opinią',
    'zaufanie klientów',
    'platforma opinii',
    'customer feedback',
    'business reputation',
    'client reviews',
    'firma',
    'przedsiębiorstwo',
    'marketing',
    'CRM'
  ],
  authors: [{ name: 'TrustRate' }],
  creator: 'TrustRate',
  publisher: 'TrustRate',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://trustrate.com',
    siteName: 'TrustRate',
    title: 'TrustRate - Platforma Opinii i Feedbacku dla Biznesu',
    description: 'Nowoczesne narzędzie do wymiany opinii i sugestii między firmami. Wspieraj komunikację, zwiększaj zaangażowanie, buduj zaufanie na rynku biznesu.',
    images: [
      {
        url: '/assets/logo-white.png',
        width: 500,
        height: 200,
        alt: 'TrustRate - Platforma Opinii i Feedbacku dla Biznesu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrustRate - Platforma Opinii i Feedbacku dla Biznesu',
    description: 'Nowoczesne narzędzie do wymiany opinii i sugestii między firmami. Wspieraj komunikację, zwiększaj zaangażowanie, buduj zaufanie na rynku biznesu.',
    creator: '@trustrate',
    images: ['/assets/logo-white.png'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/icon-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/assets/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#18181b" />
        <meta name="msapplication-TileColor" content="#18181b" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={cn(
        'min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased',
        inter.className
      )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}