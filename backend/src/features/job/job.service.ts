import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { jobs } from "../../db/schema/job.ts";
import { CreateJobData } from "./job.validation.ts";

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
