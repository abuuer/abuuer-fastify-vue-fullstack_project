import { z } from "zod";

const createProductSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  picture: z.string(),
  category_id: z.number({
    required_error: "category ID is required",
  }),
});

const reqProductSchema = z.object({
  name: z.string(),
  fileBuffer: z.instanceof(Buffer),
  fileName: z.string(),
  category_id: z.string(),
});

export type createProductSchema = z.infer<typeof createProductSchema>;
export type reqProductSchema = z.infer<typeof reqProductSchema>;
