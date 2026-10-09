import { and, eq } from "drizzle-orm";
import { db } from "../../db/index.ts";
import { applications } from "../../db/schema/application.ts";
import {
  CreateApplicationData,
  UpdateApplicationData,
} from "./application.validation.ts";
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

export const getApplicationByIdService = async (
  applicationId: string,
  userId: string,
) => {
  const [application] = await db
    .select()
    .from(applications)
    .where(
      and(eq(applications.id, applicationId), eq(applications.userId, userId)),
    );

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  return application;
};

export const updateApplicationService = async (
  applicationId: string,
  userId: string,
  data: UpdateApplicationData,
) => {
  if (Object.keys(data).length === 0) {
    throw new ApiError(400, "No changes detected");
  }

  const [application] = await db
    .select()
    .from(applications)
    .where(
      and(eq(applications.id, applicationId), eq(applications.userId, userId)),
    );

  if (!application) {
    throw new ApiError(404, "Application not found");
  }

  const { status, appliedAt, notes, recruiterName, recruiterEmail } = data;
  const normalizedAppliedAt =
    appliedAt == null ? appliedAt : new Date(appliedAt);

  const noChanges =
    (status === undefined || application.status === status) &&
    (appliedAt === undefined ||
      (normalizedAppliedAt === null
        ? application.appliedAt === null
        : application.appliedAt?.getTime() ===
          normalizedAppliedAt?.getTime())) &&
    (notes === undefined || application.notes === notes) &&
    (recruiterName === undefined ||
      application.recruiterName === recruiterName) &&
    (recruiterEmail === undefined ||
      application.recruiterEmail === recruiterEmail);

  if (noChanges) {
    throw new ApiError(400, "No changes detected");
  }

  const [updatedApplication] = await db
    .update(applications)
    .set({
      ...(status !== undefined && { status }),
      ...(appliedAt !== undefined && { appliedAt: normalizedAppliedAt }),
      ...(notes !== undefined && { notes }),
      ...(recruiterName !== undefined && { recruiterName }),
      ...(recruiterEmail !== undefined && { recruiterEmail }),
      updatedAt: new Date(),
    })
    .where(
      and(eq(applications.id, applicationId), eq(applications.userId, userId)),
    )
    .returning();

  if (!updatedApplication) {
    throw new ApiError(500, "Failed to update application");
  }

  return updatedApplication;
};

export const deleteApplicationService = async (
  applicationId: string,
  userId: string,
) => {
  const [deletedApplication] = await db
    .delete(applications)
    .where(
      and(eq(applications.id, applicationId), eq(applications.userId, userId)),
    )
    .returning();

  if (!deletedApplication) {
    throw new ApiError(404, "Application not found");
  }

  return deletedApplication;
};
