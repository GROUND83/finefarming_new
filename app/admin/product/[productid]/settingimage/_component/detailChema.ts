import { z } from "zod";

export const detailSchema = z.object({
  detail: z.string(),
});
export const uploadSchema = z.object({
  detail: z.string(),
});
export type detailSchemaType = z.infer<typeof detailSchema>;
