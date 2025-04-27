'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) return;

        if (user && user.hasCompletedOnboarding) {
            router.push('/dashboard');
        } else {
            router.push('/onboarding');
        }
    }, [isAuthenticated, isLoading, router, user]);

    // const handleLogin = async () => {
    //     await login();
    // };

    // return (
    //     <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-background-primary">
    //         {/* Left side - Branding section (hidden on small screens) */}
    //         <div className='relative w-full md:w-3/5 h-screen md:block hidden bg-zinc-100 dark:bg-zinc-800 p-8 shadow-md'>
    //             <Image
    //                 src="/assets/bg-blob-purple-no-vornoi.svg"
    //                 alt="Background Blob"
    //                 fill
    //                 className="object-cover"
    //             />
    //             <div className="absolute top-30 left-32">
    //                 <Image
    //                     src="/assets/logo-white.png"
    //                     alt="Logo"
    //                     width={400}
    //                     height={400}
    //                 />
    //                 <p className="font-medium text-3xl text-shadow mb-4">
    //                     Platforma stworzona z myślą o Twoim biznesie.
    //                 </p>
    //                 <p className="text-md text-zinc-400 max-w-lg">
    //                     Zarządzaj, organizuj i dziel się swoimi recenzjami w prosty sposób.<br /> Wszystko w jednym miejscu.
    //                 </p>
    //             </div>
    //             <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center p-4">
    //                 <p className="text-sm text-zinc-400">
    //                     &copy; 2025 TrustRate. Wszelkie prawa zastrzeżone.
    //                 </p>
    //             </div>
    //         </div>
            
    //         {/* Mobile header with logo (visible only on mobile) */}
    //         <div className="flex flex-col items-center w-full px-6 pt-12 pb-6 md:hidden">
    //             <Image
    //                 src="/assets/logo-white.png"
    //                 alt="Logo"
    //                 width={200}
    //                 height={200}
    //             />
    //             <p className="font-medium text-xl text-center mt-4 mb-2">
    //                 Platforma stworzona z myślą o Twoim biznesie.
    //             </p>
    //         </div>
            
    //         {/* Right side - Login form */}
    //         <div className='w-full md:w-2/5 px-6 md:px-24 py-8 md:py-24 flex flex-col items-center justify-center'>
    //             <div className="w-full max-w-md flex flex-col items-center mb-6">
    //                 <h1 className="text-3xl md:text-4xl font-medium text-center mb-3">
    //                     Witaj ponownie
    //                 </h1>
    //                 <p className="text-md text-zinc-400 mb-6">
    //                     Zaloguj się, aby kontynuować
    //                 </p>
    //                 <Button
    //                     variant="outline"
    //                     className="w-full rounded-3xl my-3 dark:bg-zinc-900/80 dark:hover:bg-zinc-900/90 dark:text-zinc-50"
    //                     size="lg"
    //                     icon={<FaGoogle />}
    //                     onClick={handleLogin}
    //                 >
    //                     Zaloguj się z Google
    //                 </Button>
    //                 <p className="text-xs text-gray-500 mt-4 text-center">
    //                     Kontynuując, akceptujesz nasze&nbsp;
    //                     <Link href="/terms" className="text-blue-500 hover:underline">
    //                         Warunki korzystania
    //                     </Link>
    //                     &nbsp;i&nbsp;
    //                     <Link href="/privacy" className="text-blue-500 hover:underline">
    //                         Politykę prywatności
    //                     </Link>
    //                 </p>
    //             </div>
                
    //             {/* Mobile footer (visible only on mobile) */}
    //             <div className="mt-8 md:hidden text-center">
    //                 <p className="text-sm text-zinc-400">
    //                     &copy; 2025 TrustRate. Wszelkie prawa zastrzeżone.
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    // );
}