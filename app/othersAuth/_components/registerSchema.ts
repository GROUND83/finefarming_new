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

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "이메일 형식이 아닙니다." }),
    username: z.string().min(1, { message: "필수 사항입니다." }),
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
  .refine(checkPassword, {
    message: "두 비밀번호는 같아야됩니다.",
    path: ["confirmPassword"], // 특정 필드 선택
  });
//
