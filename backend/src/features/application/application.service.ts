import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { applications } from "../../db/schema/application.ts";
import { CreateApplicationData } from "./application.validation.ts";
import { ApiError } from "../../utils/api-error.ts";
import { jobs } from "../../db/schema/job.ts";

export const getApplicationsService = async (userId: string) => {
  const allApplications = await db
    .select()
    .from(applications)
    .where(eq(applications.userId, userId));

  return allApplications;
};

export const createApplicationService = async (
  userId: string,
  data: CreateApplicationData,
) => {
  const [job] = await db
    .select()
    .from(jobs)
    .where(and(eq(jobs.userId, userId), eq(jobs.id, data.jobId)));

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const [application] = await db
    .select()
    .from(applications)
    .where(
      and(eq(applications.userId, userId), eq(applications.jobId, data.jobId)),
    );

  if (application) {
    throw new ApiError(409, "Application with this job already exists");
  }

  const [insertedApplication] = await db
    .insert(applications)
    .values({
      userId,
      ...data,
      appliedAt:
        data.appliedAt == null ? data.appliedAt : new Date(data.appliedAt),
    })
    .returning();

  if (!insertedApplication) {
    throw new ApiError(500, "Failed to create application");
  }

  return insertedApplication;
};
