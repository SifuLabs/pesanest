'use client'

import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import SignUp from '@/components/auth/SignUp'
import { apiSignUp } from '@/services/AuthService'
import { useRouter } from 'next/navigation'
import type { OnSignUpPayload } from '@/components/auth/SignUp'

const SignUpClient = () => {
    const router = useRouter()

    const handlSignUp = async ({
        values,
        setSubmitting,
        setMessage,
    }: OnSignUpPayload) => {
        setSubmitting(true)
        try {
            const res = await apiSignUp(values)
            if (res.status === 'success') {
                toast.push(
                    <Notification title="Account created!" type="success">
                        You can now sign in from our sign in page
                    </Notification>,
                )
                router.push('/sign-in')
            } else {
                setMessage(res.message || 'Registration failed')
            }
        } catch (error) {
            setMessage((error as Error).message || 'Registration failed')
        } finally {
            setSubmitting(false)
        }
    }

    return <SignUp onSignUp={handlSignUp} />
}

export default SignUpClient
