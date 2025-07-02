import { Separator } from '@/components/ui/separator';
import { howItWorksSteps } from '@/data/onboarding/welcome';

export default function HowItWorks() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    Jak to działa
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Prosty proces w trzech krokach
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
                {howItWorksSteps.map((step, index) => (
                    <div key={step.number}>
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                    <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                    {step.title}
                                </h3>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </div>
                        {index < howItWorksSteps.length - 1 && (
                            <Separator className="md:hidden bg-zinc-800 !w-24 mx-auto mt-5" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}