import 'next-auth';

declare module 'next-auth' {
    /**
     * Extends the built-in session type
     */
    interface Session {
        accessToken?: string;
        refreshToken?: string;
        isNewUser?: boolean;
    }
}

declare module 'next-auth/jwt' {
    /**
     * Extends the built-in JWT type
     */
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        isNewUser?: boolean;
    }
}