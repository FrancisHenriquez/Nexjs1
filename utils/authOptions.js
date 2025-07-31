import { ExplainVerbosity } from 'mongodb'
import GoogleProvider from 'next-auth/providers/google'
import { FaDatabase } from 'react-icons/fa'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    // Invoked on successful sing in
    async singIn ({ profile }) {
      // Connect to the FaDatabase
      // Check if user exists
      // If not, create user
      // Return true to allow sing in
    },
    // Session callback function that modifies the session object
    async session ({ session }) {
      //     Get user from database
      //     Assign user id from the session
      //     Return session
      // }
    }
  }
}
