import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    signIn(params) {
      try {
        console.log(params);
        console.log(params);
      } catch (error) {
        console.log(error);
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
