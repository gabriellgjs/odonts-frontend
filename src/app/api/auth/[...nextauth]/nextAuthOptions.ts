import api from '@/lib/axios'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        const response = await api
          .post('login', {
            email: credentials?.email,
            password: credentials?.password,
          })
          .then((res) => {
            const user = res.data
            return user
          })

        if (response?.user) {
          return response.user
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token }) {
      'use server'
      const cookiesApp = cookies()
      session = token as never
      cookiesApp.set('access-token', session.user.token ?? '')

      return session
    },
  },
}

export default nextAuthOptions
