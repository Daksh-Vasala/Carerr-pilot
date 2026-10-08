import { RequestHandler } from "express";
import multer from "multer";
import { ApiError } from "../../utils/api-error.ts";

const storage = multer.memoryStorage();

export const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    cb(new ApiError(400, "Only PDF, DOC and DOCX files are allowed"));
    return;
  }

  cb(null, true);
};

export const uploadResume = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export const uploadResumeFile: RequestHandler = (req, res, next) => {
  uploadResume.fields([
    { name: "file", maxCount: 1 },
    { name: "Resume", maxCount: 1 },
  ])(req, res, (error) => {
    if (error) {
      next(error);
      return;
    }

    const files = req.files as
      | Record<string, Express.Multer.File[]>
      | undefined;
    const uploadedFiles = [...(files?.file ?? []), ...(files?.Resume ?? [])];

    if (uploadedFiles.length > 1) {
      next(new ApiError(400, "Upload only one resume file"));
      return;
    }

    req.file = uploadedFiles[0];
    next();
  });
};
