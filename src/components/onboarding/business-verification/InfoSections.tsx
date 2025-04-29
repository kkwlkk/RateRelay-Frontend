import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { infoSections } from '@/data/businessVerificationInfo';

export function InfoSections() {
    return (
        <div className="space-y-6">
            <Card className="shadow-lg border border-gray-100">
                <CardContent className="px-8 py-4">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                        Dlaczego należy zweryfikować firmę?
                    </h2>
                    <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-sm text-indigo-700">
                        Podstawą naszej platformy jest zapewnienie, że każdy użytkownik jest rzeczywistym właścicielem firmy. To nie tylko gwarantuje bezpieczeństwo, ale również buduje solidny fundament do wymiany wiedzy, doświadczeń i rekomendacji, co w efekcie wpływa na rozwój i wiarygodność Twojej marki.
                        </p>
                    </div>
                   <br></br>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {infoSections.map((section, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border rounded-xl overflow-hidden hover:bg-gray-50 transition-colors"
                            >
                                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                    <div className="flex items-center gap-3">
                                        <section.icon className="w-5 h-5 text-blue-500" />
                                        <span className="font-medium">{section.title}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-4">
                                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                        {section.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="text-sm">{item}</li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-sm text-blue-700">
                            Twoje dane firmowe będą przechowywane bezpiecznie i wykorzystywane wyłącznie w celu poprawy Twojego doświadczenia na naszej platformie. Zobowiązujemy się do ochrony Twojej prywatności i zapewnienia bezpieczeństwa danych Twojej firmy.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
} 