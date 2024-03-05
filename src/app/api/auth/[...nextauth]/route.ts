import { authOptions } from "@/config/authOptions";
import NextAuth, { User } from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
import { AdapterUser } from "next-auth/adapters";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
