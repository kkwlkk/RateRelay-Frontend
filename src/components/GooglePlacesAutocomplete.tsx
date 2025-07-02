import { Input } from "./ui/input"
import { useLoadScript, Libraries } from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';
import { Loader2, MapPin, AlertTriangle, Search } from 'lucide-react';
import { useDebounceValue } from 'usehooks-ts';

interface GooglePlacesAutocompleteProps {
    onPlaceSelected?: (place: google.maps.places.PlaceResult) => void;
    onSearchStatusChange?: (status: { searching: boolean, noResults: boolean, searchPerformed: boolean }) => void;
    placeholder?: string;
    className?: string;
    debounceTime?: number;
    title?: string;
    description?: string;
}

interface PredictionItemProps {
    prediction: google.maps.places.AutocompletePrediction;
    onSelect: (placeId: string) => void;
}

const libraries: Libraries = ['places'];
const DEFAULT_DEBOUNCE_TIME = 300;
const MIN_INPUT_LENGTH = 2;

const useGooglePlacesServices = () => {
    const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
    const placesService = useRef<google.maps.places.PlacesService | null>(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries,
    });

    useEffect(() => {
        if (isLoaded && !autocompleteService.current) {
            autocompleteService.current = new google.maps.places.AutocompleteService();
            const mapDiv = document.createElement('div');
            placesService.current = new google.maps.places.PlacesService(mapDiv);
        }
    }, [isLoaded]);

    return { isLoaded, loadError, autocompleteService, placesService };
};

const PredictionItem = ({ prediction, onSelect }: PredictionItemProps) => (
    <div
        className="px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer border-b border-zinc-200 dark:border-zinc-700 last:border-b-0 transition-colors"
        onClick={() => onSelect(prediction.place_id)}
    >
        <div className="flex items-center gap-3">
            <div className="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800">
                <MapPin className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {prediction.structured_formatting?.main_text || prediction.description}
                </div>
                {prediction.structured_formatting?.secondary_text && (
                    <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-0.5 truncate">
                        {prediction.structured_formatting.secondary_text}
                    </div>
                )}
            </div>
        </div>
    </div>
);

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
        <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-700 mb-3">
            <Loader2 className="h-6 w-6 text-zinc-500 dark:text-zinc-400 animate-spin" />
        </div>
        <span className="text-zinc-600 dark:text-zinc-400 text-sm">Ładowanie wyszukiwania miejsc...</span>
    </div>
);

const ErrorState = () => (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30 mb-3">
            <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
        </div>
        <p className="text-red-600 dark:text-red-400 text-sm text-center">
            Błąd ładowania Google Maps. Spróbuj ponownie później.
        </p>
    </div>
);

const GooglePlacesAutocomplete = ({
    onPlaceSelected,
    onSearchStatusChange,
    placeholder = "Wyszukaj miejsce...",
    className,
    debounceTime = DEFAULT_DEBOUNCE_TIME,
    title = "Wyszukaj lokalizację",
    description = "Wpisz adres lub nazwę miejsca, aby znaleźć jego lokalizację na mapie."
}: GooglePlacesAutocompleteProps) => {
    const [inputValue, setInputValue] = useState('');
    const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showPredictions, setShowPredictions] = useState(false);
    const [placeWasSelected, setPlaceWasSelected] = useState(false);
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { isLoaded, loadError, autocompleteService, placesService } = useGooglePlacesServices();
    const [debouncedInputValue] = useDebounceValue(inputValue, debounceTime);

    useEffect(() => {
        if (onSearchStatusChange) {
            onSearchStatusChange({
                searching: isTyping,
                noResults: noResultsFound,
                searchPerformed: searchPerformed
            });
        }
    }, [isTyping, noResultsFound, searchPerformed, onSearchStatusChange]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowPredictions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!debouncedInputValue ||
            debouncedInputValue.length < MIN_INPUT_LENGTH ||
            !autocompleteService.current ||
            placeWasSelected) {
            if (!placeWasSelected) {
                setPredictions([]);
            }
            setIsTyping(false);
            if (placeWasSelected) {
                setPlaceWasSelected(false);
            }
            return;
        }

        setNoResultsFound(false);
        setIsTyping(true);

        const fetchPredictions = async () => {
            try {
                const request: google.maps.places.AutocompletionRequest = {
                    input: debouncedInputValue,
                    types: ['establishment']
                };

                autocompleteService.current?.getPlacePredictions(
                    request,
                    (results, status) => {
                        setSearchPerformed(true);

                        if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
                            setPredictions(results);
                            setNoResultsFound(false);
                            if (document.activeElement === inputRef.current) {
                                setShowPredictions(true);
                            }
                        } else {
                            setPredictions([]);
                            setNoResultsFound(true);
                            setShowPredictions(false);
                        }
                        setIsTyping(false);
                    }
                );
            } catch (error) {
                console.error('Error fetching predictions:', error);
                setIsTyping(false);
                setSearchPerformed(true);
                setNoResultsFound(true);
            }
        };

        fetchPredictions();
    }, [autocompleteService, debouncedInputValue, placeWasSelected]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length < MIN_INPUT_LENGTH) {
            setPredictions([]);
            setShowPredictions(false);
            setSearchPerformed(false);
            setNoResultsFound(false);
        } else {
            setIsTyping(true);
        }
    };

    const handlePlaceSelect = (placeId: string) => {
        if (!placesService.current) return;

        placesService.current.getDetails(
            { placeId, fields: ['name', 'geometry', 'formatted_address', 'place_id'] },
            (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                    setPlaceWasSelected(true);
                    onPlaceSelected?.(place);
                    const fullValue = `${place.name} (${place.formatted_address})`;
                    setInputValue(fullValue);
                    setPredictions([]);
                    setShowPredictions(false);
                    setNoResultsFound(false);
                    inputRef.current?.blur();
                } else {
                    setNoResultsFound(true);
                }
            }
        );
    };

    if (loadError) return <ErrorState />;
    if (!isLoaded) return <LoadingState />;

    return (
        <div className={`space-y-4 ${className}`}>
            {title && (
                <div className="space-y-1">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
                    {description && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
                    )}
                </div>
            )}

            <div className="relative" ref={containerRef}>
                <div className="relative">
                    <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-10 py-2.5 border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100"
                        onFocus={() => inputValue.length > MIN_INPUT_LENGTH && predictions.length > 0 && setShowPredictions(true)}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <Search className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    </div>
                    {isTyping && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 className="h-4 w-4 text-zinc-400 dark:text-zinc-500 animate-spin" />
                        </div>
                    )}
                </div>

                {showPredictions && predictions.length > 0 && (
                    <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-900 shadow-lg rounded-lg border border-zinc-200 dark:border-zinc-700 max-h-60 overflow-y-auto">
                        {predictions.map((prediction) => (
                            <PredictionItem
                                key={prediction.place_id}
                                prediction={prediction}
                                onSelect={handlePlaceSelect}
                            />
                        ))}
                    </div>
                )}

                {searchPerformed && noResultsFound && inputValue.length >= MIN_INPUT_LENGTH && (
                    <div className="absolute z-50 mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                            <Search className="h-4 w-4" />
                            <span className="text-sm">Nie znaleziono wyników dla &quot;{inputValue}&quot;</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { GooglePlacesAutocomplete };