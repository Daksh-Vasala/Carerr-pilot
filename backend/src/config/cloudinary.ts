import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const requiredEnv = (name: string) => {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required Cloudinary configuration: ${name}`);
  }

  return value;
};

cloudinary.config({
  cloud_name: requiredEnv("CLOUDINARY_CLOUD_NAME"),
  api_key: requiredEnv("CLOUDINARY_API_KEY"),
  api_secret: requiredEnv("CLOUDINARY_API_SECRET"),
});

export default cloudinary;
