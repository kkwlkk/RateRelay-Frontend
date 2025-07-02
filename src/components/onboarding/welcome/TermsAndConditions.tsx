import { FileText } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface TermsAndConditionsProps {
    acceptedTerms: boolean;
    onTermsChange: (accepted: boolean) => void;
}

export default function TermsAndConditions({ acceptedTerms, onTermsChange }: TermsAndConditionsProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20">
                    <FileText className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1 space-y-3">
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                        Akceptacja regulaminu
                    </h3>
                    <div className="flex items-start gap-3">
                        <Checkbox
                            id="terms"
                            checked={acceptedTerms}
                            onCheckedChange={onTermsChange}
                            className="mt-0.5 data-[state=checked]:bg-blue-400 border-blue-400"
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed cursor-pointer"
                        >
                            Akceptuję{' '}
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline underline-offset-2 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Regulamin programu
                            </a>
                            {' '}i{' '}
                            <a
                                href=""
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium underline underline-offset-2 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Politykę Prywatności serwisu
                            </a>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}