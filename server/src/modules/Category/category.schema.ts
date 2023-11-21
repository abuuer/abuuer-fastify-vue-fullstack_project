import { string, z } from "zod";

const createCategorySchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  picture: z.string(),
  parent_id: z.number().optional(),
});

const reqategorySchema = z.object({
  name: z.string(),
  fileBuffer: z.instanceof(Buffer),
  fileName: z.string(),
  parent_id: z.number().optional(),
});

export type createCategorySchema = z.infer<typeof createCategorySchema>;
export type reqategorySchema = z.infer<typeof reqategorySchema>;
