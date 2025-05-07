import { cn } from "@/lib/utils";
import { Star } from "lucide-react"
import { AlertCircle, Sparkles, Target, TrendingUp, Trophy } from "lucide-react";

export type RatingOption = {
    value: number;
    label: string;
    color: string;
    icon: React.ReactNode;
    description: string;
}

type RatingOptionsProps = {
    selectedOption?: RatingOption;
    setSelectedOption: (option: RatingOption) => void;
}

const ratingOptions: RatingOption[] = [
    {
        value: 1,
        label: 'Słabe',
        color: 'text-red-500 bg-red-500/10 border-red-500/20',
        icon: <AlertCircle className="w-5 h-5" />,
        description: 'Znaczące problemy z usługą lub jakością'
    },
    {
        value: 2,
        label: 'Przeciętne',
        color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
        icon: <TrendingUp className="w-5 h-5 rotate-180" />,
        description: 'Poniżej oczekiwań, wymaga poprawy'
    },
    {
        value: 3,
        label: 'Dobre',
        color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
        icon: <Target className="w-5 h-5" />,
        description: 'Spełnia oczekiwania, satysfakcjonujące'
    },
    {
        value: 4,
        label: 'Świetne',
        color: 'text-green-500 bg-green-500/10 border-green-500/20',
        icon: <Trophy className="w-5 h-5" />,
        description: 'Powyżej średniej, warte polecenia'
    },
    {
        value: 5,
        label: 'Doskonałe',
        color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        icon: <Sparkles className="w-5 h-5" />,
        description: 'Wyjątkowa obsługa i jakość'
    }
];

export const RatingOptions = ({ selectedOption, setSelectedOption }: RatingOptionsProps) => {
    return (
        ratingOptions.map((option) => (
            <button
                key={option.value}
                type="button"
                onClick={() => setSelectedOption(option)}
                className={cn(
                    'p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-102 active:scale-98',
                    selectedOption?.value === option.value
                        ? `${option.color} shadow-lg scale-105`
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                )}
            >
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                    <div className={cn(selectedOption?.value === option.value ? `${option.color} bg-transparent` : 'text-zinc-400 dark:text-zinc-500')}>
                        {option.icon}
                    </div>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{option.label}</span>
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < option.value
                                    ? 'fill-current text-yellow-500'
                                    : 'text-zinc-300 dark:text-zinc-700'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </button>
        ))
    )
}
