// //nextjs route handler

// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import User from "@/models/User";
// import { conn } from "@/config/dbConfig";

// const handler = NextAuth({
//   session: {
//     strategy: "jwt", //for session
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       //authentication logic
//       async authorize(credentials) {
//         //check if credentials exist
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing credentials");
//         }
//         //connect to db
//         await conn();
//         //find user by email
//         const user = await User.findOne({ email: credentials.email });
//         if (!user) {
//           throw new Error("Invalid email or password");
//         }
//         //verify pass with bcrypt
//         const isMatch = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );

//         if (!isMatch) {
//           throw new Error("Invalid email or password");
//         }
//         //return obj for session
//         return {
//           id: user._id.toString(), //mongo obj to string
//           email: user.email,
//           name: user.fullName,
//         };
//       },
//     }),
//   ],
//     callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id; //store id in JWT
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string; //expose id in session
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login", //custom login page url
//   },
//   secret: process.env.NEXTAUTH_SECRET, //encryption secret
// });

// export { handler as GET, handler as POST };
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };