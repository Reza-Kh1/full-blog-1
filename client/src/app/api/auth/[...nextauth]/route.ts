import NextAuth from "next-auth/next";
import CredentialsProviders from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProviders({
      name: "sign up",
      credentials: {
        phone: { type: "text" },
        password: { type: "password" },
        email: { type: "text" },
        name: { type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.password || !credentials?.phone) return null;
        let url: string = ""
        let body: {
          phone: string
          password: string
          email: string | null
          name: string | null
        } = {
          phone: "",
          password: "",
          email: "",
          name: "",
        }
        try {
          if (credentials?.name) {
            url = `${process.env.NEXT_PUBLIC_URL}/user`
            body.phone = credentials.phone
            body.email = credentials?.email
            body.name = credentials.name
            body.password = credentials.password
          } else {
            url = `${process.env.NEXT_PUBLIC_URL}/user/login`
            body.phone = credentials.phone
            body.password = credentials.password
          }
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if (!res.ok) throw new Error();
          const json = await res.json();
          return json?.infoUser || null;
        } catch (err) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
