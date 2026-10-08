import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./user.ts";

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  companyName: varchar("company_name", { length: 150 }).notNull(),

  jobTitle: varchar("job_title", { length: 150 }).notNull(),

  jobUrl: varchar("job_url", { length: 1000 }),

  location: varchar("location", { length: 150 }),

  employmentType: varchar("employment_type", { length: 50 }),

  description: text(),

  salary: varchar("salary", { length: 100 }),

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
});
