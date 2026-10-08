import "dotenv/config";
import { Readable } from "node:stream";
import cloudinary from "./cloudinary.ts";

const buffer = Buffer.from("Hello Cloudinary");

const upload = () => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "careerpilot/test",
        resource_type: "raw",
      },
      (error, result) => {
        if (error) {
          console.error("UPLOAD ERROR:", error);
          reject(error);
          return;
        }

        console.log("UPLOAD SUCCESS:", result);
        resolve(result);
      },
    );

    Readable.from([buffer]).pipe(stream);
  });
};

upload().catch((error) => {
  console.error("FINAL ERROR:", error);
});
