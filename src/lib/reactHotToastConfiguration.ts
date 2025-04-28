import { DefaultToastOptions } from "react-hot-toast";

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

export { toastOptions };