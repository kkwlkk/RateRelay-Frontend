import { Building2 } from "lucide-react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { GetNextBusinessForReviewResponseDto } from "@/types/dtos/ReviewableBusiness";

type BusinessCardProps = {
    businessName: GetNextBusinessForReviewResponseDto['businessName'];
    mapUrl: GetNextBusinessForReviewResponseDto['mapUrl'];
}

export const BusinessCard = ({ businessName, mapUrl }: BusinessCardProps) => {
    return (
        <Card className="w-full py-2 overflow-hidden bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="text-zinc-900 dark:text-zinc-100 p-4">
                <div className="flex flex-wrap items-start gap-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 font-bold text-lg flex-shrink-0">
                        {businessName.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-medium mb-2 break-words">
                            {businessName}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            <Badge
                                variant="secondary"
                                className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border-0 text-xs"
                            >
                                Zweryfikowane
                            </Badge>
                            <button
                                type="button"
                                onClick={() => window.open(mapUrl, '_blank')}
                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-md text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                <span>Zobacz na mapie</span>
                                <ExternalLink className="w-2 h-2 flex-shrink-0" />
                            </button>
                        </div>
                    </div>
                    <Building2 className="w-8 h-8 text-zinc-700 dark:text-zinc-300 flex-shrink-0" />
                </div>
            </div>
        </Card>
    )
}