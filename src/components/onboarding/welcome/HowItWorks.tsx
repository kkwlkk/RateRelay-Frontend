import { howItWorksSteps } from '@/data/onboarding/welcome';

export default function HowItWorks() {
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Jak to działa</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {howItWorksSteps.map((step) => (
                    <div key={step.number} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                            <span className="text-xl font-semibold text-blue-600">{step.number}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 