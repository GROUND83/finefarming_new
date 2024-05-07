"use server";
import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
const prisma = new PrismaClient();

const handler = NextAuth({
  // Configure one or more authentication providers
  // adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "이메일 주소 입력 요망",
        },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(credentials, req) {
        console.log("credentials", credentials);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );
        const user = await res.json();
        console.log("user", user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      async profile(profile) {
        const username = profile.kakao_account?.name;
        const email = profile.kakao_account?.email;
        const phone = profile.kakao_account?.phone_number;
        const avatar = profile.kakao_account?.profile.profile_image_url;
        // kakaoid가 있으면
        return {
          id: profile.id,
          username,
          email,
          phone,
          avatar,
        } as any;
      },
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      async profile(profile) {
        const username = profile.response.name;
        const email = profile.response.email;
        const phone = profile.response.mobile;
        const avatar = profile.response.profile_image;
        // kakaoid가 있으면

        return {
          id: profile.response.id,
          username,
          email,
          phone,
          avatar,
        } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      console.log(" user, profile ", user, profile);
      if (profile) {
        user.name = profile?.name || user.name;
        user.email = profile?.email || user.email;
      }

      try {
        // 데이터베이스에 유저가 있는지 확인
        let db_user = await db.user.findUnique({
          where: { email: user.email! },
        });
        console.log("db_user", db_user);
        // // 없으면 데이터베이스에 유저 추가
        if (!db_user) {
          db_user = await db.user.create({
            data: {
              username: user.name!,
              email: user.email!,
              phone: user.phone,
              avatar: user.avatar,
              provider: "kakao",
            },
          });
        }

        // 유저 정보에 데이터베이스 아이디, 역할 연결
        user.id = db_user.id;
        user.role = db_user.role;

        return true;
      } catch (error) {
        console.log("로그인 도중 에러가 발생했습니다. " + error);
        return false;
      }
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 1, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    // signOut: "/signin",
    // error: "/signin",
  },
});
export { handler as GET, handler as POST };
