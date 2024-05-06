"use server";
import db from "@/lib/db";

import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { FormSchema } from "./mangerAuthShema";
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
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    // console.log(ok);
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      session.role = user!.role;
      await session.save();
      redirect("/admin/farm");
    } else {
      return {
        fieldErrors: { password: ["잘못된 비밀번호 입니다."], email: [] },
      };
    }
    // if the user is found , check password hase
    // log in
    // redirect
  }
}
