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

export const formSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 아닙니다." }),
  username: z.string().min(1, { message: "필수 사항입니다." }),
  phone: z.string(),
  servicePolicy: z.boolean().refine((val) => val === true, {
    message: "필수 동의",
  }),
  personlaPolicy: z.boolean().refine((val) => val === true, {
    message: "필수 동의",
  }),
  overForteen: z.boolean().refine((val) => val === true, {
    message: "필수 동의",
  }),
  whole: z.boolean().optional(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGHT, PASSWORD_ERROR_MESSAGE)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

//
