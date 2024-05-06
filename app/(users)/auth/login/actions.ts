"use server";
import bcrypt from "bcrypt";
import {
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGHT,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { Result } from "postcss";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  // if (user) {
  //   return true;
  // } else {
  //   return false;
  // }
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .refine(checkEmailExists, "이메일을 사용하는 계정이 없습니다."),
  password: z.string(),
  // .min(PASSWORD_MIN_LENGHT, PASSWORD_ERROR_MESSAGE)
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});
export async function login(prevState: any, formdata: FormData) {
  console.log("i run in the server");
  console.log(prevState);

  const data = {
    email: formdata.get("email"),
    password: formdata.get("password"),
  };
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // redirect("/");
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // console.log(result.data);
    // find a user with the email
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "");
    // console.log(ok);
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
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
