import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your own logic to validate the user
        if (credentials.username === "user" && credentials.password === "pass") {
          return { id: 1, name: "User" }; // Return user object
        }
        return null; // Return null if user not found
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
});