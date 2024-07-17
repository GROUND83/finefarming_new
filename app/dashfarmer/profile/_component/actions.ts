"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";

import getDateTime from "@/lib/getDateTime";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export async function getUserData(userId: number) {
  let result = await db.farmer.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      username: true,
      email: true,
      avatar: true,
      phone: true,
      approve: true,
      provider: true,
    },
  });
  return result;
}

export async function updateUser(formdata: FormData) {
  //
  let userId = Number(formdata.get("userId")) as number;
  let avatar = formdata.get("avatar") as string;
  let username = formdata.get("username") as string;

  let phone = formdata.get("phone") as string;
  let email = formdata.get("email") as string;
  if (userId) {
    let user = await db.farmer.update({
      where: {
        id: userId,
      },
      data: {
        avatar: avatar,
        username: username,
        phone: phone,
        email: email,
        updated_at: getDateTime(),
      },
    });
    return user;
  }
}

export async function changePasswrod(data: string) {
  let parserdata = JSON.parse(data);
  if (parserdata) {
    // 비밀번호 확인
    console.log("parserdata", parserdata);
    try {
      let user = await db.farmer.findUnique({
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

          let changePassw = await db.farmer.update({
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
