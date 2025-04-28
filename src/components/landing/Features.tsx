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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Dlaczego TrustRate?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Poznaj zamkniętą społeczność zweryfikowanych firm i odkrywaj prawdziwe opinie, którym możesz zaufać.          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
} 