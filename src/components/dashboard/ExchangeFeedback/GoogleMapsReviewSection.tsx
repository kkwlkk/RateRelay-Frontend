import { useState } from "react";
import { Award, ExternalLink } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { Control, useController } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PointsInfoSection } from "./PointsInfoSection";
import { FeedbackFormData } from "@/types/feedback";
import { cn } from "@/lib/utils";

type GoogleMapsReviewSectionProps = {
    control: Control<FeedbackFormData>;
    businessMapUrl: string;
};

export const GoogleMapsReviewSection = ({
    control,
    businessMapUrl,
}: GoogleMapsReviewSectionProps) => {
    const [showPointRewards, setShowPointRewards] = useState(false);
    const togglePointRewards = () => setShowPointRewards(prev => !prev);
    const { field } = useController({
        control: control,
        name: 'postedGoogleReview'
    });

    return (
        <section className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
            <div className="flex items-center justify-between gap-2 mb-3">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 flex flex-row items-center gap-1.5 text-sm sm:text-base">
                    <Award className="h-4 w-4 text-amber-500 flex-shrink-0" />
                    <span>Zdobądź więcej punktów</span>
                </h4>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                    onClick={togglePointRewards}
                >
                    Pokaż informacje o punktach
                </Button>
            </div>
            {showPointRewards && <PointsInfoSection />}
            <div className="p-3 sm:p-4 rounded-lg border border-blue-200 dark:border-blue-500/10 bg-blue-50 dark:bg-blue-900/10">
                <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex items-center h-5 pt-1">
                        <Checkbox
                            id="postedGoogleReview"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="h-4 w-4 sm:h-5 sm:w-5 rounded-md border-zinc-300 dark:border-zinc-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                        />
                    </div>

                    <div className="flex-1 min-w-0 max-w-full">
                        <label
                            htmlFor="postedGoogleReview"
                            className="text-sm font-medium cursor-pointer text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5"
                        >
                            <FaGoogle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <span className="line-clamp-2">Wystawiłem/am również opinię w Google Maps</span>
                        </label>

                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-2">
                            Zaznacz to pole, jeśli zamieściłeś/aś opinię również w Google Maps (+1 punkt)
                        </p>

                        <div className="mt-2">
                            <Button
                                type="button"
                                className={cn(
                                    "bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30",
                                    "text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
                                    "rounded-md py-1.5 px-3 text-xs max-w-[30rem] flex items-center gap-1 justify-center",
                                    "overflow-hidden mt-4"
                                )}
                                onClick={() => window.open(businessMapUrl, '_blank')}
                                aria-label="Open Google Maps business page"
                            >
                                <FaGoogle className="h-3.5 w-3.5 flex-shrink-0" />
                                <span className="truncate max-w-[180px]">Przejdź do Google Maps</span>
                                <ExternalLink className="h-3 w-3 flex-shrink-0 ml-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};