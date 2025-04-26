import { useState, useEffect } from "react";

export function useLocalStorageState<T>(key: string, defaultValue: T) {
    const isClient = typeof window !== 'undefined';

    const [state, setState] = useState<T>(() => {
        if (!isClient) {
            return defaultValue;
        }

        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : defaultValue;
        } catch (error) {
            console.error("Error reading localStorage key:", key, error);
            return defaultValue;
        }
    });

    useEffect(() => {
        if (!isClient) {
            return;
        }

        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error("Error writing to localStorage key:", key, error);
        }
    }, [isClient, key, state]);

    return [state, setState] as const;
}