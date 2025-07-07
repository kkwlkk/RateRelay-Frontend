import { Building2, Users, Target, Shield, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div>
            <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                            <Building2 className="h-4 w-4" />
                            <span className="text-sm font-medium">O nas</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
                            Budujemy mosty między
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {" "}firmami
                            </span>
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                            TrustRate to platforma, która łączy przedsiębiorców, umożliwiając im wymianę
                            autentycznych opinii i budowanie wzajemnego zaufania w ekosystemie biznesowym.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full px-4 py-2 mb-6">
                                <Target className="h-4 w-4" />
                                <span className="text-sm font-medium">Nasza misja</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                                Rewolucjonizujemy sposób, w jaki firmy się oceniają
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed mb-6">
                                Wierzymy, że najcenniejsze opinie pochodzą od osób, które rzeczywiście
                                współpracowały z daną firmą. Nasza platforma eliminuje fałszywe recenzje
                                i promuje autentyczny feedback między przedsiębiorcami.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Shield className="h-3 w-3 text-green-600 dark:text-green-400" />
                                    </div>
                                    <p className="text-zinc-700 dark:text-zinc-300">
                                        <strong>Weryfikacja:</strong> Każda firma przechodzi proces weryfikacji
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Users className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <p className="text-zinc-700 dark:text-zinc-300">
                                        <strong>Społeczność:</strong> Budujemy zaufaną sieć przedsiębiorców
                                    </p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Star className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <p className="text-zinc-700 dark:text-zinc-300">
                                        <strong>Jakość:</strong> Priorytetem są rzetelne i pomocne opinie
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Bezpieczna platforma</h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Zaawansowane systemy ochrony danych użytkowników</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                            <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Łatwa integracja</h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Szybkie dodawanie firm i zarządzanie nimi</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                                            <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Analityka w czasie rzeczywistym</h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Szczegółowe raporty i statystyki wykonywanych działań</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 sm:py-24 bg-white dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                            Nasze wartości
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                            Zasady, które kierują nami w codziennej pracy i kształtowaniu przyszłości biznesu
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-6">
                                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Transparentność
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Każda opinia jest weryfikowana, a proces oceniania jest otwarty i czytelny
                                dla wszystkich uczestników platformy.
                            </p>
                        </div>

                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-6">
                                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Społeczność
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Budujemy silną społeczność przedsiębiorców, którzy wspierają się nawzajem
                                poprzez rzetelne opinie i doświadczenia.
                            </p>
                        </div>

                        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-6">
                                <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                                Innowacyjność
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Stale rozwijamy platformę, wprowadzając nowe funkcje, które ułatwiają
                                wymianę opinii i budowanie relacji biznesowych.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                            Poznaj nasz zespół
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                            Pasjonaci technologii i biznesu, którzy codziennie pracują nad rozwojem platformy
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">AK</span>
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                Anna Kowalska
                            </h3>
                            <p className="text-blue-600 dark:text-blue-400 mb-4">CEO & Founder</p>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                                15 lat doświadczenia w branży tech. Wcześniej CTO w dwóch startupach,
                                które zostały przejęte przez większe korporacje.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">MW</span>
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                Michał Wiśniewski
                            </h3>
                            <p className="text-green-600 dark:text-green-400 mb-4">CTO</p>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                                Expert w dziedzinie systemów rozproszonych i bezpieczeństwa.
                                Autor kilkunastu publikacji z zakresu cybersecurity.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">KN</span>
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                Katarzyna Nowak
                            </h3>
                            <p className="text-purple-600 dark:text-purple-400 mb-4">Head of Product</p>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                                Specjalistka od user experience z 10-letnim doświadczeniem.
                                Odpowiada za projekt i funkcjonalność platformy.
                            </p>
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
                        Dołącz do naszej społeczności
                    </h2>
                    <p className="text-zinc-300 text-lg mb-8 max-w-2xl mx-auto">
                        Rozpocznij budowanie zaufania w swojej branży. Zarejestruj się dziś
                        i zobacz, jak TrustRate może pomóc Twojemu biznesowi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/login" className='z-10'>
                            <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100">
                                Rozpocznij za darmo
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/contact" className='z-10'>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-zinc-900"
                            >
                                Skontaktuj się z nami
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}