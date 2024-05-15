import CredentialsProvider from "next-auth/providers/credentials";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import bcrypt from "bcrypt";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import getDateTime from "@/lib/getDateTime";
import { NextAuthOptions } from "next-auth";
function exclude(user: any, keys: any) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
function checkCredential({
  credentials,
  type,
  role,
}: {
  credentials: Record<"email" | "password", string>;
  type: any;
  role: any;
}) {
  return new Promise(async (resolve, reject) => {
    let user: any = {};
    try {
      if (role === "user") {
        let findUser = await db.user.findUnique({
          where: { email: credentials?.email },
          select: {
            id: true,
            username: true,
            email: true,
            password: true,
            avatar: true,
            role: true,
            phone: true,
            provider: true,
          },
        });
        if (findUser) {
          if (findUser.provider === type) {
            user = findUser;
          } else {
            let typeString =
              findUser.provider === "email"
                ? "이메일로 회원가입한 계정이 있습니다."
                : findUser.provider === "kakao"
                ? "카카오 시작히기로 가입한 계정이 있습니다. "
                : "네이버 시작히기로 가입한 계정이 있습니다.";
            reject(` 이미 ${typeString}`);
          }
        } else {
          reject("계정이 없습니다.");
        }
      } else if (role === "farmer") {
        let findUser = await db.farmer.findUnique({
          where: { email: credentials?.email },
          select: {
            id: true,
            username: true,
            email: true,
            password: true,
            avatar: true,
            role: true,
            phone: true,
            provider: true,
          },
        });
        if (findUser) {
          if (findUser.provider === type) {
            user = findUser;
          } else {
            let typeString =
              findUser.provider === "email"
                ? "이메일로 회원가입한 계정이 있습니다."
                : findUser.provider === "kakao"
                ? "카카오 시작히기로 가입한 계정이 있습니다. "
                : "네이버 시작히기로 가입한 계정이 있습니다.";
            reject(` 이미 ${typeString}`);
          }
        } else {
          reject("계정이 없습니다.");
        }
      } else if (role === "writer") {
        let findUser = await db.writer.findUnique({
          where: { email: credentials?.email },
          select: {
            id: true,
            username: true,
            email: true,
            password: true,
            avatar: true,
            role: true,
            phone: true,
            provider: true,
          },
        });
        if (findUser) {
          if (findUser.provider === type) {
            user = findUser;
          } else {
            let typeString =
              findUser.provider === "email"
                ? "이메일로 회원가입한 계정이 있습니다."
                : findUser.provider === "kakao"
                ? "카카오 시작히기로 가입한 계정이 있습니다. "
                : "네이버 시작히기로 가입한 계정이 있습니다.";
            reject(` 이미 ${typeString}`);
          }
        } else {
          reject("계정이 없습니다.");
        }
      } else if (role === "manager") {
        let findUser = await db.manager.findUnique({
          where: { email: credentials?.email },
          select: {
            id: true,
            username: true,
            email: true,
            password: true,
            avatar: true,
            role: true,
            phone: true,
            provider: true,
          },
        });
        if (findUser) {
          if (findUser.provider === type) {
            user = findUser;
          } else {
            let typeString =
              findUser.provider === "email"
                ? "이메일로 회원가입한 계정이 있습니다."
                : findUser.provider === "kakao"
                ? "카카오 시작히기로 가입한 계정이 있습니다. "
                : "네이버 시작히기로 가입한 계정이 있습니다.";
            reject(` 이미 ${typeString}`);
          }
        } else {
          reject("계정이 없습니다.");
        }
      } else if (role === "superAdmin") {
        let findUser = await db.superManager.findUnique({
          where: { email: credentials?.email },
          select: {
            id: true,
            username: true,
            email: true,
            password: true,
            avatar: true,
            role: true,
            phone: true,
            provider: true,
          },
        });
        if (findUser) {
          if (findUser.provider === type) {
            user = findUser;
          } else {
            let typeString =
              findUser.provider === "email"
                ? "이메일로 회원가입한 계정이 있습니다."
                : findUser.provider === "kakao"
                ? "카카오 시작히기로 가입한 계정이 있습니다. "
                : "네이버 시작히기로 가입한 계정이 있습니다.";
            reject(` 이미 ${typeString}`);
          }
        } else {
          reject("계정이 없습니다.");
        }
      }
      console.log("user", user);
      if (Object.keys(user).length > 0) {
        const ok = await bcrypt.compare(
          credentials?.password,
          user!.password ?? ""
        );
        console.log("ok", ok);
        if (ok) {
          let userdata = exclude(user, ["password"]);
          if (userdata) {
            resolve(userdata);
          }
        } else {
          reject("비밀번호가 불일치 합니다.");
        }
      } else {
        console.log("reejct");
        reject("계정이 없습니다.");
        // throw new Error("등록된 계정이 없습니다.");
      }
    } catch (e: any) {
      console.log(e);
      reject(e);
    }
  });
}
export const authOptions: NextAuthOptions = {
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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        if (req.body) {
          let { role, type } = req.body;
          console.log("role", role);
          if (role === "user") {
            try {
              let result: any = await checkCredential({
                credentials,
                type,
                role,
              });
              return result;
            } catch (e: any) {
              //
              console.log("e", e);

              throw new Error(e);
            }
          } else if (role === "manager") {
            try {
              let result: any = await checkCredential({
                credentials,
                type,
                role,
              });
              return result;
            } catch (e: any) {
              //
              console.log(e);

              throw new Error(e);
            }
          } else if (role === "superAdmin") {
            try {
              let result: any = await checkCredential({
                credentials,
                type,
                role,
              });
              return result;
            } catch (e: any) {
              //
              console.log(e);
              throw new Error(e);
            }
          } else if (role === "writer") {
            try {
              let result: any = await checkCredential({
                credentials,
                type,
                role,
              });
              return result;
            } catch (e: any) {
              //
              console.log(e);
              throw new Error(e);
            }
          } else if (role === "farmer") {
            try {
              let result: any = await checkCredential({
                credentials,
                type,
                role,
              });
              return result;
            } catch (e: any) {
              //
              console.log(e);
              throw new Error(e);
            }
          }
        } else {
          throw new Error("잘못된 접근입니다.");
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
        };
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
        return {
          id: profile.response.id,
          username,
          email,
          phone,
          avatar,
          type: "naver",
          role: "user",
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, credentials }) {
      console.log(
        " user",
        user,
        "profile",
        profile,
        "credentials",
        credentials
      );
      if (user) {
        try {
          // 데이터베이스에 유저가 있는지 확인
          let db_user: any = {};
          if (user.role === "writer") {
            let userdata = await db.writer.findUnique({
              where: { email: user.email! },
              select: {
                username: true,
                email: true,
                phone: true,
                avatar: true,
                role: true,
                id: true,
              },
            });
            if (userdata) {
              db_user = { ...userdata };
            } else {
              let userdata = await db.writer.create({
                data: {
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  avatar: user.avatar,
                  role: user.role,
                  created_at: getDateTime(),
                  updated_at: getDateTime(),
                },
                select: {
                  username: true,
                  email: true,
                  phone: true,
                  avatar: true,
                  role: true,
                  id: true,
                },
              });
              db_user = { ...userdata };
            }
          }
          if (user.role === "user") {
            let userdata = await db.user.findUnique({
              where: {
                email: user.email!,
                provider: user.type as Prisma.EnumProviderTypeFilter,
              },
            });
            if (userdata) {
              db_user = { ...userdata };
            } else {
              let userdata = await db.user.create({
                data: {
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  avatar: user.avatar,
                  role: user.role,
                  provider: user.type,
                  created_at: getDateTime(),
                  updated_at: getDateTime(),
                } as Prisma.UserCreateInput,
                select: {
                  username: true,
                  email: true,
                  phone: true,
                  avatar: true,
                  role: true,
                  id: true,
                },
              });
              db_user = { ...userdata };
            }
          }
          if (user.role === "manager") {
            let userdata = await db.manager.findUnique({
              where: { email: user.email! },
            });
            if (userdata) {
              db_user = { ...userdata };
            } else {
              let userdata = await db.manager.create({
                data: {
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  avatar: user.avatar,
                  role: user.role,
                  created_at: getDateTime(),
                  updated_at: getDateTime(),
                } as Prisma.ManagerCreateInput,
                select: {
                  username: true,
                  email: true,
                  phone: true,
                  avatar: true,
                  role: true,
                  id: true,
                },
              });
              db_user = { ...userdata };
            }
          }
          if (user.role === "farmer") {
            let userdata = await db.farmer.findUnique({
              where: { email: user.email! },
            });
            if (userdata) {
              db_user = { ...userdata };
            } else {
              let userdata = await db.farmer.create({
                data: {
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  avatar: user.avatar,
                  role: user.role,
                  provider: user.type,
                  created_at: getDateTime(),
                  updated_at: getDateTime(),
                } as Prisma.FarmerCreateInput,
                select: {
                  username: true,
                  email: true,
                  phone: true,
                  avatar: true,
                  role: true,
                  id: true,
                },
              });
              db_user = { ...userdata };
            }
          }
          if (user.role === "superAdmin") {
            let userdata = await db.superManager.findUnique({
              where: { email: user.email! },
            });
            if (userdata) {
              db_user = { ...userdata };
            } else {
              let userdata = await db.superManager.create({
                data: {
                  username: user.username,
                  email: user.email,
                  phone: user.phone,
                  avatar: user.avatar,
                  role: user.role,
                  provider: user.type,
                  created_at: getDateTime(),
                  updated_at: getDateTime(),
                } as Prisma.SuperManagerCreateInput,
                select: {
                  username: true,
                  email: true,
                  phone: true,
                  avatar: true,
                  role: true,
                  id: true,
                },
              });
              db_user = { ...userdata };
            }
          }
          console.log("db_user", db_user);
          // // 없으면 데이터베이스에 유저 추가

          if (!db_user) {
            return false;
          }
          // 유저 정보에 데이터베이스 아이디, 역할 연결
          user.id = db_user.id;
          user.role = db_user.role;

          return true;
        } catch (error) {
          // console.log("로그인 도중 에러가 발생했습니다. " + error);
          return false;
        }
      } else {
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
    maxAge: 3 * 24 * 60 * 60, // 3 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    // signOut: "/signin",
    // error: "/signin",
  },
};
