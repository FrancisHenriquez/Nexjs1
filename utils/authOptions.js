import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import { User } from '@/models/User';

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
    async singIn({ profile }) {
      await connectDB();

      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username: username,
          image: profile.picture
        });
      }
      return true;
    }
    // Connect to the FaDatabase
    // Check if user exists
    // If not, create user
    // Return true to allow sing in
  },
  // Session callback function that modifies the session object
  async session({ session }) {
    //     Get user from database
    const user = await User.findOne({ email: session.user.email });
    //     Assign user id from the session
    session.user.id = user._id.toString();
    //     Return session
    return session;
    // }
  }
};
