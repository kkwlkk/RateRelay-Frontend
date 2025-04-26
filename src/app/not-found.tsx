import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function NotFound() {
    const session = await auth();

    if (session) {
        return redirect('/dashboard');
    }

    return redirect('/');
}