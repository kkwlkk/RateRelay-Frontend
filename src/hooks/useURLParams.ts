import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useURLParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const removeParam = (paramName: string) => {
        const params = new URLSearchParams(searchParams);
        params.delete(paramName);
        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
        router.replace(newUrl);
    };

    const setParam = (paramName: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(paramName, value);
        router.replace(`${pathname}?${params.toString()}`);
    };

    const getParam = (paramName: string) => {
        return searchParams.get(paramName);
    };

    return { removeParam, setParam, getParam };
};