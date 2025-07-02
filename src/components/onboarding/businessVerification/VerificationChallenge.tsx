import { Calendar, Clock } from 'lucide-react';
import { BusinessVerificationChallengeResponseDto } from '@/types/dtos/BusinessVerificaton';
import dayjs from '@/utils/dayjsConfig';

const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
};

const getWeekdayName = (day: number) => {
    const date = dayjs().day(day);
    return date.format('dddd');
};

interface VerificationChallengeProps {
    challenge: BusinessVerificationChallengeResponseDto;
    onVerify: () => void;
    isSubmitting: boolean;
}

export function VerificationChallenge({ challenge, onVerify, isSubmitting }: VerificationChallengeProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-500">Dzień weryfikacji</p>
                            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {getWeekdayName(challenge.verificationDay)}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                            <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-500">Otwarcie</p>
                            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatTime(challenge.verificationOpeningTime)}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
                            <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <p className="text-sm text-zinc-500 dark:text-zinc-500">Zamknięcie</p>
                            <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {formatTime(challenge.verificationClosingTime)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                    Instrukcje weryfikacji
                </h3>
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">1</span>
                        </div>
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                                Ustaw godziny w dniu {getWeekdayName(challenge.verificationDay)}:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>Otwarcie: {formatTime(challenge.verificationOpeningTime)}</li>
                                <li>Zamknięcie: {formatTime(challenge.verificationClosingTime)}</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">2</span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Kliknij przycisk &quot;Zweryfikuj firmę&quot; aby rozpocząć proces
                        </p>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">3</span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            System automatycznie sprawdzi ustawione godziny
                        </p>
                    </div>
                    
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">4</span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Po weryfikacji możesz przywrócić normalne godziny
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={onVerify}
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Weryfikowanie...' : 'Zweryfikuj firmę'}
                </button>
            </div>
        </div>
    );
}