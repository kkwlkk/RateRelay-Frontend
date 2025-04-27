import { FaStar, FaUsers, FaLock } from 'react-icons/fa';
import { FeatureCard } from './FeatureCard';

export function Features() {
  const features = [
    {
      icon: FaStar,
      title: 'Prawdziwe opinie',
      description: 'Miej dostęp do autentycznych opinii i ocen firm w Twojej okolicy.',
      features: [
        'Zweryfikowane opinie klientów',
        'Szczegółowy system ocen',
        'Śledzenie ostatniej aktywności'
      ]
    },
    {
      icon: FaUsers,
      title: 'Społeczność',
      description: 'Dołącz do prężnej społeczności firm i klientów dzielących się swoimi doświadczeniami.',
      features: [
        'Aktywna społeczność użytkowników',
        'Aktualizacje w czasie rzeczywistym',
        'Funkcje udostępniania społecznościowego'
      ]
    },
    {
      icon: FaLock,
      title: 'Bezpieczna platforma',
      description: 'Twoje dane i prywatność są naszym priorytetem dzięki zabezpieczeniom na poziomie korporacyjnym.',
      features: [
        'Szyfrowanie end-to-end',
        'Regularne audyty bezpieczeństwa',
        'Kontrola prywatności'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Dlaczego TrustRate?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">Odkryj moc autentycznych opinii i zaufanych ocen firm</p>
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