import NextAuth from 'next-auth/next';

declare module 'next-auth' {
    type Session = {
        user: {
            id: string
            email: string
            name: string
            token: string
        }
    }
}