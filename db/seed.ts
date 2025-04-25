import { db } from "./index";
import * as schema from "@shared/schema";

// Sample data to seed the database
const newsItems = [
  {
    title: "New Winter Festival Event!",
    content: "Join us for the winter festival event with special rewards, holiday-themed builds, and snow activities! Starting on December 20th, we'll be hosting daily events with awesome prizes. Make sure to check out the new Winter Wonderland area on the server, complete with ice skating, snowball fights, and a special gift exchange system. See you there!",
    image: "https://images.unsplash.com/photo-1633296453913-6e0659162a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0IGxhbmRzY2FwZXN8fHx8fHwxNzAxNjIzNTgw&ixlib=rb-4.0.3&q=80&w=400",
    author: "ServerAdmin",
    date: new Date("2023-12-15")
  },
  {
    title: "Server Upgrade Complete",
    content: "We've upgraded our server hardware! Enjoy improved performance, less lag, and more capacity for players. This upgrade includes doubling our RAM allocation, moving to SSD storage for faster chunk loading, and implementing a new anti-lag system. You should notice smoother gameplay, especially during peak hours and events.",
    image: "https://images.unsplash.com/photo-1611520179316-e6cf281770e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0IGxhbmRzY2FwZXN8fHx8fHwxNzAxNjIzNTk4&ixlib=rb-4.0.3&q=80&w=400",
    author: "TechAdmin",
    date: new Date("2023-12-05")
  },
  {
    title: "New Survival Season Starting",
    content: "Get ready for a fresh start! New survival season begins next week with updated world generation and features. We're resetting the world but allowing players to take some of their earned items and currency to the new world. The new map features custom biomes, new structures to explore, and a revamped economy system. Make sure to claim your starter kit when you join!",
    image: "https://images.unsplash.com/photo-1619197731010-98452e391318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Z2FtaW5nIHNlcnZlciBjb21tdW5pdHl8fHx8fHwxNzAxNjIzNjM2&ixlib=rb-4.0.3&q=80&w=400",
    author: "GameMaster",
    date: new Date("2023-11-28")
  }
];

const screenshots = [
  {
    title: "Epic Castle Build",
    imageUrl: "https://images.unsplash.com/photo-1612800577418-d3e8c8d91684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0IGxhbmRzY2FwZXN8fHx8fHwxNzAxNjIzNjU0&ixlib=rb-4.0.3&q=80&w=500",
    author: "MineKing23",
    createdAt: new Date("2023-12-10")
  },
  {
    title: "Community PvP Tournament",
    imageUrl: "https://images.unsplash.com/photo-1636485338872-e48d36445521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Z2FtaW5nIHNlcnZlciBjb21tdW5pdHl8fHx8fHwxNzAxNjIzNjY4&ixlib=rb-4.0.3&q=80&w=500",
    author: "ServerAdmin",
    createdAt: new Date("2023-12-05")
  },
  {
    title: "Mountain Base",
    imageUrl: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Z2FtaW5nIHNlcnZlciBjb21tdW5pdHl8fHx8fHwxNzAxNjIzNjgx&ixlib=rb-4.0.3&q=80&w=500",
    author: "CraftMaster99",
    createdAt: new Date("2023-11-28")
  },
  {
    title: "Pixel Art Contest Winner",
    imageUrl: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGl4ZWwgYXJ0fHx8fHx8MTcwMTYyMzY5Nw&ixlib=rb-4.0.3&q=80&w=500",
    author: "PixelPro42",
    createdAt: new Date("2023-11-20")
  }
];

const serverStats = {
  peakPlayers: 42,
  maxPlayers: 100,
  uptime: 99.8,
  totalPlayers: 1247,
  worldSize: "4.2 GB",
  date: new Date()
};

const dailyPlayerCounts = [
  { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), count: 15, percentage: 30 },
  { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), count: 22, percentage: 45 },
  { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), count: 30, percentage: 60 },
  { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), count: 37, percentage: 75 },
  { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), count: 41, percentage: 90 },
  { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), count: 42, percentage: 100 },
  { date: new Date(), count: 38, percentage: 80 }
];

const monthlyStats = [
  { month: "2023-07", players: 850, newPlayers: 120 },
  { month: "2023-08", players: 925, newPlayers: 135 },
  { month: "2023-09", players: 980, newPlayers: 110 },
  { month: "2023-10", players: 1050, newPlayers: 148 },
  { month: "2023-11", players: 1175, newPlayers: 176 },
  { month: "2023-12", players: 1247, newPlayers: 152 }
];

async function seed() {
  try {
    console.log("Seeding database...");
    
    // Check if we already have data (to avoid duplicates)
    const existingNews = await db.query.news.findMany();
    if (existingNews.length === 0) {
      console.log("Seeding news...");
      for (const item of newsItems) {
        await db.insert(schema.news).values(item);
      }
    } else {
      console.log("News data already exists, skipping...");
    }
    
    const existingScreenshots = await db.query.screenshots.findMany();
    if (existingScreenshots.length === 0) {
      console.log("Seeding screenshots...");
      for (const screenshot of screenshots) {
        await db.insert(schema.screenshots).values(screenshot);
      }
    } else {
      console.log("Screenshot data already exists, skipping...");
    }
    
    const existingStats = await db.query.serverStats.findMany();
    if (existingStats.length === 0) {
      console.log("Seeding server stats...");
      await db.insert(schema.serverStats).values(serverStats);
    } else {
      console.log("Server stats data already exists, skipping...");
    }
    
    const existingDailyCounts = await db.query.dailyPlayerCounts.findMany();
    if (existingDailyCounts.length === 0) {
      console.log("Seeding daily player counts...");
      for (const count of dailyPlayerCounts) {
        await db.insert(schema.dailyPlayerCounts).values(count);
      }
    } else {
      console.log("Daily player count data already exists, skipping...");
    }
    
    const existingMonthlyStats = await db.query.monthlyStats.findMany();
    if (existingMonthlyStats.length === 0) {
      console.log("Seeding monthly stats...");
      for (const stat of monthlyStats) {
        await db.insert(schema.monthlyStats).values(stat);
      }
    } else {
      console.log("Monthly stats data already exists, skipping...");
    }
    
    console.log("Database seeding completed!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
