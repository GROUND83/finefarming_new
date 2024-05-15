import { z } from "zod";

export const findPasswordSchema = z.object({
  email: z.string().email({ message: "이메일을 입력하세요." }),
});
