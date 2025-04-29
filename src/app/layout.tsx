import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { cn } from '@/lib/utils';
import '@/utils/dayjsConfig';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TrustRate',
  description: 'Business Review Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/logo-arrows.png" sizes="32x32" />
      </head>
      <body className={cn('min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-50 antialiased', inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}