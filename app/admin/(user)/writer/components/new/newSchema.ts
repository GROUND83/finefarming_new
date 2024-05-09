import { z } from "zod";
import {
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGHT,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

import { cheackEmail, checkPassword } from "../vaildation";

export const newSchema = z
  .object({
    username: z.string(),
    phone: z.string(),
    email: z.string().email({ message: "이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGHT, PASSWORD_ERROR_MESSAGE)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGHT, PASSWORD_ERROR_MESSAGE)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    avatar: z.string().nullable(),
  })
  .superRefine(async ({ email }, ctx) => {
    const emaildata = await cheackEmail(email);
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

export type newSchemaType = z.infer<typeof newSchema>;
