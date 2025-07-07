'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const navigationLinks = [
  {
    href: '/features',
    label: 'Funkcje',
    description: 'Poznaj możliwości platformy'
  },
  {
    href: '/about',
    label: 'O nas',
    description: 'Historia i misja TrustRate'
  },
  {
    href: '/faq',
    label: 'FAQ',
    description: 'Często zadawane pytania'
  },
  {
    href: '/contact',
    label: 'Kontakt',
    description: 'Skontaktuj się z nami'
  }
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo-dark.png"
              alt="TrustRate"
              width={140}
              height={40}
              className="dark:hidden"
            />
            <Image
              src="/assets/logo-white.png"
              alt="TrustRate"
              width={140}
              height={40}
              className="hidden dark:block"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login">
              <Button className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                Rozpocznij za darmo
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-zinc-200 dark:border-zinc-800">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div>
                    <div className="font-medium">{link.label}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-500">
                      {link.description}
                    </div>
                  </div>
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900">
                    Rozpocznij za darmo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}