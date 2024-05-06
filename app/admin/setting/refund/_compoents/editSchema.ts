import { z } from "zod";

export const refundSchema = z.object({
  id: z.number().nullable(),
  refundPolicy: z.string(),
});

export type refundSchemaType = z.infer<typeof refundSchema>;
