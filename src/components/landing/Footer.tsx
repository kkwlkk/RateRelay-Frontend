import { FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Image src="/assets/logo-white.png" alt="TrustRate Logo" width={150} height={150} className="mb-4" priority />
            <p className="text-slate-300">Twoja zaufana platforma do opinii o firmach i informacji zwrotnych od klientów.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Szybkie linki</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-slate-300 hover:text-white transition-colors">O nas</Link></li>
              <li><Link href="/features" className="text-slate-300 hover:text-white transition-colors">Funkcje</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-white transition-colors">Kontakt</Link></li>
              <li><Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">Polityka prywatności</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Dla firm</h4>
            <ul className="space-y-3">
              <li><Link href="/business/signup" className="text-slate-300 hover:text-white transition-colors">Rejestracja firmy</Link></li>
              <li><Link href="/business/features" className="text-slate-300 hover:text-white transition-colors">Funkcje dla firm</Link></li>
              <li><Link href="/business/support" className="text-slate-300 hover:text-white transition-colors">Wsparcie</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-slate-300">
                <FaEnvelope className="mr-2" />
                <Link href="mailto:kontakt@trustrate.pl" className="hover:text-white transition-colors">
                  kontakt@trustrate.pl
                </Link>
              </li>
              <li className="text-slate-300">
                Poniedziałek - Piątek: 9:00 - 18:00
              </li>
              <li className="text-slate-300">
                Wsparcie dostępne 24/7
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-300 text-sm">
              &copy; {new Date().getFullYear()} TrustRate. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-slate-300 hover:text-white text-sm transition-colors">Regulamin</Link>
              <Link href="/privacy" className="text-slate-300 hover:text-white text-sm transition-colors">Polityka prywatności</Link>
              <Link href="/cookies" className="text-slate-300 hover:text-white text-sm transition-colors">Polityka cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 