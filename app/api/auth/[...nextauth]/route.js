import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
       await connectToDb();
      // const user = await db
      //   .collection("users")
      //   .findOne({ email: session.user.email });
      // if (user) {
      //   session.user.id = user._id;
      // }
      // return session;
      return true
    } catch (err) {
      console.log(err);
      return false;
    }
  },
});
export { handler as GET, handler as POST };
