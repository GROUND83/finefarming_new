"use server";
import db from "@/lib/db";

import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { FormSchema } from "./mangerAuthShema";
import getDateTime from "@/lib/getDateTime";
//
export async function login(formdata: FormData) {
  console.log("i run in the server");

  const data = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // redirect("/");
  const result = await FormSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // console.log(result.data);
    // find a user with the email
    const user = await db.superManager.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        role: true,
        password: true,
      },
    });
    if (user) {
      return { error: "이미등록한 이메일이 있습니다." };
    }
    const hashedPasswrod = await bcrypt.hash(result.data.password, 12);
    const superManager = await db.superManager.create({
      data: {
        email: result.data.email,
        password: hashedPasswrod,
        username: "슈퍼어드민",
        created_at: getDateTime(),
        updated_at: getDateTime(),
      },
      select: {
        id: true,
      },
    });
    console.log(superManager);
    // console.log(ok);
    // if (ok) {
    //   const session = await getSession();
    //   session.id = user!.id;
    //   session.role = user!.role;
    //   await session.save();
    //   redirect("/admin");
    // } else {
    //   return {
    //     fieldErrors: { password: ["잘못된 비밀번호 입니다."], email: [] },
    //   };
    // }
    // if the user is found , check password hase
    // log in
    // redirect
  }
}
