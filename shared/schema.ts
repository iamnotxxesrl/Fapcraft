import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table with Discord integration
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  discordId: text("discord_id").unique(),
  discordUsername: text("discord_username"),
  discordAvatar: text("discord_avatar"),
  discordEmail: text("discord_email"),
  password: text("password"),  // Made optional for Discord logins
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  discordId: true,
  discordUsername: true,
  discordAvatar: true,
  discordEmail: true,
  isAdmin: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// News posts table
export const newsPosts = pgTable("news_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author"),
  isAnonymous: boolean("is_anonymous").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsPostSchema = createInsertSchema(newsPosts).pick({
  title: true,
  content: true,
  author: true,
  isAnonymous: true,
});

export type InsertNewsPost = z.infer<typeof insertNewsPostSchema>;
export type NewsPost = typeof newsPosts.$inferSelect;

// Server Rules table for editable content
export const serverRules = pgTable("server_rules", {
  id: serial("id").primaryKey(),
  order: integer("order").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export const insertServerRuleSchema = createInsertSchema(serverRules).pick({
  order: true,
  title: true,
  description: true,
});

export type InsertServerRule = z.infer<typeof insertServerRuleSchema>;
export type ServerRule = typeof serverRules.$inferSelect;

// Server features table for editable content
export const serverFeatures = pgTable("server_features", {
  id: serial("id").primaryKey(),
  order: integer("order").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  iconBackground: text("icon_background").default("bg-mc-green"),
});

export const insertServerFeatureSchema = createInsertSchema(serverFeatures).pick({
  order: true,
  title: true,
  description: true,
  icon: true,
  iconBackground: true,
});

export type InsertServerFeature = z.infer<typeof insertServerFeatureSchema>;
export type ServerFeature = typeof serverFeatures.$inferSelect;

// Gallery images table
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  order: integer("order").notNull(),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).pick({
  title: true,
  imageUrl: true,
  order: true,
});

export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;

// Peak player counts table
export const playerPeaks = pgTable("player_peaks", {
  id: serial("id").primaryKey(),
  count: integer("count").notNull(),
  recordDate: date("record_date").defaultNow().notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertPlayerPeakSchema = createInsertSchema(playerPeaks).pick({
  count: true,
});

export type InsertPlayerPeak = z.infer<typeof insertPlayerPeakSchema>;
export type PlayerPeak = typeof playerPeaks.$inferSelect;
