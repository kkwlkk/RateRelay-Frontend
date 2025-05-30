import { isDev } from "@/utils/environmentUtils";
import NextAuth from "next-auth";
import "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const getTokenExpiryIsoString = (expires: number | undefined): string => {
    if (expires) {
        const date = new Date(expires * 1000);
        return date.toISOString();
    }
    return new Date(Date.now() + 60 * 60 * 24 * 1000).toISOString();
}

export const { handlers, auth } = NextAuth({
    trustHost: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    cookies: {
        sessionToken: {
            name: isDev ? "auth.session-token" : `__Secure-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production"
            }
        }
    },
    callbacks: {
        async jwt({ token, account, trigger, session }) {
            if (account && account.id_token) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            oAuthIdToken: account.id_token,
                        }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.error?.message || "Failed to authenticate with backend");
                    }

                    token.accessToken = data.data.accessToken;
                    token.refreshToken = data.data.refreshToken;
                    token.isNewUser = data.data.isNewUser;
                } catch (error) {
                    console.error("Error exchanging Google token:", error);
                    token.googleToken = account.id_token;
                    token.error = "BackendAuthError";
                }
            }

            if (trigger === "update" && session) {
                return {
                    ...token,
                    accessToken: session.accessToken || token.accessToken,
                    refreshToken: session.refreshToken || token.refreshToken,
                };
            }

            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                accessToken: token.accessToken as string,
                refreshToken: token.refreshToken as string,
                isNewUser: token.isNewUser as boolean,
                error: token.error as string | undefined,
                expires: getTokenExpiryIsoString(token.exp),
            };
        },
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    }
});