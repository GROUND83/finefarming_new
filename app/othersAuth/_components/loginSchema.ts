import { z } from "zod";
import {
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGHT,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGHT, PASSWORD_ERROR_MESSAGE)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});
