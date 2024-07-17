import { z } from "zod";

export const optionSchema = z.object({
  optionProduct: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      price: z.number(),
      selectProducts: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          price: z.number(),
        })
      ),
    })
  ),
});
export const uploadSchema = z.object({
  detail: z.string(),
});
export type optionSchemaType = z.infer<typeof optionSchema>;
