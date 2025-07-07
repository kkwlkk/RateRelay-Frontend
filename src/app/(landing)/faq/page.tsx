'use client';

import { useState } from 'react';
import { Search, HelpCircle, Users, Building2, Shield, Star, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: string;
    tags: string[];
}

const faqData: FAQItem[] = [
    {
        id: '1',
        question: 'Czym jest TrustRate i jak działa?',
        answer: 'TrustRate to platforma umożliwiająca wymianę opinii między zweryfikowanymi firmami. System działa na zasadzie punktów - za każdą wystawioną opinię otrzymujesz punkt, a za każdą otrzymaną opinię tracisz punkt. Dzięki temu firmy są motywowane zarówno do dawania, jak i otrzymywania feedbacku.',
        category: 'Ogólne',
        tags: ['podstawy', 'jak działa', 'punkty']
    },
    {
        id: '2',
        question: 'Jak mogę zweryfikować swoją firmę?',
        answer: 'Proces weryfikacji składa się z kilku kroków: 1) Znajdź swoją firmę w Google Maps przez naszą wyszukiwarkę, 2) Potwierdź tożsamość poprzez aktualizację godzin otwarcia w Google Maps, 3) Poczekaj na automatyczną weryfikację (zwykle trwa to kilka minut). Po weryfikacji będziesz mógł w pełni korzystać z platformy.',
        category: 'Weryfikacja',
        tags: ['weryfikacja', 'firma', 'google maps']
    },
    {
        id: '3',
        question: 'Czy korzystanie z TrustRate jest bezpłatne?',
        answer: 'Tak, podstawowe funkcje TrustRate są całkowicie bezpłatne. Możesz zweryfikować firmę, wystawiać i otrzymywać opinie, uczestniczyć w programie poleceń - wszystko bez żadnych opłat. W przyszłości planujemy wprowadzenie dodatkowych, premium funkcji dla firm.',
        category: 'Płatności',
        tags: ['bezpłatne', 'cena', 'koszty']
    },
    {
        id: '4',
        question: 'Jak działa system punktów?',
        answer: 'Zdobywasz punkty za publikowanie zatwierdzonych opinii o innych firmach, a tracisz je gdy ktoś ocenia Twoją firmę. Musisz utrzymać minimalną liczbę punktów, aby Twoja firma była widoczna w kolejce do oceniania przez innych użytkowników.',
        category: 'Punkty',
        tags: ['punkty', 'system nagród', 'jak zdobyć']
    },
    {
        id: '5',
        question: 'Co to znaczy, że opinia została "zatwierdzona"?',
        answer: 'Po otrzymaniu opinii, właściciel firmy ma możliwość jej zatwierdzenia lub zgłoszenia. Zatwierdzone opinie są publikowane i widoczne dla innych użytkowników, a autor otrzymuje za nie punkt. Zgłoszone opinie trafiają do oceny moderatora, który decyduje o ich dalszym losie. Jeśli opinia zostanie odrzucona, nie będzie widoczna publicznie, ale nadal będzie dostępna w panelu właściciela firmy.',
        category: 'Opinie',
        tags: ['zatwierdzanie', 'moderacja', 'publikacja']
    },
    {
        id: '6',
        question: 'Czy mogę usunąć opinię o mojej firmie?',
        answer: 'Nie możesz usunąć opinii, ale możesz ją zgłosić do moderacji, jeśli uważasz, że jest niesprawiedliwa lub narusza regulamin.',
        category: 'Opinie',
        tags: ['usuwanie', 'odrzucanie', 'moderacja']
    },
    {
        id: '7',
        question: 'Jak mogę polecać TrustRate znajomym?',
        answer: 'W sekcji "Program polecajacych" znajdziesz swój unikalny kod polecający. Możesz udostępnić go znajomym lub skorzystać z gotowego linku zaproszeniowego. Za każdego aktywnego poleconego użytkownika otrzymujesz określone benefity, takie jak dodatkowe punkty lub dostęp do ekskluzywnych funkcji. Im więcej osób polecisz, tym więcej korzyści otrzymasz.',
        category: 'Polecenia',
        tags: ['polecenia', 'kod polecający', 'bonus']
    },
    {
        id: '8',
        question: 'Dlaczego moja firma nie pojawia się w kolejce do oceniania?',
        answer: 'Aby Twoja firma była widoczna w kolejce, musisz mieć minimum 2 punkty na koncie. Punkty zdobywasz oceniając inne firmy. To motywuje do aktywnego uczestnictwa w społeczności i zapewnia sprawiedliwą wymianę opinii.',
        category: 'Kolejka',
        tags: ['kolejka', 'widoczność', 'punkty minimum']
    },
    {
        id: '9',
        question: 'Co się stanie, jeśli nie zaakceptuję opinii w wyznaczonym czasie?',
        answer: 'Masz 7 dni na zaakceptowanie lub odrzucenie opinii. Po tym czasie opinia zostanie automatycznie zaakceptowana i opublikowana. Otrzymasz o tym powiadomienie z wyprzedzeniem.',
        category: 'Opinie',
        tags: ['czas', 'automatyczne zatwierdzanie', 'deadline']
    },
    {
        id: '10',
        question: 'Jak mogę zgłosić problem z kontem lub opinią?',
        answer: 'Skorzystaj z systemu zgłoszeń dostępnego w panelu "Wsparcie". Możesz tam utworzyć ticket opisujący problem. Nasz zespół odpowiada zazwyczaj w ciągu 24 godzin. W nagłych przypadkach skontaktuj się z nami e-mailem.',
        category: 'Wsparcie',
        tags: ['wsparcie', 'zgłoszenia', 'problemy']
    },
    {
        id: '11',
        question: 'Czy mogę mieć więcej niż jedną firmę na koncie?',
        answer: 'Tak, jedno konto może mieć przypisanych wiele firm. Każdą firmę musisz jednak zweryfikować osobno. Punkty są wspólne dla całego konta, więc zarządzanie wieloma firmami jest wygodne.',
        category: 'Konto',
        tags: ['wiele firm', 'zarządzanie', 'weryfikacja']
    },
    {
        id: '12',
        question: 'Jak TrustRate chroni przed fałszywymi opiniami?',
        answer: 'Stosujemy kilka mechanizmów: weryfikację firm przez Google Maps, system punktów motywujący do rzetelności, moderację treści przez AI i zespół, oraz możliwość zgłaszania podejrzanych opinii. Dodatkowo monitorujemy wzorce zachowań podejrzanych.',
        category: 'Bezpieczeństwo',
        tags: ['bezpieczeństwo', 'fałszywe opinie', 'weryfikacja']
    }
];

