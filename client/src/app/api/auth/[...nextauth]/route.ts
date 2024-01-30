import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const handler = nextAuth({
  providers: [
    CredentialsProvider({
      name: "login",
      credentials: {
        phone: {
          type: "text",
        },
        password: {
          type: "password",
        },
        name: {
          type: "text",
        },
        email: {
          type: "text",
        },
        login: {
          type: "text",
        },
      },
      async authorize(credentials: any, req) {
        let body = {};
        if (credentials.login === "true") {
          body = {
            phone: credentials?.phone,
            password: credentials?.password,
          };
          const login = await fetch(
            process.env.NEXT_PUBLIC_URL_API + "/user/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );
          if (!login.ok) return null;
          const gog = await login.json();
          if (gog.infoUser) {
            return gog.infoUser;
          }
          return null;
        }
        if (credentials.login !== "true") {
          body = {
            phone: credentials?.phone,
            name: credentials?.name,
            password: credentials?.password,
            email: credentials?.email,
          };
          const user = await fetch(process.env.NEXT_PUBLIC_URL_API + "/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          if (!user.ok) return null;
          const gog = await user.json();
          if (gog.infoUser) {
            return gog.infoUser;
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
});
export { handler as GET, handler as POST };
