import { Shield, Users, Star, Building2, Award, BarChart3, MessageSquare, Globe, Clock, CheckCircle, ArrowRight, Zap, Lock, Smartphone, Mail, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Funkcje - TrustRate',
    description: 'Poznaj wszystkie funkcje TrustRate: weryfikację firm, system punktów, wymianę opinii, analitykę i wiele więcej.',
    keywords: ['funkcje', 'możliwości', 'TrustRate', 'weryfikacja', 'opinie', 'analityka'],
};

const mainFeatures = [
    {
        icon: Shield,
        title: 'Weryfikacja firm',
        description: 'Bezpieczny proces weryfikacji przez Google Maps',
        details: [
            'Automatyczna weryfikacja w kilka minut',
            'Inteligentne potwierdzenie tożsamości',
            'Ochrona przed fałszywymi firmami'
        ],
    },
    {
        icon: Award,
        title: 'System punktów',
        description: 'Sprawiedliwy system motywujący do aktywności',
        details: [
            'Punkt za każdą zatwierdzoną opinię',
            'Bonus za publikację w Google Maps',
            'Utrata punktu za otrzymaną opinię',
            'Minimum 2 punkty dla widoczności firmy'
        ],
    },
    {
        icon: MessageSquare,
        title: 'Wymiana opinii',
        description: 'Autentyczne opinie między zweryfikowanymi firmami',
        details: [
            'Ograniczony czas na wystawienie opinii',
            'Pełna kontrola nad otrzymywanymi opiniami',
            'Ochrona przed spamem i fake\'ami',
            'Szczegółowe komentarze i oceny gwiazdkowe'
        ],
    },
    {
        icon: BarChart3,
        title: 'Analityka i raporty',
        description: 'Szczegółowe statystyki dla Twojej firmy',
        details: [
            'Analiza otrzymanych opinii',
            'Trendy w czasie',
            'Porównanie z konkurencją',
            'Eksport danych do Excel/CSV'
        ],
    }
];

const additionalFeatures = [
    {
        icon: Users,
        title: 'Program polecajacych',
        description: 'Zarabiaj punkty polecając TrustRate znajomym',
        color: 'blue'
    },
    {
        icon: Globe,
        title: 'Integracja z Google Maps',
        description: 'Bezpośrednie połączenie z profilami firm w Google',
        color: 'green'
    },
    {
        icon: Clock,
        title: 'Powiadomienia w czasie rzeczywistym',
        description: 'Natychmiastowe informacje o nowych opiniach',
        color: 'purple'
    },
    {
        icon: Lock,
        title: 'Bezpieczeństwo danych',
        description: 'Twoje dane są zawsze chronione i szyfrowane',
        color: 'red'
    },
    {
        icon: Smartphone,
        title: 'Responsywny design',
        description: 'Pełna funkcjonalność na wszystkich urządzeniach',
        color: 'orange'
    },
    {
        icon: Mail,
        title: 'Wsparcie 24/7',
        description: 'Pomoc techniczna i biznesowa przez cały czas',
        color: 'teal'
    }
];

const howItWorks = [
    {
        step: 1,
        title: 'Zarejestruj się',
        description: 'Utwórz darmowe konto i zweryfikuj swoją firmę przez Google Maps',
        icon: Building2
    },
    {
        step: 2,
        title: 'Zdobywaj punkty',
        description: 'Oceniaj inne firmy i zdobywaj punkty za każdą zatwierdzoną opinię',
        icon: Star
    },
    {
        step: 3,
        title: 'Zarządzaj opiniami',
        description: 'Otrzymuj opinie o swojej firmie i zarządzaj nimi w panelu firmy',
        icon: CheckCircle
    },
    {
        step: 4,
        title: 'Analizuj wyniki',
        description: 'Korzystaj z zaawansowanej analityki i buduj lepszą reputację',
        icon: TrendingUp
    }
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Hero Section */}
            <section className="relative  bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 overflow-hidden py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm font-medium">Funkcje</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
                            Wszystko czego potrzebujesz
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {" "}w jednym miejscu
                            </span>
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                            TrustRate oferuje kompletny zestaw narzędzi do budowania zaufania,
                            zarządzania opiniami i rozwijania relacji biznesowych.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Features */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                            Kluczowe funkcje
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                            Poznaj główne możliwości platformy, które pomogą Ci budować silną reputację
                        </p>
                    </div>

                    <div className="space-y-24">
                        {mainFeatures.map((feature, index) => (
                            <div key={feature.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}>
                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full px-4 py-2 mb-6">
                                        <feature.icon className="h-4 w-4" />
                                        <span className="text-sm font-medium">Funkcja {index + 1}</span>
                                    </div>
                                    <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                                        {feature.title}
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                                        {feature.description}
                                    </p>
                                    <ul className="space-y-3 mb-8">
                                        {feature.details.map((detail, detailIndex) => (
                                            <li key={detailIndex} className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="text-zinc-700 dark:text-zinc-300">
                                                    {detail}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        Dowiedz się więcej
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center">
                                        <feature.icon className="h-24 w-24 text-blue-600 dark:text-blue-400" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Features Grid */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                            Dodatkowe możliwości
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                            Kompletny zestaw narzędzi wspierających Twój sukces
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {additionalFeatures.map((feature) => (
                            <Card key={feature.title} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-zinc-900/80">
                                <CardHeader>
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${feature.color}-100 dark:bg-${feature.color}-900/20`}>
                                        <feature.icon className={`h-6 w-6 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                                    </div>
                                    <CardTitle className="text-xl text-zinc-900 dark:text-zinc-100">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                            Jak to działa?
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                            Prosty proces w czterech krokach
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {howItWorks.map((step, index) => (
                            <div key={step.step} className="text-center relative">
                                {index < howItWorks.length - 1 && (
                                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />
                                )}
                                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                                    <step.icon className="h-12 w-12 text-white" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center border-2 border-blue-500">
                                        <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                            {step.step}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full px-4 py-2 mb-6">
                                <Globe className="h-4 w-4" />
                                <span className="text-sm font-medium">Integracje</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                                Połączenie z ekosystemem Google
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-8">
                                TrustRate płynnie integruje się z ekosystemem Google, dostarczając zweryfikowane informacje biznesowe
                                i umożliwiając wieloplatformowe zarządzanie recenzjami.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-zinc-700 dark:text-zinc-300">
                                        Automatyczna synchronizacja firmy z Google My Business
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-zinc-700 dark:text-zinc-300">
                                        Weryfikacja przez Google Maps
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="text-zinc-700 dark:text-zinc-300">
                                        Inteligentne potwierdzenie tożsamości
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl flex items-center justify-center">
                                <Globe className="h-32 w-32 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
                <div className="absolute inset-0 opacity-5 z-0">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)`,
                        backgroundSize: '32px 32px',
                        color: 'rgb(var(--primary) / 0.1)'
                    }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                        Gotowy, żeby zacząć?
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
                        Wypróbuj wszystkie funkcje TrustRate za darmo. Żadnych zobowiązań,
                        pełen dostęp do platformy.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login" className='z-10'>
                            <Button size="lg" className="bg-zinc-800 text-zinc-300 hover:bg-zinc-900 dark:bg-zinc-300 dark:text-zinc-900 dark:hover:bg-zinc-200">
                                Rozpocznij za darmo
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}