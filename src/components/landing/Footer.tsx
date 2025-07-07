import Link from 'next/link';
import Image from 'next/image';
import { Mail, MapPin, Twitter } from 'lucide-react';

const footerSections = {
    product: {
        title: 'Produkt',
        links: [
            { href: '/features', label: 'Funkcje' },
            { href: '/faq', label: 'FAQ' },
            { href: '/contact', label: 'Kontakt' }
        ]
    },
    company: {
        title: 'Firma',
        links: [
            { href: '/about', label: 'O nas' },
            { href: '/contact', label: 'Kontakt' },
            // { href: '/blog', label: 'Blog' },
        ]
    },
    support: {
        title: 'Wsparcie',
        links: [
            { href: '/faq', label: 'Centrum pomocy' },
            { href: '/contact', label: 'Skontaktuj się z nami' },
            // { href: '/guides', label: 'Przewodniki' },
        ]
    },
    legal: {
        title: 'Prawne',
        links: [
            { href: '/privacy', label: 'Polityka Prywatności' },
            { href: '/terms', label: 'Regulamin' },
            { href: '/cookies', label: 'Polityka Cookie' },
            // { href: '/gdpr', label: 'RODO' }
        ]
    }
};

const socialLinks = [
    { href: 'https://twitter.com/trustrate', icon: Twitter, label: 'X' },
    // { href: 'https://linkedin.com/company/trustrate', icon: Linkedin, label: 'LinkedIn' },
    // { href: 'https://github.com/trustrate', icon: Github, label: 'GitHub' }
];

const contactInfo = [
    {
        icon: Mail,
        label: 'E-mail',
        value: 'kontakt@trustrate.pl',
        href: 'mailto:kontakt@trustrate.pl'
    },
    // {
    //     icon: Phone,
    //     label: 'Telefon',
    //     value: '+48 123 456 789',
    //     href: 'tel:+48123456789'
    // },
    {
        icon: MapPin,
        label: 'Adres',
        value: 'ul. Przykładowa 123, 00-001 Warszawa',
        href: null
    }
];

export function Footer() {
    return (
        <footer className="bg-zinc-900 dark:bg-black text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-6">
                            <Image
                                src="/assets/logo-white.png"
                                alt="TrustRate"
                                width={160}
                                height={45}
                                className="h-10 w-auto"
                            />
                        </Link>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                            Platforma wymiany opinii między zweryfikowanymi firmami.
                            Budujemy zaufanie w ekosystemie biznesowym.
                        </p>

                        {/* Contact Information */}
                        <div className="space-y-3 mb-6">
                            {contactInfo.map((contact) => (
                                <div key={contact.label} className="flex items-start gap-3">
                                    <contact.icon className="h-4 w-4 text-zinc-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wide">
                                            {contact.label}
                                        </div>
                                        {contact.href ? (
                                            <a
                                                href={contact.href}
                                                className="text-zinc-300 hover:text-white transition-colors text-sm"
                                            >
                                                {contact.value}
                                            </a>
                                        ) : (
                                            <div className="text-zinc-300 text-sm">
                                                {contact.value}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-4 w-4 text-zinc-400" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {Object.entries(footerSections).map(([key, section]) => (
                            <div key={key}>
                                <h3 className="font-semibold text-white mb-4">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="text-zinc-400 hover:text-white transition-colors text-sm"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            {/* <div className="border-t border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="font-semibold text-white mb-2">
                                Bądź na bieżąco
                            </h3>
                            <p className="text-zinc-400 text-sm">
                                Otrzymuj najnowsze informacje o funkcjach i aktualizacjach
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Twój adres e-mail"
                                className="flex-1 md:w-80 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-l-lg text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                            />
                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors">
                                Zapisz się
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Bottom Bar */}
            <div className="border-t border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-sm">
                            <span>© 2025 TrustRate Sp. z o.o. Wszelkie prawa zastrzeżone.</span>
                        </div>

                        <div className="flex items-center gap-6">
                            <Link
                                href="/privacy"
                                className="text-zinc-400 hover:text-white text-sm transition-colors"
                            >
                                Prywatność
                            </Link>
                            <Link
                                href="/terms"
                                className="text-zinc-400 hover:text-white text-sm transition-colors"
                            >
                                Regulamin
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-zinc-400 hover:text-white text-sm transition-colors"
                            >
                                Cookies
                            </Link>
                            <div className="text-zinc-500 text-sm">
                                Made in Poland 🇵🇱
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}