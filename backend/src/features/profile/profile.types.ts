import { z } from "zod";
import { updateProfileSchema } from "./profile.validation.ts";

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
