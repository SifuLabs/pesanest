import ApiService from './ApiService'

import type {
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignUpResponse,
} from '@/@types/auth'

export async function apiSignUp(data: SignUpCredential): Promise<SignUpResponse> {
    const res = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        return {
            status: 'failed',
            message: errorData.message || 'Failed to register',
        }
    }
    const result = await res.json()
    return {
        status: result.status || 'success',
        message: result.message || 'Account created successfully',
    }
}

export async function apiForgotPassword<T>(data: ForgotPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/auth/forgot-password',
        method: 'post',
        data,
    })
}

export async function apiResetPassword<T>(data: ResetPassword) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/auth/reset-password',
        method: 'post',
        data,
    })
}