const categories = ['Wszystkie', 'Ogólne', 'Weryfikacja', 'Punkty', 'Opinie', 'Polecenia', 'Bezpieczeństwo', 'Wsparcie'];

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
    const [openItems, setOpenItems] = useState<string[]>([]);

    const filteredFAQs = faqData.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesCategory = selectedCategory === 'Wszystkie' || faq.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Ogólne': return <HelpCircle className="h-4 w-4" />;
            case 'Weryfikacja': return <Shield className="h-4 w-4" />;
            case 'Punkty': return <Star className="h-4 w-4" />;
            case 'Opinie': return <Users className="h-4 w-4" />;
            case 'Bezpieczeństwo': return <Shield className="h-4 w-4" />;
            case 'Wsparcie': return <Mail className="h-4 w-4" />;
            default: return <Building2 className="h-4 w-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                            <HelpCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Centrum Pomocy</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
                            Często zadawane
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {" "}pytania
                            </span>
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                            Znajdź szybkie odpowiedzi na najczęściej zadawane pytania dotyczące TrustRate.
                            Jeśli nie znajdziesz tego, czego szukasz, skontaktuj się z nami.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 bg-white dark:bg-zinc-900/50 border-y border-zinc-200 dark:border-zinc-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
                            <Input
                                type="text"
                                placeholder="Szukaj w pytaniach i odpowiedziach..."
                                className="pl-10 h-12 text-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                    className={cn(
                                        "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                                        selectedCategory === category
                                            ? "!bg-zinc-900 !text-white dark:!bg-zinc-100 dark:!text-zinc-900 !border-zinc-900 dark:!border-zinc-100"
                                            : "!bg-zinc-50 !text-zinc-700 !border !border-zinc-200 hover:!bg-zinc-100 hover:!text-zinc-900 hover:!border-zinc-300 dark:!bg-zinc-800/30 dark:!text-zinc-300 dark:!border-zinc-700 dark:hover:!bg-zinc-800/50 dark:hover:!text-zinc-100"
                                    )}
                                >
                                    {category !== 'Wszystkie' && getCategoryIcon(category)}
                                    {category}
                                </Button>
                            ))}
                        </div>

                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            Znaleziono {filteredFAQs.length} {filteredFAQs.length === 1 ? 'pytanie' :
                                filteredFAQs.length < 5 ? 'pytania' : 'pytań'}
                            {searchTerm && ` dla "${searchTerm}"`}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredFAQs.length > 0 ? (
                        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
                            <div className="space-y-4">
                                {filteredFAQs.map((faq) => (
                                    <AccordionItem
                                        key={faq.id}
                                        value={faq.id}
                                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-6 shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        <AccordionTrigger className="text-left hover:no-underline py-6">
                                            <div className="flex items-start gap-4 w-full">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        {getCategoryIcon(faq.category)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 text-left">
                                                            {faq.question}
                                                        </h3>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Badge variant="secondary" className="text-xs">
                                                                {faq.category}
                                                            </Badge>
                                                            {faq.tags.slice(0, 2).map((tag) => (
                                                                <Badge key={tag} variant="outline" className="text-xs text-zinc-800 dark:text-zinc-200">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-6">
                                            <div className="pl-12">
                                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </div>
                        </Accordion>
                    ) : (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="h-8 w-8 text-zinc-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                Nie znaleziono pytań
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                                Spróbuj użyć innych słów kluczowych lub wybierz inną kategorię
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedCategory('Wszystkie');
                                }}
                            >
                                Wyczyść filtry
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 sm:py-24 bg-white dark:bg-zinc-900/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                            Nie znalazłeś odpowiedzi?
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8">
                            Nasz zespół jest gotowy, aby Ci pomóc. Skontaktuj się z nami, a odpowiemy najszybciej jak to możliwe.
                        </p>

                        <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-2xl p-8 mb-8">
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                        Wyślij wiadomość
                                    </h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        Odpowiadamy w ciągu 24 godzin
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/contact">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        <Mail className="h-4 w-4 mr-2" />
                                        Formularz kontaktowy
                                    </Button>
                                </Link>
                                <Link href="mailto:kontakt@trustrate.pl">
                                    <Button size="lg" variant="outline" className="border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-zinc-100">
                                        <Mail className="h-4 w-4 mr-2" />
                                        kontakt@trustrate.pl
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-zinc-500 dark:text-zinc-500">
                                Możesz również napisać bezpośrednio na nasz adres email
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}