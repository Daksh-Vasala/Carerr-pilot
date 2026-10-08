import { z } from "zod";
import { updateProfileSchema } from "./profile.validation.js";

export type UpdateProfileData = z.infer<typeof updateProfileSchema>;
