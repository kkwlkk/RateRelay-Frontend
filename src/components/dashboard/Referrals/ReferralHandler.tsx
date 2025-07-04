'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { setCookie, getCookie } from 'cookies-next';

function ReferralHandlerInner() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const refCode = searchParams.get('ref');
        const existingReferralCode = getCookie('pendingReferralCode');

        if (refCode && !existingReferralCode) {
            setCookie('pendingReferralCode', refCode, {
                maxAge: 60 * 60 * 24 * 30,
                httpOnly: false,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });
        }
    }, [searchParams]);

    return null;
}

export function ReferralHandler() {
    return (
        <Suspense fallback={null}>
            <ReferralHandlerInner />
        </Suspense>
    );
}