"use server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import bcrypt from "bcrypt";

import db from "@/lib/db";
function exclude(user: any, keys: any) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
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
        console.log("credentials", credentials, req.body);
        if (req.body) {
          let { type } = req.body;
          console.log("type", type);
          if (type === "user") {
            if (!credentials?.email || !credentials?.password) {
              return false;
            }
            try {
              const user = await db.user.findUnique({
                where: { email: credentials?.email },
                select: {
                  id: true,
                  username: true,
                  email: true,
                  password: true,
                  avatar: true,
                  role: true,
                },
              });
              const ok = await bcrypt.compare(
                credentials?.password,
                user!.password ?? ""
              );
              if (ok) {
                let userdata = exclude(user, ["password"]);
                if (userdata) {
                  return userdata;
                } else {
                  return null;
                }
              }
            } catch (e: any) {
              console.log(e);
              throw new Error(e);
            }
          } else if (type === "manager") {
            if (!credentials?.email || !credentials?.password) {
              return false;
            }
            try {
              const user = await db.manager.findUnique({
                where: { email: credentials?.email },
                select: {
                  id: true,
                  username: true,
                  email: true,
                  password: true,
                  avatar: true,
                  role: true,
                },
              });
              const ok = await bcrypt.compare(
                credentials?.password,
                user!.password ?? ""
              );
              if (ok) {
                let userdata = exclude(user, ["password"]);
                if (userdata) {
                  return userdata;
                } else {
                  return null;
                }
              }
            } catch (e: any) {
              console.log(e);
              throw new Error(e);
            }
          } else if (type === "superManager") {
            if (!credentials?.email || !credentials?.password) {
              return false;
            }
            try {
              const user = await db.superManager.findUnique({
                where: { email: credentials?.email },
                select: {
                  id: true,
                  username: true,
                  email: true,
                  password: true,
                  avatar: true,
                  role: true,
                },
              });
              const ok = await bcrypt.compare(
                credentials?.password,
                user!.password ?? ""
              );
              if (ok) {
                let userdata = exclude(user, ["password"]);
                if (userdata) {
                  return userdata;
                } else {
                  return null;
                }
              }
            } catch (e: any) {
              console.log(e);
              throw new Error(e);
            }
          } else if (type === "writer") {
            if (!credentials?.email || !credentials?.password) {
              return false;
            }
            try {
              const user = await db.writer.findUnique({
                where: { email: credentials?.email },
                select: {
                  id: true,
                  username: true,
                  email: true,
                  password: true,
                  avatar: true,
                  role: true,
                },
              });
              const ok = await bcrypt.compare(
                credentials?.password,
                user!.password ?? ""
              );
              if (ok) {
                let userdata = exclude(user, ["password"]);
                if (userdata) {
                  return userdata;
                } else {
                  return null;
                }
              }
            } catch (e: any) {
              console.log(e);
              throw new Error(e);
            }
          } else if (type === "farmer") {
            if (!credentials?.email || !credentials?.password) {
              return false;
            }
            try {
              const user = await db.farmer.findUnique({
                where: { email: credentials?.email },
                select: {
                  id: true,
                  username: true,
                  email: true,
                  password: true,
                  avatar: true,
                  role: true,
                },
              });
              const ok = await bcrypt.compare(
                credentials?.password,
                user!.password ?? ""
              );
              if (ok) {
                let userdata = exclude(user, ["password"]);
                if (userdata) {
                  return userdata;
                } else {
                  return null;
                }
              }
            } catch (e: any) {
              console.log(e);
              throw new Error(e);
            }
          }
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
          type: "kakao",
          role: "user",
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
          type: "naver",
          role: "user",
        } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, credentials }) {
      console.log(" user, profile ", user, profile, credentials);
      if (profile) {
        user.name = profile?.name || user.name;
        user.email = profile?.email || user.email;
      }

      try {
        // 데이터베이스에 유저가 있는지 확인
        let db_user: any = {};
        if (user.role === "writer") {
          db_user = await db.writer.findUnique({
            where: { email: user.email! },
          });
        }
        if (user.role === "user") {
          db_user = await db.user.findUnique({
            where: { email: user.email! },
          });
        }
        if (user.role === "manager") {
          db_user = await db.manager.findUnique({
            where: { email: user.email! },
          });
        }
        if (user.role === "farmer") {
          db_user = await db.farmer.findUnique({
            where: { email: user.email! },
          });
        }
        if (user.role === "superAdmin") {
          db_user = await db.superManager.findUnique({
            where: { email: user.email! },
          });
        }
        console.log("db_user", db_user);
        // // 없으면 데이터베이스에 유저 추가
        if (!db_user) {
          db_user = await db.user.create({
            data: {
              username: user.name!,
              email: user.email!,
              phone: user.phone,
              avatar: user.avatar,
              provider:
                user.type === "kakao"
                  ? "kakao"
                  : user.type === "naver"
                  ? "naver"
                  : "email",
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
