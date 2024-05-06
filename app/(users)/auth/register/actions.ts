"use server";
import bcrypt from "bcrypt";
import {
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGHT,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";

import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import getDateTime from "@/lib/getDateTime";

const checkUsername = (username: string) => !username.includes("비속어");
const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const checkEmail = async (userEmail: string) => {
  const email = await db.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
    },
  });
  // if (email) {
  //   return false;
  // } else {
  //   return true;
  // }
  return Boolean(email) === false;
};
const formSchema = z
  .object({
    // email: z.string().email().optional(),// 선택사행 not required
    // email: z.string().email().refine(checkUsername,"비정상입니다.") 비속어 포함 검색할때
    //   .toLowerCase()
    //   .trim()
    //   .transform((usename)=>"Kakao_usename")
    email: z.string().email({ message: "이메일 형식이 아닙니다." }),
    // .refine(checkEmail, "이미 사용중인 이메일 입니다."),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGHT, PASSWORD_ERROR_MESSAGE)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGHT, PASSWORD_ERROR_MESSAGE)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(async ({ email }, ctx) => {
    const emaildata = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (emaildata) {
      ctx.addIssue({
        code: "custom",
        message: "이미 사용중인 이메일입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPassword, {
    message: "두 비밀번호는 같아야됩니다.",
    path: ["confirmPassword"], // 특정 필드 선택
  });
// superreFine 먼저 유효성 검사하고 다음으로 이동 디비 중복검색 안하게
export async function createAccount(prevState: any, formdata: FormData) {
  //
  const data = {
    email: formdata.get("email"),
    password: formdata.get("password"),
    confirmPassword: formdata.get("confirmPassword"),
  };
  //   console.log(data);
  // thorw 한다
  //   try {
  //     formSchema.parse(data);
  //   } catch (e) {
  //     console.log(e);
  //   }
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
    const hashedPasswrod = await bcrypt.hash(result.data.password, 12);
    //
    const user = await db.user.create({
      data: {
        email: result.data.email,
        password: hashedPasswrod,
        provider: "email",
        created_at: getDateTime(),
        updated_at: getDateTime(),
      },
      select: {
        id: true,
        role: true,
      },
    });
    console.log(user);
    const session = await getSession();

    session.id = user.id;
    session.role = user.role;
    await session.save();
    //  유저가 로그인 된 상태이다
    redirect("/profile");
    // 이미 유저네임있는지
    // 이메일이 있는지
    // hash password
    // save user
    // log the user in
    // redirect
  }
}
