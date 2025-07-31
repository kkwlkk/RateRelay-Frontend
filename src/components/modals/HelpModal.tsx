'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bug, AlertTriangle, Headphones } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { TicketType } from '@/types/dtos/Tickets';
import { useModalStore } from '@/contexts/ModalStoreContext';

const HELP_OPTIONS = [
    {
        title: 'Zgłoś problem techniczny',
        content: 'Napotkałeś błąd w aplikacji? Zgłoś problem techniczny, aby pomóc nam go naprawić.',
        icon: Bug,
        ticketType: TicketType.SystemIssue
    },
    {
        title: 'Zgłoś nieodpowiednie treści',
        content: 'Zauważyłeś nieodpowiednie treści lub naruszenie regulaminu? Pomóż nam utrzymać jakość platformy.',
        icon: AlertTriangle,
        ticketType: TicketType.Other
    },
    {
        title: 'Nie masz pewności jak działa dany system?',
        content: 'Skorzystaj z naszego FAQ, aby znaleźć odpowiedzi na najczęściej zadawane pytania.',
        icon: Headphones,
        href: '/faq'
    }
];

export const HelpModal = () => {
    const { closeModal } = useModalStore();
    const router = useRouter();

    const handleOptionClick = (option: typeof HELP_OPTIONS[number]) => {
        const destination = option.href || `/dashboard/tickets?new=true&type=${option.ticketType}`;
        router.push(destination);
        closeModal();
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-1">
                <h2 className="text-xl font-semibold text-zinc-200">
                    Pomoc i wsparcie
                </h2>
                <p className="text-sm text-zinc-400">
                    Wybierz odpowiednią opcję, aby uzyskać pomoc lub zgłosić problem
                </p>
            </div>

            <div className="space-y-3">
                {HELP_OPTIONS.map((option, index) => {
                    const IconComponent = option.icon;
                    
                    return (
                        <div
                            key={index}
                            className="border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 hover:bg-zinc-900/30 transition-all duration-200 cursor-pointer"
                            onClick={() => handleOptionClick(option)}
                        >
                            <div className="flex gap-3">
                                <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 flex-shrink-0">
                                    <IconComponent className="w-5 h-5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="space-y-2">
                                        <h3 className="text-sm font-medium text-zinc-200">
                                            {option.title}
                                        </h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed">
                                            {option.content}
                                        </p>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-zinc-400 hover:text-zinc-200 p-0 h-auto text-sm font-medium"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOptionClick(option);
                                            }}
                                        >
                                            {option.href ? 'FAQ' : 'Nowe zgłoszenie'}
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* <div className="border border-zinc-800 rounded-lg p-4 bg-zinc-900/20">
                <div className="space-y-3">
                    <div>
                        <h4 className="text-sm font-medium text-zinc-200">
                            Potrzebujesz natychmiastowej pomocy?
                        </h4>
                        <p className="text-sm text-zinc-400 mt-1">
                            W przypadku pilnych problemów skontaktuj się z nami bezpośrednio
                        </p>
                    </div>

                    <div className="flex gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between flex-col">
                        <Button
                            size="sm"
                            variant="default"
                            className='bg-primary/80'
                            onClick={handleLiveSupportClick}
                        >
                            <Headphones className="w-4 h-4 mr-2" />
                            Wsparcie na żywo
                        </Button>
                    </div>
                </div>
            </div> */}
        </div>
    );
};