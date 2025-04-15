import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertNewsPostSchema } from "@shared/schema";
import { status as mcStatus } from "minecraft-server-util";
import cors from "cors";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS for all routes
  app.use(cors());
  
  // API routes - prefix all routes with /api
  
  // GET live Minecraft server status
  app.get("/api/status", async (_req: Request, res: Response) => {
    try {
      const options = {
        timeout: 5000, // 5 seconds timeout
        enableSRV: true // Enables SRV record lookup
      };
      
      const result = await mcStatus('fapcraft.sdlf.fun', 25565, options);
      
      res.json({
        online: result.players.online,
        max: result.players.max,
        motd: result.motd.clean,
        version: result.version.name,
        latency: result.roundTripLatency
      });
    } catch (error) {
      console.error("Error fetching Minecraft server status:", error);
      
      // Return a more user-friendly response for server that might be offline
      res.status(200).json({
        online: 0,
        max: 100,
        motd: "Welcome to FapCraft",
        version: "1.12.2",
        latency: 0,
        status: "offline",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  // GET server status - fetch real server status and track peak player counts
  app.get("/api/server-status", async (_req: Request, res: Response) => {
    try {
      const options = {
        timeout: 5000, // 5 seconds timeout
        enableSRV: true // Enables SRV record lookup
      };
      
      // Default server values in case fetch fails
      let isOnline = false;
      let playerCount = 0;
      let maxPlayers = 100;
      
      try {
        // Try to fetch actual server status
        const result = await mcStatus('fapcraft.sdlf.fun', 25565, options);
        isOnline = true;
        playerCount = result.players.online;
        maxPlayers = result.players.max;
        
        // If we have players online, check if it's a new peak and record it
        if (playerCount > 0) {
          const todayPeak = await storage.getTodayPlayerPeak();
          
          // If current player count exceeds today's peak, record it
          if (playerCount > todayPeak) {
            await storage.recordPlayerPeak(playerCount);
            console.log(`New peak player count recorded: ${playerCount}`);
          }
        }
      } catch (error) {
        console.error("Error fetching Minecraft server status:", error);
        // Server is offline or unreachable, leave default values
      }
      
      // Get today's peak player count
      const peakToday = await storage.getTodayPlayerPeak();
      
      res.json({
        isOnline,
        playerCount,
        maxPlayers,
        peakToday
      });
    } catch (error) {
      console.error("Error handling server status:", error);
      res.status(500).json({ 
        message: "Failed to get server status",
        isOnline: false,
        playerCount: 0,
        maxPlayers: 100,
        peakToday: 0 
      });
    }
  });

  // GET server content
  app.get("/api/content", async (_req: Request, res: Response) => {
    try {
      const [serverRules, serverFeatures, galleryImages] = await Promise.all([
        storage.getServerRules(),
        storage.getServerFeatures(),
        storage.getGalleryImages()
      ]);

      res.json({
        serverRules,
        serverFeatures,
        galleryImages
      });
    } catch (error) {
      console.error("Error fetching content:", error);
      res.status(500).json({ message: "Failed to fetch server content" });
    }
  });

  // News posts routes
  app.get("/api/news", async (_req: Request, res: Response) => {
    try {
      const newsPosts = await storage.getNewsPosts();
      res.json(newsPosts);
    } catch (error) {
      console.error("Error fetching news posts:", error);
      res.status(500).json({ message: "Failed to fetch news posts" });
    }
  });

  app.post("/api/news", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validationResult = insertNewsPostSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid news post data", 
          errors: validationResult.error.errors 
        });
      }
      
      const newsPostData = validationResult.data;
      
      // Create the news post
      const newsPost = await storage.createNewsPost(newsPostData);
      res.status(201).json(newsPost);
    } catch (error) {
      console.error("Error creating news post:", error);
      res.status(500).json({ message: "Failed to create news post" });
    }
  });

  app.delete("/api/news/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const success = await storage.deleteNewsPost(id);
      if (!success) {
        return res.status(404).json({ message: "News post not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting news post:", error);
      res.status(500).json({ message: "Failed to delete news post" });
    }
  });

  // Server rules routes (for admin use)
  app.put("/api/rules/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const updatedRule = await storage.updateServerRule(id, req.body);
      if (!updatedRule) {
        return res.status(404).json({ message: "Rule not found" });
      }

      res.json(updatedRule);
    } catch (error) {
      console.error("Error updating rule:", error);
      res.status(500).json({ message: "Failed to update rule" });
    }
  });

  // Server features routes (for admin use)
  app.put("/api/features/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const updatedFeature = await storage.updateServerFeature(id, req.body);
      if (!updatedFeature) {
        return res.status(404).json({ message: "Feature not found" });
      }

      res.json(updatedFeature);
    } catch (error) {
      console.error("Error updating feature:", error);
      res.status(500).json({ message: "Failed to update feature" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
