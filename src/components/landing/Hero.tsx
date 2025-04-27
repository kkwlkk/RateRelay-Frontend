import { FaArrowRight, FaStar, FaUsers, FaLock, FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <Image
            src="/assets/bg-blob-purple-no-vornoi.svg"
            alt="Decorative blob"
            fill
            className="object-cover"
            style={{ transform: 'scale(1.2) rotate(-15deg)' }}
          />
        </div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary-400/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-12 md:py-20 relative">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Odkrywaj i dziel się <br />
              <span className="text-primary-200 bg-clip-text text-primary bg-gradient-to-r from-primary-300 to-primary-500">
                Opiniami o firmach
              </span> <br />
              Które mają znaczenie
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200 leading-relaxed">
              Dołącz do tysięcy firm i klientów, którzy ufają TrustRate w kwestii autentycznych opinii i ocen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8">
              <Link href="/businesses">
                <Button
                  className="bg-primary text-white hover:bg-primary-500 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 px-6 py-3 rounded-lg font-medium"
                >
                  Rozpocznij teraz
                  <FaArrowRight className="text-sm" />
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center lg:justify-start gap-8">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-200/30 bg-white/5 backdrop-blur-sm" />
                ))}
              </div>
              <div className="text-sm text-gray-200">
                <span className="font-semibold">1000+</span> firm nam ufa
              </div>
            </div>
          </div>

          <div className="flex-1 hidden lg:block relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-400/20 rounded-2xl transform rotate-6" />
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/10 hover:bg-white/15 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center">
                      <FaStar className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold">Niesamowite usługi!</div>
                      <div className="text-sm text-gray-200">&ldquo;Najlepsze doświadczenie w życiu!&rdquo;</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/10 hover:bg-white/15 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary-400 flex items-center justify-center">
                      <FaUsers className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold">Wspaniała społeczność</div>
                      <div className="text-sm text-gray-200">&ldquo;Bardzo pomocna platforma&rdquo;</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-lg border border-white/10 hover:bg-white/15 transition-colors duration-300">
                    <div className="w-12 h-12 rounded-full bg-primary-300 flex items-center justify-center">
                      <FaLock className="text-white text-xl" />
                    </div>
                    <div>
                      <div className="font-semibold">Bezpieczne i zaufane</div>
                      <div className="text-sm text-gray-200">&ldquo;Czuj się bezpiecznie korzystając z niej&rdquo;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce z-10 mb-8">
        <FaChevronDown className="text-white/50 text-2xl" />
      </div>
    </section>
  );
} 