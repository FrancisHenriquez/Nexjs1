<<<<<<< HEAD
import { data } from 'autoprefixer';
import GoogleProvider from 'next-auth/providers/google';
=======
import { ExplainVerbosity } from 'mongodb'
import GoogleProvider from 'next-auth/providers/google'
import { FaDatabase } from 'react-icons/fa'
>>>>>>> 09cfd8764ea0eb74a88d19e46c3c6cb77aa2b696

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
<<<<<<< HEAD
    // Invoked on succesful sing in
    async signIn({ profile }) {
      // 1. connect to the database
      // 2. check if the user exists
      // 3. if not, create user
      // 4. if the user does not exist, create the user and return the user object
    },
    // Send callback function that modifies the session object
    async session({ session }) {
      // 1. connect to the database
      // 2. Assing user id from the session
      // 3. return the user
    }
  }
};

export default authOptions;
=======
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
>>>>>>> 09cfd8764ea0eb74a88d19e46c3c6cb77aa2b696
