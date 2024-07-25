import connectDB from "@/config/database";
import Admin from "@/models/Admin"; // Make sure you have an Admin model
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export const adminAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const admin = await Admin.findOne({ username: credentials.username });
        if (admin && admin.password === credentials.password) {
          return admin;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      const admin = await Admin.findById(token.sub);
      session.user.id = admin._id.toString();
      return session;
    },
  },
};

const handler = NextAuth(adminAuthOptions);
export { handler as GET, handler as POST };
