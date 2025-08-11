import { data } from 'autoprefixer';
import GoogleProvider from 'next-auth/providers/google';

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
