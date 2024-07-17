import { z } from "zod";

export const farmNewSchema = z.object({
  name: z.string(),
  farmerId: z.string({
    required_error: "필수 항목입니다.",
    // invalid_type_error: "Name must be a string",
  }),
  farmerPhone: z.string({
    required_error: "필수 항목입니다.",
    // invalid_type_error: "Name must be a string",
  }),
  companyNumber: z.string().nullable(),
  address: z.string(),
  mainPhone: z.string(),
  resevationManager: z.string({
    required_error: "필수 항목입니다.",
    // invalid_type_error: "Name must be a string",
  }),
  resevationPhone: z.string({
    required_error: "필수 항목입니다.",
    // invalid_type_error: "Name must be a string",
  }),
});

export type farmNewSchemaType = z.infer<typeof farmNewSchema>;
