import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export const listsTable = pgTable("lists", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const tasksTable = pgTable("tasks", {
  id: serial("id").primaryKey(),
  listid: integer("listid")
    .notNull()
    .references(() => listsTable.id),
  description: text("description").notNull(),
  status: boolean("status").default(false).notNull(),
  createdat: timestamp("createdat").defaultNow().notNull(),
});

export type Task = InferModel<typeof tasksTable>;
export type NewTask = InferModel<typeof tasksTable, "insert">;

export const db = drizzle(sql);
