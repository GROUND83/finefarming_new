import { z } from "zod";

export const farmItemsSchem = z.object({
  farmItems: z.array(
    z.object({
      title: z.string(),
    })
  ),
  facility: z.array(
    z.object({
      title: z.string(),
    })
  ),
  tools: z.array(
    z.object({
      title: z.string(),
    })
  ),
});

export type farmItemsSchemType = z.infer<typeof farmItemsSchem>;
