import { FaStar, FaUsers, FaLock } from 'react-icons/fa';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const features = [
    {
      icon: FaStar,
      title: 'Zweryfikowane doświadczenia',
      description: 'Uzyskuj dostęp do rzetelnych informacji i doświadczeń przedsiębiorców z Twojej branży.',
      features: [
        'Rzetelna weryfikacja użytkowników',
        'Autentyczne doświadczenia biznesowe',
        'Aktywność potwierdzona działaniami w czasie rzeczywistym'
      ]
    },
    {
      icon: FaUsers,
      title: 'Społeczność zaufanych firm',
      description: 'TrustRate to platforma skupiająca wyłącznie firmy o zweryfikowanej aktywności i wysokich standardach.',
      features: [
        'Zamknięty dostęp dla zweryfikowanych firm',
        'Bezpieczna wymiana wiedzy i doświadczeń',
        'Wzajemne wsparcie w rozwoju biznesu'
      ]
    },
    {
      icon: FaLock,
      title: 'Prywatność i ochrona danych',
      description: 'Twoje dane i prywatność są naszym priorytetem dzięki zabezpieczeniom na poziomie korporacyjnym.',
      features: [
        'Szyfrowanie end-to-end na każdym etapie',
        'Regularne audyty bezpieczeństwa',
        'Pełna kontrola nad Twoją prywatnością'
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
            Dlaczego TrustRate?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl px-4 sm:px-0">
            Poznaj zamkniętą społeczność zweryfikowanych firm i odkrywaj prawdziwe opinie, którym możesz zaufać.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}