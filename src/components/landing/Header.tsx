import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/assets/logo-dark.png" alt="TrustRate Logo" width={150} height={150} priority className="dark:hidden" />
            <Image src="/assets/logo-white.png" alt="TrustRate Logo" width={150} height={150} priority className="hidden dark:block" />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-50 transition-colors">Strona główna</Link>
            <Link href="/features" className="text-gray-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-50 transition-colors">Funkcje</Link>
            <Link href="/businesses" className="text-gray-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-50 transition-colors">Dla firm</Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-400 dark:hover:text-gray-50 transition-colors">O nas</Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button className="bg-primary/80 text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 px-6 py-2.5 rounded-md font-medium">
                <FaUser className="text-sm" />
                Zaloguj się
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}