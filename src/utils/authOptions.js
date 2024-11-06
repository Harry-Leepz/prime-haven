import GoogleProvider from "next-auth/providers/google";

import connectDB from "../../config/database";
import User from "../../models/User";

// https://next-auth.js.org/getting-started/example

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // invoked on successful sign in
    async signIn({ profile }) {
      await connectDB();
      const checkUserExists = await User.findOne({ email: profile.email });
      if (!checkUserExists) {
        // Truncate username if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          username,
          email: profile.email,
          image: profile.picture,
        });
      }
      return true;
    },
    // Session callback function that modifies the session object
    async session({ session, token }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    },
  },
};
