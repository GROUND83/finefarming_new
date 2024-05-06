import { z } from "zod";

export const productNewSchema = z.object({
  title: z.string(),
  description: z.string(),
});
export const uploadSchema = z.object({
  detail: z.string(),
});
export type productNewSchemaType = z.infer<typeof productNewSchema>;
