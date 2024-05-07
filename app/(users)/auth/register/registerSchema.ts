import db from "@/lib/db";
import { z } from "zod";

import {
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGHT,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

export const formSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식이 아닙니다." }),
    username: z.string(),
    phone: z.string(),
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
//
