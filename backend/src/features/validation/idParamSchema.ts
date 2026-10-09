import { z } from "zod";

export const IdParamSchema = z.object({
  id: z.uuid("Invalid id"),
});

export type IdParam = z.infer<typeof IdParamSchema>;
