import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function OnboardingPage() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 my-8"></div>
                <p className="text-gray-600">Przekierowanie do odpowiedniego kroku...</p>
            </div>
        </ProtectedRoute>
    );
}