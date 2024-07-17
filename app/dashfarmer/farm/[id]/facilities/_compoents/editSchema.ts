import { z } from "zod";

export const editSchema = z.object({
  id: z.number(),
  farmItems: z.array(z.string()),
  parking: z.string(),
  parkinngFee: z.string().nullable(),
  facilities: z.array(z.string()),
  pet: z.boolean(),
});

export type editSchemaType = z.infer<typeof editSchema>;
