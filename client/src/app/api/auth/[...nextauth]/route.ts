import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const handler = nextAuth({
  providers: [
    CredentialsProvider({
      name: "وارد شوید",
      credentials: {
        phone: {
          label: "phone",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
        name: {
          label: "name",
          type: "text",
        },
        email: {
          label: "email",
          type: "text",
        },
      },
      async authorize(credentials: any, req) {
        if (!credentials?.phone || !credentials?.password) return;
        let value = {};
        if (credentials.login === "true") {
          value = {
            phone: credentials?.phone,
            password: credentials?.password,
          };
        } else {
          value = {
            phone: credentials?.phone,
            name: credentials?.name,
            password: credentials?.password,
            email: credentials?.email,
          };
        }

        const user = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/user${
            credentials.login === "true" ? "/login" : ""
          }`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(value),
          }
        );
        const gog = await user.json();
        if (user.ok) {
          if (gog.infoUser) {
            return gog.infoUser;
          }
        }
        const err = gog.message
          ? gog.message
          : "با خطای غیر قابل پیش بینی روبرو شدیم بدبخت شدیم رفت !!!";
        throw new Error(err);
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.SECRET_NEXT,
});
export { handler as GET, handler as POST };
