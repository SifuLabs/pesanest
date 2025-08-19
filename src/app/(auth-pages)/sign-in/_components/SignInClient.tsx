'use client'

import SignIn from '@/components/auth/SignIn'
import { signIn } from 'next-auth/react'
import handleOauthSignIn from '@/server/actions/auth/handleOauthSignIn'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useSearchParams, useRouter } from 'next/navigation'

import type {
    OnSignInPayload,
    OnOauthSignInPayload,
} from '@/components/auth/SignIn'

const SignInClient = () => {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get(REDIRECT_URL_KEY)
    const router = useRouter()

    const handleSignIn = async ({
        values,
        setSubmitting,
        setMessage,
    }: OnSignInPayload) => {
        setSubmitting(true)
        const res = await signIn('credentials', {
            ...values,
            redirect: false,
            callbackUrl: callbackUrl || '/home',
        })
        if (res?.error) {
            setMessage(res.error)
            setSubmitting(false)
            return
        }
        setMessage('Sign in successful!')
        setSubmitting(false)
        if (callbackUrl) {
            router.push(callbackUrl)
        } else {
            router.push('/home')
        }
    }

    const handleOAuthSignIn = async ({ type }: OnOauthSignInPayload) => {
        if (type === 'google') {
            await handleOauthSignIn('google')
        }
        if (type === 'github') {
            await handleOauthSignIn('github')
        }
    }

    return <SignIn onSignIn={handleSignIn} onOauthSignIn={handleOAuthSignIn} />
}

export default SignInClient
