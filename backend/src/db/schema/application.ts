import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

import { users } from "./user.ts";
import { jobs } from "./job.ts";

export const applicationStatusEnum = pgEnum("application_status", [
  "APPLIED",
  "INTERVIEW",
  "OFFER",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
]);

export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    jobId: uuid("job_id")
      .notNull()
      .references(() => jobs.id, { onDelete: "cascade" }),

    status: applicationStatusEnum("status").default("APPLIED").notNull(),

    appliedAt: timestamp("applied_at", {
      withTimezone: true,
    }),

    notes: text(),

    recruiterName: varchar("recruiter_name", { length: 150 }),

    recruiterEmail: varchar("recruiter_email", { length: 255 }),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("applications_user_job_unique").on(table.userId, table.jobId),
  ],
);
