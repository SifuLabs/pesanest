'use server'

import type { SignUpCredential, SignUpResponse } from '@/@types/auth'

export const onSignUpWithCredentials = async ({
    email,
    name,
    password,
}: SignUpCredential): Promise<SignUpResponse> => {
    try {
        const res = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                name,
                password,
            }),
        })
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}))
            return {
                status: 'failed',
                message: errorData.message || 'Failed to register',
            }
        }
        const data = await res.json()
        return {
            status: data.status || 'success',
            message: data.message || 'Account created successfully',
        }
    } catch (error) {
        return {
            status: 'failed',
            message: (error as Error).message || 'Sign up failed',
        }
    }
}
