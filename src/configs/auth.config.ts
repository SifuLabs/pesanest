import type { NextAuthConfig, User as NextAuthUser } from 'next-auth'
import validateCredential from '../server/actions/user/validateCredential'
import Credentials from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import type { SignInCredential } from '@/@types/auth'

// Extend NextAuth User and Session types to include 'role', 'token', and 'accessToken'
declare module 'next-auth' {
    interface User {
        role?: string
        token?: string
    }
    interface Session {
        accessToken?: string
    }
}

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_AUTH_CLIENT_ID,
            clientSecret: process.env.GITHUB_AUTH_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials) {
                const res = await fetch('http://localhost:8080/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(credentials),
                })
                if (!res.ok) return null
                const data = await res.json()
                if (!data?.user) return null
                // Map backend user fields to NextAuth user object
                return {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                    token: data.token, // Save JWT for later use
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.accessToken = user.token
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.sub ?? ''
            session.user.role = typeof token.role === 'string' ? token.role : undefined
            session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined
            return session
        },
    },
} satisfies NextAuthConfig
