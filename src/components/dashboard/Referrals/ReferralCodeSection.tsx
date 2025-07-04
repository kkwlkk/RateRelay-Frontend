import React, { useState } from 'react';
import { Share2, Copy, CheckCircle2, Gift, Plus, UserCheck, X, Link, MessageCircle, ExternalLink } from 'lucide-react';
import { apiService } from "@/services/api";
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ApiError } from '@/types/exceptions';

interface ReferralCodeSectionProps {
    referralCode?: string;
    referredByCode?: string;
    isLoading: boolean;
}

export const ReferralCodeSection = ({ referralCode, referredByCode, isLoading }: ReferralCodeSectionProps) => {
    const queryClient = useQueryClient();
    const [copied, setCopied] = useState<'code' | 'link' | 'message' | null>(null);
    const [showLinkForm, setShowLinkForm] = useState(false);
    const [referralCodeInput, setReferralCodeInput] = useState('');
    const [showShareOptions, setShowShareOptions] = useState(false);

    const generateReferralLink = () => {
        const baseUrl = window.location.origin;
        return `${baseUrl}/login?ref=${referralCode}`;
    };

    const generateShareMessage = () => {
        return `Hej! Dołącz do mnie na TrustRate używając mojego kodu polecającego: ${referralCode}\n\nLub kliknij bezpośrednio: ${generateReferralLink()}`;
    };

    const handleCopy = async (type: 'code' | 'link' | 'message', content: string) => {
        await navigator.clipboard.writeText(content);
        setCopied(type);

        const messages = {
            code: 'Kod skopiowany!',
            link: 'Link skopiowany!',
            message: 'Wiadomość skopiowana!'
        };

        toast.success(messages[type]);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleNativeShare = async () => {
        if (!referralCode) return;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Dołącz do mnie!',
                    text: `Użyj mojego kodu polecającego: ${referralCode}`,
                    url: generateReferralLink(),
                });
            } catch {
                console.log('Share cancelled or failed');
            }
        } else {
            handleCopy('link', generateReferralLink());
        }
    };

    const linkReferralCodeMutation = useMutation({
        mutationFn: async (code: string) => {
            const response = await apiService.linkReferralCode(code.trim());

            if (!response.success) {
                throw ApiError.fromResponse(response);
            }

            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['referralStats'] });
            toast.success('Kod polecający został dodany!');
            setShowLinkForm(false);
            setReferralCodeInput('');
        },
        onError: (error: ApiError) => {
            if (error.code === "ReferralCodeInvalid") {
                toast.error('Kod polecający jest nieprawidłowy');
                return;
            }

            if (error.code === "ReferralLinkFailed") {
                toast.error('Nie możesz użyć tego linku polecającego');
                return;
            }

            console.error('Error linking referral code:', error);
            toast.error('Wystąpił błąd podczas łączenia kodu polecającego');
        },
    });

    const handleLinkCode = async () => {
        if (referralCodeInput.trim()) {
            linkReferralCodeMutation.mutate(referralCodeInput);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-8 text-white relative">
                <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                Twój kod polecający
                            </h3>
                            <p className="text-blue-100 text-sm leading-relaxed">
                                Udostępnij znajomym i zdobywaj punkty za każde polecenie
                            </p>
                        </div>
                        <div className="p-3 rounded-xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/10 shadow-lg">
                            <Share2 className="h-6 w-6 text-white" />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-16 w-full bg-white/20 rounded-xl" />
                            <Skeleton className="h-12 w-full bg-white/20 rounded-xl" />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div
                                className="relative group cursor-pointer"
                                onClick={() => handleCopy('code', referralCode || '')}
                            >
                                <div className="flex items-center gap-4 bg-gradient-to-r from-white/15 to-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:from-white/25 hover:to-white/20 hover:border-white/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    <code className="flex-1 text-2xl font-mono font-bold text-white tracking-wider drop-shadow-sm">
                                        {referralCode || 'Brak kodu'}
                                    </code>
                                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-white/20 to-white/10 group-hover:from-white/30 group-hover:to-white/20 transition-all duration-300 border border-white/10">
                                        {copied === 'code' ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-300" />
                                        ) : (
                                            <Copy className="h-5 w-5 text-white group-hover:scale-110 transition-transform duration-200" />
                                        )}
                                    </div>
                                </div>
                                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Kliknij aby skopiować kod
                                </div>
                            </div>

                            <div className="relative">
                                <button
                                    onClick={() => setShowShareOptions(!showShareOptions)}
                                    className="cursor-pointer w-full flex items-center justify-center gap-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:from-white/15 hover:to-white/10 hover:border-white/30 transition-all duration-300 text-white font-medium"
                                >
                                    <Share2 className="h-5 w-5" />
                                    <span>Opcje udostępniania</span>
                                    <div className={`transition-transform duration-200 ${showShareOptions ? 'rotate-180' : ''}`}>
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {showShareOptions && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-xl border border-white/30 dark:border-white/20 shadow-xl overflow-hidden z-50">
                                        <div className="p-1">
                                            <button
                                                onClick={() => handleCopy('link', generateReferralLink())}
                                                className="cursor-pointer w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/10 transition-all duration-200 text-slate-700 dark:text-white text-sm font-medium"
                                            >
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-white/10">
                                                    {copied === 'link' ? (
                                                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                    ) : (
                                                        <Link className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    )}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="font-medium">Skopiuj link</div>
                                                    <div className="text-xs text-slate-500 dark:text-white/60">Link z automatycznym kodem</div>
                                                </div>
                                            </button>

                                            <button
                                                onClick={() => handleCopy('message', generateShareMessage())}
                                                className="cursor-pointer w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/10 transition-all duration-200 text-slate-700 dark:text-white text-sm font-medium"
                                            >
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-white/10">
                                                    {copied === 'message' ? (
                                                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                    ) : (
                                                        <MessageCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    )}
                                                </div>
                                                <div className="flex-1 text-left">
                                                    <div className="font-medium">Skopiuj wiadomość</div>
                                                    <div className="text-xs text-slate-500 dark:text-white/60">Gotowy tekst do wysłania</div>
                                                </div>
                                            </button>

                                            {'share' in navigator && (
                                                <button
                                                    onClick={handleNativeShare}
                                                    className="cursor-pointer w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-white/10 transition-all duration-200 text-slate-700 dark:text-white text-sm font-medium"
                                                >
                                                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-white/10">
                                                        <ExternalLink className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="font-medium">Udostępnij</div>
                                                        <div className="text-xs text-slate-500 dark:text-white/60">Otwórz menu udostępniania</div>
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200">
                {isLoading ? (
                    <>
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex-1">
                                <Skeleton className="h-7 w-48 mb-2 bg-zinc-200 dark:bg-zinc-800" />
                                <Skeleton className="h-4 w-64 bg-zinc-200 dark:bg-zinc-800" />
                            </div>
                            <Skeleton className="h-12 w-12 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                        </div>
                        <Skeleton className="h-14 w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                    </>
                ) : referredByCode ? (
                    <>
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                    Użyty kod polecający
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                    Zostałeś polecony przez znajomego
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/20">
                                <UserCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
                            <code className="flex-1 text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100 tracking-wider text-center">
                                {referredByCode}
                            </code>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                    Masz kod polecający?
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                    Wpisz kod polecający od znajomego, aby otrzymać bonus powitalny
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                <Gift className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </div>
                        </div>

                        {!showLinkForm ? (
                            <Button
                                onClick={() => setShowLinkForm(true)}
                                className="w-full h-fit bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-4 rounded-xl font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all duration-200"
                            >
                                Wprowadź kod polecający
                            </Button>
                        ) : (
                            <div className="flex gap-2">
                                <Input
                                    type='text'
                                    value={referralCodeInput}
                                    onChange={(e) => setReferralCodeInput(e.target.value)}
                                    placeholder="Wpisz kod polecający"
                                    className="h-fit px-4 py-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-mono text-center"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            handleLinkCode();
                                        }
                                    }}
                                />
                                {referralCodeInput.length > 0 ? (
                                    <Button
                                        onClick={handleLinkCode}
                                        disabled={!referralCodeInput.trim() || linkReferralCodeMutation.isPending}
                                        className="h-auto bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
                                        icon={<Plus className="h-5 w-5" />}
                                    />
                                ) : (
                                    <Button
                                        onClick={() => setShowLinkForm(false)}
                                        disabled={linkReferralCodeMutation.isPending}
                                        className="h-auto bg-zinc-500 text-white py-3 rounded-xl font-semibold hover:bg-zinc-600 transition-all duration-200 disabled:opacity-50"
                                        icon={<X className="h-5 w-5" />}
                                    />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};