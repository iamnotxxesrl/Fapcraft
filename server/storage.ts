import { db } from "@db";
import { eq, desc, and, lt } from "drizzle-orm";
import { 
  news, 
  screenshots, 
  serverStats, 
  dailyPlayerCounts,
  monthlyStats, 
  users,
  type InsertNews,
  type InsertScreenshot,
  type InsertServerStat,
  type InsertDailyPlayerCount,
  type InsertMonthlyStat
} from "@shared/schema";

// News storage functions
export async function getAllNews() {
  return await db.query.news.findMany({
    orderBy: [desc(news.date)]
  });
}

export async function getNewsById(id: number) {
  return await db.query.news.findFirst({
    where: eq(news.id, id)
  });
}

export async function createNews(data: InsertNews) {
  const [newNews] = await db.insert(news).values(data).returning();
  return newNews;
}

export async function updateNews(id: number, data: Partial<InsertNews>) {
  const [updatedNews] = await db
    .update(news)
    .set(data)
    .where(eq(news.id, id))
    .returning();
  return updatedNews;
}

export async function deleteNews(id: number) {
  const [deletedNews] = await db
    .delete(news)
    .where(eq(news.id, id))
    .returning();
  return deletedNews;
}

// Screenshots storage functions
export async function getAllScreenshots() {
  return await db.query.screenshots.findMany({
    orderBy: [desc(screenshots.createdAt)]
  });
}

export async function getScreenshotById(id: number) {
  return await db.query.screenshots.findFirst({
    where: eq(screenshots.id, id)
  });
}

export async function createScreenshot(data: InsertScreenshot) {
  const [newScreenshot] = await db.insert(screenshots).values(data).returning();
  return newScreenshot;
}

export async function deleteScreenshot(id: number) {
  const [deletedScreenshot] = await db
    .delete(screenshots)
    .where(eq(screenshots.id, id))
    .returning();
  return deletedScreenshot;
}

// Server stats storage functions
export async function getLatestServerStats() {
  return await db.query.serverStats.findFirst({
    orderBy: [desc(serverStats.date)]
  });
}

export async function createServerStats(data: InsertServerStat) {
  const [newStats] = await db.insert(serverStats).values(data).returning();
  return newStats;
}

export async function updateServerStats(id: number, data: Partial<InsertServerStat>) {
  const [updatedStats] = await db
    .update(serverStats)
    .set(data)
    .where(eq(serverStats.id, id))
    .returning();
  return updatedStats;
}

// Daily player counts for charts
export async function getDailyPlayerCounts(limit = 7) {
  return await db.query.dailyPlayerCounts.findMany({
    orderBy: [desc(dailyPlayerCounts.date)],
    limit
  });
}

export async function createDailyPlayerCount(data: InsertDailyPlayerCount) {
  const [newCount] = await db.insert(dailyPlayerCounts).values(data).returning();
  return newCount;
}

// Monthly stats for growth charts
export async function getMonthlyStats(limit = 12) {
  return await db.query.monthlyStats.findMany({
    orderBy: [desc(monthlyStats.id)],
    limit
  });
}

export async function createMonthlyStat(data: InsertMonthlyStat) {
  const [newStat] = await db.insert(monthlyStats).values(data).returning();
  return newStat;
}
