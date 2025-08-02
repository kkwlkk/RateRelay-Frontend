import { apiService } from "@/services/api";
import { isDevelopment } from "@/utils/environment";
import NextAuth from "next-auth";
import "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

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
            name: isDevelopment() ? "auth.session-token" : `__Secure-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: isDevelopment() ? false : true
            }
        }
    },
    callbacks: {
        async jwt({ token, account, trigger, session }) {
            
            if (account && account.id_token) {
                try {
                    const cookieStore = cookies();
                    const referralCode = (await cookieStore).get('pendingReferralCode')?.value;

                    const response = await apiService.googleAuth(account.id_token, referralCode);

                    if (!response.success) {
                        throw new Error(response.error?.message || "Failed to authenticate with backend");
                    }

                    token.accessToken = response.data.accessToken;
                    token.refreshToken = response.data.refreshToken;
                    token.isNewUser = response.data.isNewUser;
                    token.backendAuthSuccess = true;
                    
                } catch (error) {
                    console.error("Error exchanging Google token:", error);
                    token.backendAuthSuccess = false;
                    token.error = "BackendAuthError";
                    return null;
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
            if (!token.backendAuthSuccess || token.error === "BackendAuthError") {
                return {
                    ...session,
                    error: "Authentication failed",
                    expires: getTokenExpiryIsoString(token.exp),
                };
            }

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
    events: {
        // async signOut(params) {
        //     let accessToken;

        //     if ('token' in params && params.token) {
        //         accessToken = params.token.accessToken;
        //     } else if ('session' in params && params.session) {
        //         accessToken = params.session.sessionToken;
        //     }

        //     if (accessToken) {
        //         try {
        //             await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/auth/logout`, {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json",
        //                     Authorization: `Bearer ${accessToken}`,
        //                 },
        //             });
        //         } catch (error) {
        //             console.error("Error during sign out:", error);
        //         }
        //     }
        // }
    },
    pages: {
        signIn: '/login',
        error: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
    }
});