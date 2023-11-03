import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDb } from "@utils/database";
import User from "@model/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      secret: process.env.NEXTAUTH_SECRET,
    }),
  ],

  callbacks: {
    // //////////
    // first callback function
    async signIn({ user, account, profile, email, credentials }) {
      const signedIn = true;
      console.log(profile);
      try {
        await connectDb();
        // check if user already exist on the database by checking the enail provided by the provider
        // that is if the user had signed in before
        const user = await User.findOne({ email: profile.email });

        if (user) return signedIn;

        // if not create new user witht email provided.
        if (!user) {
          User.create({
            email: profile.email,
            username: profile.name.replace(" ", ""),
            image: profile.image,
          });

          return signedIn;
        }

        // return signedIn;
      } catch (err) {
        console.log("happening there");
        return false;
      }
    },

    // /////////////////////
    // second callback function
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },
  },
});

export { handler as GET, handler as POST };
