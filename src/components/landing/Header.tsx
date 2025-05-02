import { FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Image src="/assets/logo-dark.png" alt="TrustRate Logo" width={150} height={150} priority />
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">Strona główna</Link>
            <Link href="/features" className="text-gray-700 hover:text-primary transition-colors">Funkcje</Link>
            <Link href="/businesses" className="text-gray-700 hover:text-primary transition-colors">Dla firm</Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">O nas</Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="/login">
              <Button
                className="bg-primary text-white hover:bg-primary-500 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 px-6 py-2.5 rounded-md font-medium"
              >
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