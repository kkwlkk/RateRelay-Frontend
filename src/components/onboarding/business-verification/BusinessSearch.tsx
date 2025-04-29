import { Card, CardContent } from '@/components/ui/card';
import { GooglePlacesAutocomplete } from '@/components/GooglePlacesAutocomplete';
import { Button } from '@/components/ui/Button';

interface BusinessSearchProps {
    onBusinessSelect: (place: google.maps.places.PlaceResult) => void;
    onSubmit: () => void;
    selectedBusiness: google.maps.places.PlaceResult | null | undefined;
    isSubmitting: boolean;
}

export function BusinessSearch({ onBusinessSelect, onSubmit, selectedBusiness, isSubmitting }: BusinessSearchProps) {
    return (
        <Card className="shadow-lg my-10 border border-gray-100">
            <CardContent className="px-8 py-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Znajdź swoją firmę
                </h2>
                <div className="my-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm text-blue-700">
                    Nie znalazłeś swojej firmy? Sprawdź poprawność nazwy i upewnij się, że posiada ona przynajmniej 1 opinię w Google. W przeciwnym razie skontaktuj się z administratorem platformy.
                </p>
                 </div>

                <GooglePlacesAutocomplete
                    onPlaceSelected={onBusinessSelect}
                    placeholder="Wyszukaj swoją firmę..."
                    title=""
                    description=""
                />
                <div className="mt-6 flex justify-end">
                    <Button
                        onClick={onSubmit}
                        disabled={!selectedBusiness || isSubmitting}
                        className="h-10 px-6 text-base rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:hover:translate-y-0"
                        loading={isSubmitting}
                    >
                        Rozpocznij weryfikację
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 