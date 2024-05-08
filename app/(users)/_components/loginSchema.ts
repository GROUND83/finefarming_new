import { z } from "zod";
import {
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGHT,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
export const formSchema = z.object({
  email: z.string().email({ message: "이메일을 입력하세요." }),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGHT, PASSWORD_ERROR_MESSAGE)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});
