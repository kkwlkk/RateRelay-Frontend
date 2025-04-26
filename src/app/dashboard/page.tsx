'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';

export default function DashboardPage() {
    const { user, logout } = useAuth();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [verificationStatus, setVerificationStatus] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await apiService.getBusinessVerificationStatus();
                if (response.success) {
                    setVerificationStatus(response.data);
                }
            } catch (error) {
                console.error('Error fetching verification status:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    const handleInitiateVerification = async () => {
        // This is just a placeholder - you'd need a UI to input the placeId
        const placeId = prompt('Enter Google Place ID:');
        if (!placeId) return;

        try {
            setIsLoading(true);
            const response = await apiService.initiateBusinessVerification(placeId);
            if (response.success) {
                setVerificationStatus(response.data);
                alert('Verification initiated successfully!');
            } else {
                alert(`Error: ${response.error?.message || 'Something went wrong'}`);
            }
        } catch (error) {
            console.error('Error initiating verification:', error);
            alert('Failed to initiate verification. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <div className="flex items-center">
                            <div className="mr-4">
                                <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <button
                                onClick={logout}
                                className="ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </header>
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 text-gray-900">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Account Information</h2>
                                <p><strong>Points Balance:</strong> {user?.pointBalance || 0}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Business Verification</h2>
                                {isLoading ? (
                                    <p>Loading verification status...</p>
                                ) : verificationStatus ? (
                                    <div>
                                        <p><strong>Status:</strong> {verificationStatus.status}</p>
                                        {verificationStatus.isVerified ? (
                                            <p className="text-green-600 font-semibold">Your business is verified! ✓</p>
                                        ) : (
                                            <div>
                                                <p className="text-yellow-600">Verification in progress</p>
                                                <button
                                                    onClick={() => window.location.href = '/verification'}
                                                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                >
                                                    Complete Verification
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <p>No active verification found.</p>
                                        <button
                                            onClick={handleInitiateVerification}
                                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        >
                                            Start Verification
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold mb-2">Review Businesses</h2>
                                <button
                                    onClick={() => window.location.href = '/review'}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Start Reviewing
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}