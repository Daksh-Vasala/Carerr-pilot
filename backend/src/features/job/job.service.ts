import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { jobs } from "../../db/schema/job.ts";
import { CreateJobData, UpdateJobData } from "./job.validation.ts";
import { ApiError } from "../../utils/api-error.ts";

export const createJobService = async (userId: string, data: CreateJobData) => {
  const [job] = await db
    .insert(jobs)
    .values({ userId, ...data })
    .returning();

  return job;
};

export const getAllJobsService = async (userId: string) => {
  const allJobs = await db.select().from(jobs).where(eq(jobs.userId, userId));

  return allJobs;
};

export const getJobByIdService = async (userId: string, jobId: string) => {
  const [job] = await db
    .select()
    .from(jobs)
    .where(and(eq(jobs.userId, userId), eq(jobs.id, jobId)));

  return job;
};

export const updateJobService = async (
  userId: string,
  jobId: string,
  data: UpdateJobData,
) => {
  if (Object.keys(data).length === 0) {
    throw new ApiError(400, "No changes detected");
  }
  const [job] = await db
    .select()
    .from(jobs)
    .where(and(eq(jobs.id, jobId), eq(jobs.userId, userId)));

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const {
    companyName,
    jobTitle,
    jobUrl,
    location,
    employmentType,
    salary,
    description,
  } = data;

  const noChanges =
    (companyName === undefined || job.companyName === companyName) &&
    (jobTitle === undefined || job.jobTitle === jobTitle) &&
    (jobUrl === undefined || job.jobUrl === jobUrl) &&
    (location === undefined || job.location === location) &&
    (employmentType === undefined || job.employmentType === employmentType) &&
    (salary === undefined || job.salary === salary) &&
    (description === undefined || job.description === description);

  if (noChanges) {
    throw new ApiError(400, "No changes detected");
  }

  const [updatedJob] = await db
    .update(jobs)
    .set({
      ...(companyName !== undefined && { companyName }),
      ...(jobTitle !== undefined && { jobTitle }),
      ...(jobUrl !== undefined && { jobUrl }),
      ...(location !== undefined && { location }),
      ...(employmentType !== undefined && { employmentType }),
      ...(salary !== undefined && { salary }),
      ...(description !== undefined && { description }),
      updatedAt: new Date(),
    })
    .where(and(eq(jobs.id, jobId), eq(jobs.userId, userId)))
    .returning();

  return updatedJob;
};

export const deleteJobService = async (userId: string, jobId: string) => {
  const [job] = await db
    .delete(jobs)
    .where(and(eq(jobs.id, jobId), eq(jobs.userId, userId)))
    .returning();

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  return job;
};
