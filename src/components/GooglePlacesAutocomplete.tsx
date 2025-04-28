import { Input } from "./ui/Input"
import { useLoadScript, Libraries } from '@react-google-maps/api';
import { useRef, useState, useEffect } from 'react';
import { Loader2, MapPin, Info } from 'lucide-react';
import { useDebounce } from '@uidotdev/usehooks';
import { FaSearch } from 'react-icons/fa';

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
        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0 transition-colors duration-150"
        onClick={() => onSelect(prediction.place_id)}
    >
        <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div>
                <div className="font-medium text-gray-900">{prediction.structured_formatting?.main_text || prediction.description}</div>
                {prediction.structured_formatting?.secondary_text && (
                    <div className="text-gray-500 text-xs mt-0.5">{prediction.structured_formatting.secondary_text}</div>
                )}
            </div>
        </div>
    </div>
);

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-gray-200 bg-gray-50">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-3" />
        <span className="text-gray-500 text-sm">Ładowanie wyszukiwania miejsc...</span>
    </div>
);

const ErrorState = () => (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg border border-red-200 bg-red-50">
        <Info className="w-8 h-8 text-red-400 mb-3" />
        <p className="text-red-600 text-sm text-center">Błąd ładowania Google Maps. Spróbuj ponownie później.</p>
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
    const debouncedInputValue = useDebounce(inputValue, debounceTime);

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
                    types: ['geocode', 'establishment']
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
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            
            <div className="relative" ref={containerRef}>
                <div className="relative">
                    <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                        onFocus={() => inputValue.length > MIN_INPUT_LENGTH && predictions.length > 0 && setShowPredictions(true)}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <FaSearch className="w-4 h-4" />
                    </div>
                    {isTyping && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                        </div>
                    )}
                </div>

                {showPredictions && predictions.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                        {predictions.map((prediction) => (
                            <PredictionItem
                                key={prediction.place_id}
                                prediction={prediction}
                                onSelect={handlePlaceSelect}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export { GooglePlacesAutocomplete };