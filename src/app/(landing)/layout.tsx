import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 mt-12">
                {children}
            </main>
            <Footer />
        </div>
    );
}