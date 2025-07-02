import { useState } from 'react';
import { infoSections } from '@/data/onboarding/businessVerificationInfo';
import { ShieldCheck, ChevronDown, ChevronRight } from 'lucide-react';

export function InfoSections() {
    const [openSections, setOpenSections] = useState<number[]>([]);

    const toggleSection = (index: number) => {
        setOpenSections(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                    Dlaczego należy zweryfikować firmę?
                </h2>
                <div className="pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Potwierdzenie tożsamości to klucz do pełnej funkcjonalności naszej platformy. 
                        Zyskaj dostęp do wszystkich narzędzi i ciesz się pełną kontrolą nad swoim profilem – 
                        zweryfikowana firma to firma, której się ufa!
                    </p>
                </div>
            </div>

            <div className="p-6 space-y-4">
                {infoSections.map((section, index) => (
                    <div 
                        key={index} 
                        className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden bg-zinc-50 dark:bg-zinc-800/50"
                    >
                        <button
                            onClick={() => toggleSection(index)}
                            className="w-full px-4 py-3 flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                    <section.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {section.title}
                                </span>
                            </div>
                            {openSections.includes(index) ? (
                                <ChevronDown className="h-4 w-4 text-zinc-500" />
                            ) : (
                                <ChevronRight className="h-4 w-4 text-zinc-500" />
                            )}
                        </button>
                        
                        {openSections.includes(index) && (
                            <div className="px-4 pb-4 pt-2 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
                                <div className="ml-11">
                                    <ul className="space-y-2">
                                        {section.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                                <span className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
                        <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <h3 className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                            Gwarancja bezpieczeństwa
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Twoje dane firmowe są bezpieczne. Przechowujemy je zgodnie z najwyższymi standardami 
                            ochrony prywatności, dbając o ich bezpieczeństwo i wykorzystywanie wyłącznie w celu 
                            ulepszania Twojego doświadczenia na naszej platformie.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}