import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { cn } from '@/lib/utils';
import '@/utils/dayjsConfig';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TrustRate',
  description: 'Platforma wymiany informacji zwrotnych od klientów o Twojej firmie. Zbuduj zaufanie, zarówno wśród klientów, jak i wśród Twoich pracowników.'
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
      <body className={cn(
        'min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased',
        inter.className
      )}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}