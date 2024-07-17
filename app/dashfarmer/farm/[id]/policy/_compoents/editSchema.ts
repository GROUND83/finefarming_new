import { z } from "zod";

export const refundSchema = z.object({
  refundPolicy: z.string(),
});

export type refundSchemaType = z.infer<typeof refundSchema>;
