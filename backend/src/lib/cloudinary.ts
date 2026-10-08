import { Readable } from "node:stream";
import cloudinary from "../config/cloudinary.ts";

type CloudinaryUploadResult = {
  secureUrl: string;
  publicId: string;
};
type CloudinaryResourceType = "image" | "raw";

export const uploadResumeToCloudinary = (
  buffer: Buffer,
  fileName: string,
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    const safeFileName = fileName
      .replace(/[^a-zA-Z0-9._-]/g, "_")
      .replace(/_+/g, "_");

    const publicId = safeFileName.replace(/\.[^/.]+$/, "");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "careerpilot/resumes",
        resource_type: "image",
        public_id: publicId,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
        });
      },
    );

    Readable.from([buffer]).pipe(uploadStream);
  });
};
