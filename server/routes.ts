import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import * as storage from "./storage";
import fs from "fs";
import path from "path";
import multer from "multer";
import cron from "node-cron";
import axios from "axios";
import { z } from "zod";
import { insertNewsSchema, insertScreenshotSchema } from "@shared/schema";

const apiPrefix = "/api";

// Set up multer for file uploads
const storage_config = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "dist/public/uploads");
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
  }
});

const upload = multer({ 
  storage: storage_config,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});

// Function to fetch server status from mcstatus.io API
const fetchServerStatus = async () => {
  try {
    const response = await axios.get("https://api.mcstatus.io/v2/status/java/kingdomoffap.falixsrv.me");
    return response.data;
  } catch (error) {
    console.error("Error fetching Minecraft server status:", error);
    return { online: false, players: { online: 0, max: 0 } };
  }
};

// Scheduled task to update stats based on server status
const scheduleStatsUpdates = () => {
  // Update stats every 15 minutes
  cron.schedule("*/15 * * * *", async () => {
    try {
      const serverStatus = await fetchServerStatus();
      
      if (serverStatus.online) {
        const latestStats = await storage.getLatestServerStats();
        
        if (latestStats) {
          // Update peak players if needed
          if (serverStatus.players.online > latestStats.peakPlayers) {
            await storage.updateServerStats(latestStats.id, {
              peakPlayers: serverStatus.players.online
            });
          }
        }
      }
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  });
  
  // Update daily player counts at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      const serverStatus = await fetchServerStatus();
      
      if (serverStatus.online) {
        const percentage = Math.round((serverStatus.players.online / serverStatus.players.max) * 100);
        
        await storage.createDailyPlayerCount({
          count: serverStatus.players.online,
          percentage,
          date: new Date()
        });
      }
    } catch (error) {
      console.error("Error updating daily player counts:", error);
    }
  });
  
  // Log that the scheduler is running
  console.log("Server stats update scheduler started");
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize the HTTP server
  const httpServer = createServer(app);
  
  // Start scheduled tasks
  scheduleStatsUpdates();
  
  // Server status endpoint
  app.get(`${apiPrefix}/server-status`, async (req, res) => {
    try {
      const serverStatus = await fetchServerStatus();
      res.json(serverStatus);
    } catch (error) {
      console.error("Error fetching server status:", error);
      res.status(500).json({ error: "Failed to fetch server status" });
    }
  });
  
  // News endpoints
  app.get(`${apiPrefix}/news`, async (req, res) => {
    try {
      const allNews = await storage.getAllNews();
      res.json(allNews);
    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });
  
  app.get(`${apiPrefix}/news/:id`, async (req, res) => {
    try {
      const newsId = parseInt(req.params.id);
      const newsItem = await storage.getNewsById(newsId);
      
      if (!newsItem) {
        return res.status(404).json({ error: "News item not found" });
      }
      
      res.json(newsItem);
    } catch (error) {
      console.error("Error fetching news item:", error);
      res.status(500).json({ error: "Failed to fetch news item" });
    }
  });
  
  app.post(`${apiPrefix}/news`, async (req, res) => {
    try {
      const validatedData = insertNewsSchema.parse(req.body);
      const newNews = await storage.createNews(validatedData);
      res.status(201).json(newNews);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error creating news:", error);
      res.status(500).json({ error: "Failed to create news" });
    }
  });
  
  app.put(`${apiPrefix}/news/:id`, async (req, res) => {
    try {
      const newsId = parseInt(req.params.id);
      const validatedData = insertNewsSchema.parse(req.body);
      const updatedNews = await storage.updateNews(newsId, validatedData);
      
      if (!updatedNews) {
        return res.status(404).json({ error: "News item not found" });
      }
      
      res.json(updatedNews);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Error updating news:", error);
      res.status(500).json({ error: "Failed to update news" });
    }
  });
  
  app.delete(`${apiPrefix}/news/:id`, async (req, res) => {
    try {
      const newsId = parseInt(req.params.id);
      const deletedNews = await storage.deleteNews(newsId);
      
      if (!deletedNews) {
        return res.status(404).json({ error: "News item not found" });
      }
      
      res.json({ message: "News item deleted successfully" });
    } catch (error) {
      console.error("Error deleting news:", error);
      res.status(500).json({ error: "Failed to delete news" });
    }
  });
  
  // Screenshots endpoints
  app.get(`${apiPrefix}/screenshots`, async (req, res) => {
    try {
      const allScreenshots = await storage.getAllScreenshots();
      res.json(allScreenshots);
    } catch (error) {
      console.error("Error fetching screenshots:", error);
      res.status(500).json({ error: "Failed to fetch screenshots" });
    }
  });
  
  app.get(`${apiPrefix}/screenshots/:id`, async (req, res) => {
    try {
      const screenshotId = parseInt(req.params.id);
      const screenshot = await storage.getScreenshotById(screenshotId);
      
      if (!screenshot) {
        return res.status(404).json({ error: "Screenshot not found" });
      }
      
      res.json(screenshot);
    } catch (error) {
      console.error("Error fetching screenshot:", error);
      res.status(500).json({ error: "Failed to fetch screenshot" });
    }
  });
  
  app.post(`${apiPrefix}/screenshots`, upload.single("screenshot"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No screenshot file provided" });
      }
      
      // Create the public URL for the uploaded file
      const serverUrl = `${req.protocol}://${req.get("host")}`;
      const fileUrl = `${serverUrl}/uploads/${path.basename(req.file.path)}`;
      
      // Get the file details and create a title if not provided
      const title = req.body.title || path.basename(req.file.originalname, path.extname(req.file.originalname));
      const author = req.body.author || "Anonymous";
      
      // Create screenshot entry in the database
      const newScreenshot = await storage.createScreenshot({
        title,
        imageUrl: fileUrl,
        author,
        createdAt: new Date(),
        userId: req.body.userId ? parseInt(req.body.userId) : undefined
      });
      
      res.status(201).json(newScreenshot);
    } catch (error) {
      console.error("Error uploading screenshot:", error);
      res.status(500).json({ error: "Failed to upload screenshot" });
    }
  });
  
  app.delete(`${apiPrefix}/screenshots/:id`, async (req, res) => {
    try {
      const screenshotId = parseInt(req.params.id);
      const deletedScreenshot = await storage.deleteScreenshot(screenshotId);
      
      if (!deletedScreenshot) {
        return res.status(404).json({ error: "Screenshot not found" });
      }
      
      // Attempt to delete the file from the filesystem
      try {
        const filePath = path.join(process.cwd(), "dist/public", new URL(deletedScreenshot.imageUrl).pathname);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (fileError) {
        console.error("Error deleting screenshot file:", fileError);
        // Continue anyway since the database entry was deleted
      }
      
      res.json({ message: "Screenshot deleted successfully" });
    } catch (error) {
      console.error("Error deleting screenshot:", error);
      res.status(500).json({ error: "Failed to delete screenshot" });
    }
  });
  
  // Server stats endpoints
  app.get(`${apiPrefix}/stats`, async (req, res) => {
    try {
      const stats = await storage.getLatestServerStats();
      
      if (!stats) {
        // Get realtime server status if no stats exist yet
        const serverStatus = await fetchServerStatus();
        return res.json({
          id: 0,
          peakPlayers: serverStatus.online ? serverStatus.players.online : 0,
          maxPlayers: serverStatus.online ? serverStatus.players.max : 0,
          uptime: 99.8, // Default value
          totalPlayers: 1247, // Default value
          worldSize: "4.2 GB", // Default value
          date: new Date()
        });
      }
      
      res.json(stats);
    } catch (error) {
      console.error("Error fetching server stats:", error);
      res.status(500).json({ error: "Failed to fetch server stats" });
    }
  });
  
  app.get(`${apiPrefix}/stats/activity`, async (req, res) => {
    try {
      const activityData = await storage.getDailyPlayerCounts(7);
      res.json(activityData);
    } catch (error) {
      console.error("Error fetching player activity:", error);
      res.status(500).json({ error: "Failed to fetch player activity" });
    }
  });
  
  app.get(`${apiPrefix}/stats/monthly`, async (req, res) => {
    try {
      const monthlyData = await storage.getMonthlyStats();
      res.json(monthlyData);
    } catch (error) {
      console.error("Error fetching monthly stats:", error);
      res.status(500).json({ error: "Failed to fetch monthly stats" });
    }
  });
  
  return httpServer;
}
