"use server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function getUser({
  userId,
  role,
}: {
  userId: number;
  role: string;
}) {
  if (!userId) {
    return;
  }
  if (!role) {
    return;
  }
  if (userId && role === "user") {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        created_at: true,
        role: true,
        approve: true,
        provider: true,
        reservation: {
          include: {
            farm: true,
          },
        },
        reviews: {
          include: {
            product: true,
          },
        },
      },
    });
    console.log("user", user);
    if (user) {
      return JSON.stringify(user);
    }
  } else if (userId && role === "superAdmin") {
    const user = await db.superManager.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        created_at: true,
        provider: true,
        role: true,
        approve: true,
      },
    });
    if (user) {
      return JSON.stringify(user);
    }
  } else if (userId && role === "manager") {
    const user = await db.manager.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        created_at: true,
        role: true,
        provider: true,
        approve: true,
      },
    });
    if (user) {
      return JSON.stringify(user);
    }
  } else {
    return;
  }
}

export async function changePasswrod(data: string) {
  let parserdata = JSON.parse(data);
  if (parserdata) {
    // 비밀번호 확인
    console.log("parserdata", parserdata);
    try {
      let user = await db.user.findUnique({
        where: {
          id: parserdata.userId,
        },
        select: {
          password: true,
          provider: true,
        },
      });
      if (user?.provider === "email" && user?.password) {
        console.log("user", user, parserdata.password, user.password);

        const ok = await bcrypt.compare(parserdata.password, user.password);
        console.log("ok", ok);
        if (ok) {
          const hashedPasswrod = await bcrypt.hash(parserdata.newpassword, 12);

          let changePassw = await db.user.update({
            where: {
              id: parserdata.userId,
            },
            data: {
              password: hashedPasswrod,
            },
          });
          if (changePassw) {
            return { message: "ok" } as any;
          }
        } else {
          // return { error: "비밀번호가 일치하지 않습니다." } as any;
        }
      } else {
        return { error: "잘못된 접근입니다." } as any;
      }
    } catch (e) {
      console.log("e", e);
      return { error: "비밀번호가 잘못 되었습니다." } as any;
    }
  }
  //
}
