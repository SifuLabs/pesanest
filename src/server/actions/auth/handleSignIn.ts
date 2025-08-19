'use server'

import type { SignInCredential, SignInResponse } from '@/@types/auth'

export const onSignInWithCredentials = async (
    { email, password }: SignInCredential, callbackUrl: string
): Promise<SignInResponse | { error: string; status: number; details?: unknown }> => {
    try {
        const res = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            return {
                error: data.error || data.message || 'Invalid credentials!',
                status: res.status,
                details: data,
            };
        }

        data.status = 200;
        data.callbackUrl = callbackUrl;
        return data;
    } catch (error) {
        return {
            error: (error as Error)?.message || 'Sign in failed',
            status: 0,
            details: error,
        };
    }
}
