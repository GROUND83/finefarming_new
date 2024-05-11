import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string | null | undefined;
      email: string | null | undefined;
      avatar: string | null | undefined;
      id: number;
      phone: string | null | undefined;
      role: "manager" | "user" | "farmer" | "writer" | "superAdmin";
      type: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: number;
    username: string;
    email: string;
    phone: string;
    role: string | null;
    avatar: string;
    type: string;
    role: string;
  }
}

import { JWT } from "@auth/core/jwt";

declare module "@auth/core/jwt" {
  interface JWT {
    role: "manager" | "user" | "farmer" | "writer" | "superAdmin";
  }
}
