import GoogleProvider from "next-auth/providers/google";

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
      /*
        TODO: Implement signIn callback
          - Connect to the database
          - Check if the user already exists
          - If the user does not exist, create a new user
          - Return true to allow sign in
      */
    },
    // Session callback function that modifies the session object
    async session({ session, token }) {
      /*
      TODO: Implement session callback
        - Get user from databse
        - Assign use id from  the session
        - Return the session object
      */
    },
  },
};
