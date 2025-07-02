import { GooglePlacesAutocomplete } from '@/components/GooglePlacesAutocomplete';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Search } from 'lucide-react';

interface BusinessSearchProps {
    onBusinessSelect: (place: google.maps.places.PlaceResult) => void;
    onSubmit: () => void;
    selectedBusiness: google.maps.places.PlaceResult | null | undefined;
    isSubmitting: boolean;
}

export function BusinessSearch({ onBusinessSelect, onSubmit, selectedBusiness, isSubmitting }: BusinessSearchProps) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                    <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Znajdź swoją firmę
                </h2>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-1">
                            Nie znajdujesz swojej firmy?
                        </p>
                        <p className="text-sm text-amber-700 dark:text-amber-300">
                            Sprawdź poprawność nazwy i upewnij się, że posiada ona przynajmniej 1 opinię w Google. 
                            W przeciwnym razie skontaktuj się z administratorem platformy.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                <GooglePlacesAutocomplete
                    onPlaceSelected={onBusinessSelect}
                    placeholder="Wyszukaj swoją firmę..."
                    title=""
                    description=""
                />
                
                {selectedBusiness && (
                    <div className="mt-4 p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Wybrana firma:</p>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">
                            {selectedBusiness.name}
                        </p>
                        {selectedBusiness.formatted_address && (
                            <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                                {selectedBusiness.formatted_address}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={onSubmit}
                    disabled={!selectedBusiness || isSubmitting}
                    loading={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Rozpocznij weryfikację
                </Button>
            </div>
        </div>
    );
}