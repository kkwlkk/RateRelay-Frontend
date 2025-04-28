interface TermsAndConditionsProps {
    acceptedTerms: boolean;
    onTermsChange: (accepted: boolean) => void;
}

export default function TermsAndConditions({ acceptedTerms, onTermsChange }: TermsAndConditionsProps) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4">
                <input
                    id="terms"
                    type="checkbox"
                    className="h-6 w-6 rounded-2xl border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={acceptedTerms}
                    onChange={(e) => onTermsChange(e.target.checked)}
                />
                <label htmlFor="terms" className="text-base text-gray-700">
                    Akceptuję <a href="#" className="text-blue-600 hover:text-blue-500 font-medium underline">Regulamin serwisu</a> i{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-500 font-medium underline">Politykę Prywatności serwisu</a>
                </label>
            </div>
        </div>
    );
} 