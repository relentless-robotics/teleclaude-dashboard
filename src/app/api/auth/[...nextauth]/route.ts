import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

const ALLOWED_EMAILS = ["football2nick@gmail.com", "njliautaud@gmail.com"]

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow specific email
      return ALLOWED_EMAILS.includes(user.email || "")
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
})

export { handler as GET, handler as POST }
