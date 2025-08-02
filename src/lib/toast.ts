import { DefaultToastOptions } from "react-hot-toast";
import toast from "react-hot-toast";

const toastOptions: DefaultToastOptions = {
    duration: 5000,
    style: {
        background: '#fff',
        color: '#1f2937',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderRadius: '0.5rem',
        padding: '1rem',
        fontSize: '0.875rem',
        maxWidth: '32rem',
    },
    success: {
        style: {
            background: '#f0fdf4',
            color: '#166534',
            border: '1px solid #bbf7d0',
        },
        iconTheme: {
            primary: '#166534',
            secondary: '#f0fdf4',
        },
    },
    error: {
        style: {
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fecaca',
        },
        iconTheme: {
            primary: '#991b1b',
            secondary: '#fef2f2',
        },
    },
}

const showToast = {
    success: (message: string, id?: string) => {
        const toastId = id || 'success';
        toast.dismiss(toastId);
        return toast.success(message, { id: toastId });
    },

    error: (message: string, id?: string) => {
        const toastId = id || 'error';
        toast.dismiss(toastId);
        return toast.error(message, { id: toastId });
    },

    loading: (message: string, id?: string) => {
        const toastId = id || 'loading';
        toast.dismiss(toastId);
        return toast.loading(message, { id: toastId });
    },

    promise: <T>(
        promise: Promise<T>,
        messages: { loading: string; success: string; error: string },
        id?: string
    ) => {
        const toastId = id || 'promise';
        toast.dismiss(toastId);
        return toast.promise(promise, messages, { id: toastId });
    },

    custom: (jsx: React.ReactElement, id?: string) => {
        const toastId = id || 'custom';
        toast.dismiss(toastId);
        return toast.custom(jsx, { id: toastId });
    }
};

export { toastOptions, showToast };