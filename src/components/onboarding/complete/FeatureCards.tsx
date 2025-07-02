import { MessageSquare, Building2, Award, Star, TrendingUp, Users } from 'lucide-react';

interface FeatureCardsProps {
    pointBalance: number;
}

export function FeatureCards({ pointBalance }: FeatureCardsProps) {
    const features = [
        {
            icon: MessageSquare,
            title: 'Oceń firmy',
            description: 'Dziel się swoimi doświadczeniami z innymi przedsiębiorcami',
            color: 'blue',
        },
        {
            icon: Building2,
            title: 'Zarządzaj firmami',
            description: 'Pełna kontrola nad profilami swoich firm',
            color: 'green',
        },
        {
            icon: Users,
            title: 'Społeczność',
            description: 'Dołącz do sieci zaufanych przedsiębiorców',
            color: 'purple',
        },
    ];

    const pointsInfo = [
        {
            icon: Star,
            text: 'Zdobywaj punkty za każdą udzieloną opinię',
        },
        {
            icon: TrendingUp,
            text: 'Buduj swoją reputację w społeczności',
        },
        {
            icon: Award,
            text: 'Wyższa pozycja = większa widoczność',
        },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/20`}>
                                <feature.icon className={`h-5 w-5 text-${feature.color}-600 dark:text-${feature.color}-400`} />
                            </div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {feature.title}
                            </h3>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                    Twoje punkty
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Aktualny stan konta
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {pointBalance}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-500">
                                punktów
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h4 className="font-medium text-zinc-900 dark:text-zinc-100 mb-3">
                        System punktowy
                    </h4>
                    <div className="space-y-3">
                        {pointsInfo.map((info, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <div className="p-1.5 rounded bg-zinc-100 dark:bg-zinc-800">
                                    <info.icon className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
                                </div>
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {info.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}