// import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID ?? "",
    //   clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),

    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, ethSignProof, walletId } = credentials as {
          email: string;
          ethSignProof: string;
          walletId: string;
        };

        if (
          email == undefined ||
          ethSignProof == undefined ||
          walletId == undefined
        ) {
          return null;
        }

        const user = {
          id: walletId,
          email: email,
          ethSignProof: ethSignProof,
          walletId: walletId,
        };

        return user;
      },
    }),
  ],
  callbacks: {
    // TODO: Update types of destructured objects
    // async jwt({ token, user, session }: {token: JWT, user: AdapterUser, session: Session}): Promise<JWT> { // yelling
    // async jwt({ token, user, session }: {token: JWT, user: any, session: Session}): Promise<JWT> { // yelling
    async jwt({ token, user, session }: any): Promise<JWT> {
      console.log("jwt here", { token, user, session });

      if (user) {
        return {
          ...token,
          walletId: user.walletId,
          ethSignProof: user.ethSignProof,
        };
      }

      return token;
    },
    async session({ session, token, user }: any): Promise<Session> {
      console.log("session callback", { session, token, user });

      return {
        ...session,
        user: {
          ...session.user,
          ethSignProof: token.ethSignProof,
          walletId: token.walletId,
        },
      };
    },
  },
};