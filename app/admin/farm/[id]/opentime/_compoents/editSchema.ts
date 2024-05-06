import { z } from "zod";

export const editSchema = z.object({
  mondayOpen: z.boolean(),
  mondayStart: z.string(),
  mondayEnd: z.string(),
  tuesdayOpen: z.boolean(),
  tuesdayStart: z.string(),
  tuesdayEnd: z.string(),
  wednesdayOpen: z.boolean(),
  wednesdayStart: z.string(),
  wednesdayEnd: z.string(),
  thursdayOpen: z.boolean(),
  thursdayStart: z.string(),
  thursdayEnd: z.string(),
  fridayOpen: z.boolean(),
  fridayStart: z.string(),
  fridayEnd: z.string(),
  saturdayOpen: z.boolean(),
  saturdayStart: z.string(),
  saturdayEnd: z.string(),
  sundayOpen: z.boolean(),
  sundayStart: z.string(),
  sundayEnd: z.string(),
  holidayOpen: z.boolean(),
  holidayStart: z.string(),
  holidayEnd: z.string(),
});

export type editSchemaType = z.infer<typeof editSchema>;
