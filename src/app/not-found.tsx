import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { isDev } from '@/utils/environmentUtils';

export default async function NotFound() {
    if (!isDev) {
        const session = await auth();

        if (session && session.user && session.user.hasCompletedOnboarding) {
            return redirect('/dashboard');
        }

        return redirect('/');
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                <p className="text-lg mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
                <p className="text-sm text-gray-500">
                    (This 404 page is only shown in development mode)
                </p>
            </div>
        </div>
    );
}