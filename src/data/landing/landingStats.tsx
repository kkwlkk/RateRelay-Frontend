import React from 'react';
import { Building2, Handshake, TrendingUp, MapPin } from 'lucide-react';
import { StatItem } from '@/components/landing/StatItem';

export const landingStats: StatItem[] = [
  {
    value: 100,
    suffix: '+',
    label: 'Zaufanych Firm',
    description: 'Zweryfikowane przedsiębiorstwa z całej Polski',
    icon: <Building2 className="w-6 h-6 text-primary" />
  },
  {
    value: 100,
    suffix: '+',
    label: 'Udanych Współprac',
    description: 'Nawiązane kontakty biznesowe przez naszą platformę',
    icon: <Handshake className="w-6 h-6 text-primary" />
  },
  {
    value: 98,
    suffix: '%',
    label: 'Satysfakcji',
    description: 'Klienci polecający nasze usługi innym firmom',
    icon: <TrendingUp className="w-6 h-6 text-primary" />
  },
  {
    value: 50,
    suffix: '+',
    label: 'Miast w Polsce',
    description: 'Lokalizacje gdzie działają nasze firmy partnerskie',
    icon: <MapPin className="w-6 h-6 text-primary" />
  }
];