import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 via-stone-100 to-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate-300 rounded-full filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-stone-300 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-slate-400 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Gotowy, aby zacząć?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Dołącz do przedsiębiorców, którzy wymieniają doświadczenia, by budować autentyczny wizerunek swoich firm.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/businesses">
            <Button size="lg" className="bg-primary text-white hover:bg-primary-500 shadow-sm hover:shadow-md transition-all duration-300 rounded-md px-8 py-3 font-medium">
              Dla firm
            </Button>
          </Link>
          <Link href="/features">
            <Button size="lg" variant="outline" className="border-primary-200 text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md transition-all duration-300 rounded-md px-8 py-3 font-medium">
              Dowiedz się więcej
            </Button>
          </Link>
        </div>
        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-300/80" />
            ))}
          </div>
          <div className="text-gray-600">
            <span className="font-semibold">100+</span> firm buduje reputację z TrustRate
          </div>
        </div>
      </div>
    </section>
  );
} 