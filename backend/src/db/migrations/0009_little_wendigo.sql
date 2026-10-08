ALTER TABLE "jobs" ADD COLUMN "salary" varchar(100);--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "salary_min";--> statement-breakpoint
ALTER TABLE "jobs" DROP COLUMN "salary_max";