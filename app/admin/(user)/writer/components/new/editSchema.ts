import { z } from "zod";

export const editSchema = z.object({
  id: z.number(),
  username: z.string(),
  phone: z.string(),
  email: z.string().email({ message: "이메일 형식이 아닙니다." }),
  avatar: z.string({ required_error: "대표사진은 필수 항목입니다." }),
  approve: z.boolean(),
});
export const deleteSchema = z.object({
  id: z.number(),
});

export type EditType = z.infer<typeof editSchema>;
export type DeleteType = z.infer<typeof deleteSchema>;
