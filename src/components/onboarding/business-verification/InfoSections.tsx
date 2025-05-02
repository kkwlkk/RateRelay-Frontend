import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { infoSections } from '@/data/onboarding/businessVerificationInfo';
import { ShieldCheck } from 'lucide-react';

export function InfoSections() {
    return (
        <div className="space-y-6">
            <Card className="shadow-lg border border-gray-100">
                <CardContent className="px-8 py-4">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        Dlaczego należy zweryfikować firmę?
                    </h2>
                    <div className="mb-8 relative pl-6">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-100"></div>
                        <p className="text-gray-600 leading-relaxed">
                            Potwierdzenie tożsamości to klucz do pełnej funkcjonalności naszej platformy. Zyskaj dostęp do wszystkich narzędzi i ciesz się pełną kontrolą nad swoim profilem – zweryfikowana firma to firma, której się ufa!
                        </p>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {infoSections.map((section, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow transition-all duration-200"
                            >
                                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50 data-[state=open]:border-b-gray-100 data-[state=open]:border-b-2 border-transparent">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-50 rounded-lg">
                                            <section.icon className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <span className="font-medium text-gray-900">{section.title}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pt-4">
                                    <ul className="list-disc pl-5 space-y-2.5 text-gray-600">
                                        {section.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="text-sm leading-relaxed">{item}</li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <div className="mt-6 p-5 bg-gray-50/50 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-3 mb-3">
                            <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                            <h3 className="text-sm font-semibold text-gray-800">Gwarancja bezpieczeństwa</h3>
                        </div>
                        <p className="text-sm text-gray-600/90 pl-8 leading-relaxed">
                            Twoje dane firmowe są bezpieczne. Przechowujemy je zgodnie z najwyższymi standardami ochrony prywatności, dbając o ich bezpieczeństwo i wykorzystywanie wyłącznie w celu ulepszania Twojego doświadczenia na naszej platformie.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 