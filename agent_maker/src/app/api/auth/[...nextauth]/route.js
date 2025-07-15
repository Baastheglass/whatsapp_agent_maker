import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// CHANGE THIS LINE:
// import { get_user } from '../../../lib/database'
// TO THIS:
import { get_user } from '../../../../lib/database'

const handler = NextAuth({
  providers: [
    // Email/Password Login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
            const user = await get_user(credentials.email, credentials.password)
          if(user)
          {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              firstName: user.firstName,
              lastName: user.lastName
            }
          }
          
          // If credentials don't match, return null
          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  
  pages: {
    signIn: '/login',        // Custom login page
    // signUp: '/signup',    // NextAuth doesn't have built-in signup page, we'll handle this custom
  },
  
  callbacks: {
    async session({ session, token }) {
      // Add user ID to session
      if (token?.sub) {
        session.user.id = token.sub
      }
      if (token?.firstName) {
        session.user.firstName = token.firstName
      }
      if (token?.lastName) {
        session.user.lastName = token.lastName
      }
      return session
    },
    
    async jwt({ token, user }) {
      // Add user info to JWT token
      if (user) {
        token.id = user.id
        token.firstName = user.firstName
        token.lastName = user.lastName
      }
      return token
    },
    
    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after successful login
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/dashboard`
    }
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
