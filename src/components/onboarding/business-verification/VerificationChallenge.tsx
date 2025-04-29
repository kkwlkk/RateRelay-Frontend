import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock } from 'lucide-react';
import { BusinessVerificationChallengeResponseDto } from '@/types/dtos/BusinessVerificaton';
import dayjs from '@/utils/dayjsConfig';

const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
};

const getWeekdayName = (day: number) => {
    return dayjs(day).format('dddd');
};

function IconContainer({ children, bgColor = "bg-blue-50" }: { children: React.ReactNode, bgColor?: string }) {
    return (
        <div className={`${bgColor} p-2 rounded-lg`}>
            {children}
        </div>
    );
}

function VerificationHeader() {
    return (
        <div className="flex items-center gap-3 mb-6">
            <IconContainer bgColor="bg-blue-100">
                <Calendar className="w-6 h-6 text-blue-600" />
            </IconContainer>
            <h2 className="text-2xl font-semibold text-gray-900">
                Harmonogram weryfikacji
            </h2>
        </div>
    );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-start gap-3">
            <IconContainer>{icon}</IconContainer>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-lg font-semibold text-blue-700">{value}</p>
            </div>
        </div>
    );
}

function InstructionStep({ number, children }: { number: number, children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg border border-gray-200 w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">{number}</span>
            </div>
            <div className="text-gray-600">
                {children}
            </div>
        </div>
    );
}

interface VerificationDetailsProps {
    challenge: BusinessVerificationChallengeResponseDto;
}

function VerificationDetails({ challenge }: VerificationDetailsProps) {
    return (
        <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                Szczegóły weryfikacji
            </h3>
            <div className="space-y-4">
                <InfoItem
                    icon={<Calendar className="w-5 h-5 text-blue-600" />}
                    label="Dzień weryfikacji"
                    value={getWeekdayName(challenge.verificationDay)}
                />
                <InfoItem
                    icon={<Clock className="w-5 h-5 text-blue-600" />}
                    label="Godzina otwarcia"
                    value={formatTime(challenge.verificationOpeningTime)}
                />
                <InfoItem
                    icon={<Clock className="w-5 h-5 text-blue-600" />}
                    label="Godzina zamknięcia"
                    value={formatTime(challenge.verificationClosingTime)}
                />
            </div>
        </div>
    );
}

interface VerificationInstructionsProps {
    challenge: BusinessVerificationChallengeResponseDto;
}

function VerificationInstructions({ challenge }: VerificationInstructionsProps) {
    return (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
                Jak przeprowadzić weryfikację?
            </h3>
            <div className="space-y-4">
                <InstructionStep number={1}>
                    <p>W dniu weryfikacji ({getWeekdayName(challenge.verificationDay)}):</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                        <li>Ustaw godzinę otwarcia na dokładnie {formatTime(challenge.verificationOpeningTime)}</li>
                        <li>Ustaw godzinę zamknięcia na dokładnie {formatTime(challenge.verificationClosingTime)}</li>
                    </ul>
                </InstructionStep>
                <InstructionStep number={2}>
                    <p>Po ustawieniu godzin, kliknij &quot;Zweryfikuj firmę&quot; aby rozpocząć proces</p>
                </InstructionStep>
                <InstructionStep number={3}>
                    <p>System automatycznie sprawdzi ustawione godziny otwarcia i zamknięcia w odpowiednim dniu</p>
                </InstructionStep>
                <InstructionStep number={4}>
                    <p>Po zakończeniu weryfikacji, możesz przywrócić normalne godziny otwarcia i zamknięcia</p>
                </InstructionStep>
            </div>
        </div>
    );
}

interface VerificationChallengeProps {
    challenge: BusinessVerificationChallengeResponseDto;
    onVerify: () => void;
    isSubmitting: boolean;
}

export function VerificationChallenge({ challenge, onVerify, isSubmitting }: VerificationChallengeProps) {
    return (
        <Card className="shadow-lg my-6 border border-gray-100">
            <CardContent className="px-8 py-4">
                <VerificationHeader />
                <div className="space-y-8">
                    <VerificationDetails challenge={challenge} />
                    <VerificationInstructions challenge={challenge} />

                    <div className="flex justify-end">
                        <Button
                            onClick={onVerify}
                            disabled={isSubmitting}
                            className="h-10 px-6 text-base rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:hover:translate-y-0"
                            loading={isSubmitting}
                        >
                            Zweryfikuj firmę
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}