import { z } from "zod";

export const farmerSchema = z.object({
  id: z.number(),

  username: z.string(),
  email: z.string(),
  avatar: z.object({
    image: z.string(),
    uploadUrl: z.string(),
    downUrl: z.string(),
    file: z.any(),
  }),
  phone: z.string(),
  approve: z.boolean(),
  provider: z.string(),
});

export type farmerSchemaType = z.infer<typeof farmerSchema>;
