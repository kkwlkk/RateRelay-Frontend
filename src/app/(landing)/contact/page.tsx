'use client';

import { Mail, MapPin, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// interface ContactFormData {
//     name: string;
//     email: string;
//     company?: string;
//     subject: string;
//     category: string;
//     message: string;
// }

// const contactCategories = [
//     { value: 'general', label: 'Pytanie ogólne' },
//     { value: 'technical', label: 'Wsparcie techniczne' },
//     { value: 'business', label: 'Współpraca biznesowa' },
//     { value: 'billing', label: 'Rozliczenia i płatności' },
//     { value: 'feedback', label: 'Zgłoszenie problemu' },
//     { value: 'press', label: 'Media i PR' },
// ];

export default function ContactPage() {
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ContactFormData>();

    // const onSubmit = async (data: ContactFormData) => {
    //     setIsSubmitting(true);

    //     try {
    //         await new Promise(resolve => setTimeout(resolve, 2000));
    //         console.log('Contact form data:', data);
    //         toast.success('Wiadomość została wysłana! Odpowiemy w ciągu 24 godzin.');
    //         reset();
    //     } catch {
    //         toast.error('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <section className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm font-medium">Kontakt</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
                            Skontaktuj się
                            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {" "}z nami
                            </span>
                        </h1>
                        <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
                            Masz pytania? Potrzebujesz pomocy? Nasz zespół jest gotowy, aby Ci pomóc.
                            Skontaktuj się z nami w dowolny sposób.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-96">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
                                    Informacje kontaktowe
                                </h2>
                                <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                                    Jesteśmy dostępni, aby odpowiedzieć na Twoje pytania i pomóc w rozwiązaniu
                                    problemów. Wybierz najwygodniejszy dla Ciebie sposób kontaktu.
                                </p>
                            </div>

                            <div className="space-y-6 lg:space-y-0 lg:flex lg:gap-8 xl:gap-12">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                            E-mail
                                        </h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 mb-1">
                                            Napisz do nas w dowolnym momencie
                                        </p>
                                        <a
                                            href="mailto:kontakt@trustrate.pl"
                                            className="text-blue-600 dark:text-blue-400 hover:underline"
                                        >
                                            kontakt@trustrate.pl
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                            Adres biura
                                        </h3>
                                        <p className="text-zinc-600 dark:text-zinc-400">
                                            ul. Przykładowa 123<br />
                                            00-001 Warszawa<br />
                                            Polska
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                            Godziny pracy
                                        </h3>
                                        <div className="text-zinc-600 dark:text-zinc-400 space-y-1">
                                            <p>Poniedziałek - Piątek: 9:00 - 17:00</p>
                                            <p>Sobota - Niedziela: Zamknięte</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="text-center lg:text-left">
                                <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                                    Szybka pomoc
                                </h2>
                                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                                    Sprawdź, czy znajdziesz odpowiedź na swoje pytanie
                                </p>
                            </div>

                            <Link href="/faq" className="w-full">
                                <Button variant="outline" className="w-full">
                                    Zobacz FAQ
                                </Button>
                            </Link>
                        </div>

                        {/* Contact Form - Commented Out */}
                        {/* <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl text-zinc-900 dark:text-zinc-100">
                                    Wyślij wiadomość
                                </CardTitle>
                                <CardDescription>
                                    Wypełnij formularz, a odpowiemy w ciągu 24 godzin
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="name">Imię i nazwisko *</Label>
                                            <Input
                                                id="name"
                                                {...register('name', { required: 'To pole jest wymagane' })}
                                                className="mt-1"
                                                placeholder="Jan Kowalski"
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <Label htmlFor="email">E-mail *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                {...register('email', {
                                                    required: 'To pole jest wymagane',
                                                    pattern: {
                                                        value: /^\S+@\S+$/i,
                                                        message: 'Nieprawidłowy adres e-mail'
                                                    }
                                                })}
                                                className="mt-1"
                                                placeholder="jan@example.com"
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="company">Nazwa firmy</Label>
                                        <Input
                                            id="company"
                                            {...register('company')}
                                            className="mt-1"
                                            placeholder="Twoja Firma Sp. z o.o."
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Kategoria pytania *</Label>
                                        <Select onValueChange={(value) => setValue('category', value)}>
                                            <SelectTrigger className="mt-1 w-full">
                                                <SelectValue placeholder="Wybierz kategorię" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {contactCategories.map((category) => (
                                                    <SelectItem key={category.value} value={category.value}>
                                                        {category.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="subject">Temat wiadomości *</Label>
                                        <Input
                                            id="subject"
                                            {...register('subject', { required: 'To pole jest wymagane' })}
                                            className="mt-1"
                                            placeholder="Krótki opis problemu lub pytania"
                                        />
                                        {errors.subject && (
                                            <p className="text-sm text-red-600 mt-1">{errors.subject.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="message">Wiadomość *</Label>
                                        <Textarea
                                            id="message"
                                            {...register('message', { required: 'To pole jest wymagane' })}
                                            className="mt-1 min-h-32"
                                            placeholder="Opisz szczegółowo swoje pytanie lub problem..."
                                        />
                                        {errors.message && (
                                            <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full dark:bg-primary/80"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                    >
                                        <Send className="h-4 w-4 mr-2" />
                                        {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card> */}
                    </div>
                </div>
            </section>
        </div>
    );
}