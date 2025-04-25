import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table (keeping the existing one)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// News table for server announcements
export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  author: text("author").notNull(),
  date: timestamp("date").defaultNow().notNull(),
});

export const insertNewsSchema = createInsertSchema(news, {
  title: (schema) => schema.min(3, "Title must be at least 3 characters"),
  content: (schema) => schema.min(10, "Content must be at least 10 characters"),
  image: (schema) => schema.url("Image must be a valid URL"),
});

export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;

// Screenshots table for player uploads
export const screenshots = pgTable("screenshots", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const insertScreenshotSchema = createInsertSchema(screenshots, {
  title: (schema) => schema.min(3, "Title must be at least 3 characters"),
  imageUrl: (schema) => schema.url("Image URL must be valid"),
});

export type InsertScreenshot = z.infer<typeof insertScreenshotSchema>;
export type Screenshot = typeof screenshots.$inferSelect;

// Server statistics table
export const serverStats = pgTable("server_stats", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow().notNull(),
  peakPlayers: integer("peak_players").notNull(),
  maxPlayers: integer("max_players").notNull(),
  uptime: integer("uptime").notNull(), // percentage
  totalPlayers: integer("total_players").notNull(),
  worldSize: text("world_size").notNull(),
});

export const insertServerStatSchema = createInsertSchema(serverStats);
export type InsertServerStat = z.infer<typeof insertServerStatSchema>;
export type ServerStat = typeof serverStats.$inferSelect;

// Daily player count for charts
export const dailyPlayerCounts = pgTable("daily_player_counts", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow().notNull(),
  count: integer("count").notNull(),
  percentage: integer("percentage").notNull(),
});

export const insertDailyPlayerCountSchema = createInsertSchema(dailyPlayerCounts);
export type InsertDailyPlayerCount = z.infer<typeof insertDailyPlayerCountSchema>;
export type DailyPlayerCount = typeof dailyPlayerCounts.$inferSelect;

// Monthly player statistics for growth charts
export const monthlyStats = pgTable("monthly_stats", {
  id: serial("id").primaryKey(),
  month: text("month").notNull(),
  players: integer("players").notNull(),
  newPlayers: integer("new_players").notNull(),
});

export const insertMonthlyStatSchema = createInsertSchema(monthlyStats);
export type InsertMonthlyStat = z.infer<typeof insertMonthlyStatSchema>;
export type MonthlyStat = typeof monthlyStats.$inferSelect;

// Define relations
export const screenshotsRelations = relations(screenshots, ({ one }) => ({
  user: one(users, {
    fields: [screenshots.userId],
    references: [users.id],
  }),
}));
