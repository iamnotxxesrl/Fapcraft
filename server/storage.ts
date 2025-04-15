import { User, NewsPost, ServerRule, ServerFeature, GalleryImage, PlayerPeak } from './db';
import type { InsertUser, InsertNewsPost, InsertServerRule, InsertServerFeature, InsertGalleryImage, InsertPlayerPeak } from '@shared/schema';

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // News posts methods
  getNewsPosts(): Promise<NewsPost[]>;
  getNewsPost(id: string): Promise<NewsPost | undefined>;
  createNewsPost(post: InsertNewsPost): Promise<NewsPost>;
  deleteNewsPost(id: string): Promise<boolean>;

  // Server rules methods
  getServerRules(): Promise<ServerRule[]>;
  getServerRule(id: string): Promise<ServerRule | undefined>;
  createServerRule(rule: InsertServerRule): Promise<ServerRule>;
  updateServerRule(id: string, rule: Partial<InsertServerRule>): Promise<ServerRule | undefined>;
  deleteServerRule(id: string): Promise<boolean>;

  // Server features methods
  getServerFeatures(): Promise<ServerFeature[]>;
  getServerFeature(id: string): Promise<ServerFeature | undefined>;
  createServerFeature(feature: InsertServerFeature): Promise<ServerFeature>;
  updateServerFeature(id: string, feature: Partial<InsertServerFeature>): Promise<ServerFeature | undefined>;
  deleteServerFeature(id: string): Promise<boolean>;

  // Gallery images methods
  getGalleryImages(): Promise<GalleryImage[]>;
  getGalleryImage(id: string): Promise<GalleryImage | undefined>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: string): Promise<boolean>;

  // Player peak methods
  getPlayerPeaks(): Promise<PlayerPeak[]>;
  getTodayPlayerPeak(): Promise<number>;
  recordPlayerPeak(count: number): Promise<PlayerPeak>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private newsPosts: Map<string, NewsPost>;
  private serverRules: Map<string, ServerRule>;
  private serverFeatures: Map<string, ServerFeature>;
  private galleryImages: Map<string, GalleryImage>;
  private playerPeaks: Map<string, PlayerPeak>;

  private currentUserId: number;
  private currentNewsPostId: number;
  private currentServerRuleId: number;
  private currentServerFeatureId: number;
  private currentGalleryImageId: number;
  private currentPlayerPeakId: number;

  constructor() {
    this.users = new Map();
    this.newsPosts = new Map();
    this.serverRules = new Map();
    this.serverFeatures = new Map();
    this.galleryImages = new Map();
    this.playerPeaks = new Map();

    this.currentUserId = 1;
    this.currentNewsPostId = 1;
    this.currentServerRuleId = 1;
    this.currentServerFeatureId = 1;
    this.currentGalleryImageId = 1;
    this.currentPlayerPeakId = 1;

    // Initialize with default data
    this.initializeDefaultData();
  }

  // Initialize default data for the application
  private initializeDefaultData() {
    // Default server rules
    const defaultRules: InsertServerRule[] = [
      { order: 1, title: "18+ Only", description: "This is an adult server. All players must be 18 years or older. No exceptions." },
      { order: 2, title: "Respect Other Players", description: "While adult content and language is allowed, harassment, discrimination, and targeted attacks are not tolerated." },
      { order: 3, title: "No Griefing", description: "Do not destroy or modify other players' builds without permission. This includes theft." },
      { order: 4, title: "No Hacking or Exploits", description: "Using hacked clients, exploits, or cheats will result in an immediate ban." },
      { order: 5, title: "Adult Content Zones", description: "Adult content is permitted but should be confined to designated adult zones. Check signs for zone restrictions." }
    ];

    // Default server features
    const defaultFeatures: InsertServerFeature[] = [
      { order: 1, title: "Custom Protection", description: "Advanced land claiming and protection system to keep your builds safe.", icon: "shield-alt", iconBackground: "bg-mc-green" },
      { order: 2, title: "Adult Content", description: "Unfiltered chat and mature content for our 18+ community. Express yourself freely.", icon: "heart", iconBackground: "bg-mc-purple" },
      { order: 3, title: "Economy System", description: "Player-driven economy with shops, trading, and custom currency.", icon: "coins", iconBackground: "bg-mc-brown" },
      { order: 4, title: "Custom World", description: "Explore our handcrafted world with unique biomes and hidden treasures.", icon: "globe", iconBackground: "bg-mc-green" },
      { order: 5, title: "Custom Plugins", description: "Unique gameplay features you won't find on any other server.", icon: "magic", iconBackground: "bg-mc-purple" },
      { order: 6, title: "Active Community", description: "Regular events, active Discord, and friendly players waiting to meet you.", icon: "users", iconBackground: "bg-mc-brown" }
    ];

    // Default gallery images
    const defaultGalleryImages: InsertGalleryImage[] = [
      { order: 1, title: "Beautiful Mountain View", imageUrl: "https://images.unsplash.com/photo-1587573578271-55c2a47c82bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzU4Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" },
      { order: 2, title: "Player Creations", imageUrl: "https://images.unsplash.com/photo-1628968434441-d9c8e092aec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzY0Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" },
      { order: 3, title: "Main Town Square", imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzY4NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" },
      { order: 4, title: "Underwater Base", imageUrl: "https://images.unsplash.com/photo-1626736637425-ddacef8a4edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzcyMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" },
      { order: 5, title: "Night Time Activities", imageUrl: "https://images.unsplash.com/photo-1623934199716-dc28818a6ec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzcyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" },
      { order: 6, title: "Special Event Area", imageUrl: "https://images.unsplash.com/photo-1562092253-35254bca7bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzY3Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" }
    ];

    // Default news posts
    const defaultNewsPosts: InsertNewsPost[] = [
      {
        title: "Server Maintenance Complete",
        content: "We've updated to the latest version and added some exciting new plugins! The server is back online now with improved performance.",
        author: "Admin",
        isAnonymous: false
      },
      {
        title: "New Adult-Only Zone Added!",
        content: "We've added a special new area to the server with unique adult-themed content. Make sure to check out the new zone south of spawn!",
        author: "Anonymous",
        isAnonymous: true
      },
      {
        title: "Weekend Double XP Event",
        content: "This weekend we're running a double XP event! Login between Friday 8pm and Sunday midnight to earn twice the experience points for all activities.",
        author: "EventManager",
        isAnonymous: false
      }
    ];

    // Add default rules
    defaultRules.forEach(rule => {
      this.createServerRule(rule);
    });

    // Add default features
    defaultFeatures.forEach(feature => {
      this.createServerFeature(feature);
    });

    // Add default gallery images
    defaultGalleryImages.forEach(image => {
      this.createGalleryImage(image);
    });

    // Add default news posts
    defaultNewsPosts.forEach(post => {
      this.createNewsPost(post);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++.toString();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // News posts methods
  async getNewsPosts(): Promise<NewsPost[]> {
    return Array.from(this.newsPosts.values()).sort((a, b) => {
      // Sort by creation date, newest first
      return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
    });
  }

  async getNewsPost(id: string): Promise<NewsPost | undefined> {
    return this.newsPosts.get(id);
  }

  async createNewsPost(post: InsertNewsPost): Promise<NewsPost> {
    const id = this.currentNewsPostId++.toString();
    const createdAt = new Date();
    const newsPost: NewsPost = {
      id,
      title: post.title,
      content: post.content,
      author: post.author ?? null,
      isAnonymous: post.isAnonymous ?? null,
      createdAt
    };
    this.newsPosts.set(id, newsPost);
    return newsPost;
  }

  async deleteNewsPost(id: string): Promise<boolean> {
    return this.newsPosts.delete(id);
  }

  // Server rules methods
  async getServerRules(): Promise<ServerRule[]> {
    return Array.from(this.serverRules.values()).sort((a, b) => a.order - b.order);
  }

  async getServerRule(id: string): Promise<ServerRule | undefined> {
    return this.serverRules.get(id);
  }

  async createServerRule(rule: InsertServerRule): Promise<ServerRule> {
    const id = this.currentServerRuleId++.toString();
    const serverRule: ServerRule = { ...rule, id };
    this.serverRules.set(id, serverRule);
    return serverRule;
  }

  async updateServerRule(id: string, rule: Partial<InsertServerRule>): Promise<ServerRule | undefined> {
    const existingRule = this.serverRules.get(id);
    if (!existingRule) return undefined;

    const updatedRule: ServerRule = { ...existingRule, ...rule };
    this.serverRules.set(id, updatedRule);
    return updatedRule;
  }

  async deleteServerRule(id: string): Promise<boolean> {
    return this.serverRules.delete(id);
  }

  // Server features methods
  async getServerFeatures(): Promise<ServerFeature[]> {
    return Array.from(this.serverFeatures.values()).sort((a, b) => a.order - b.order);
  }

  async getServerFeature(id: string): Promise<ServerFeature | undefined> {
    return this.serverFeatures.get(id);
  }

  async createServerFeature(feature: InsertServerFeature): Promise<ServerFeature> {
    const id = this.currentServerFeatureId++.toString();
    const serverFeature: ServerFeature = {
      id,
      title: feature.title,
      order: feature.order,
      description: feature.description,
      icon: feature.icon,
      iconBackground: feature.iconBackground ?? null
    };
    this.serverFeatures.set(id, serverFeature);
    return serverFeature;
  }

  async updateServerFeature(id: string, feature: Partial<InsertServerFeature>): Promise<ServerFeature | undefined> {
    const existingFeature = this.serverFeatures.get(id);
    if (!existingFeature) return undefined;

    const updatedFeature: ServerFeature = { ...existingFeature, ...feature };
    this.serverFeatures.set(id, updatedFeature);
    return updatedFeature;
  }

  async deleteServerFeature(id: string): Promise<boolean> {
    return this.serverFeatures.delete(id);
  }

  // Gallery images methods
  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values()).sort((a, b) => a.order - b.order);
  }

  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    return this.galleryImages.get(id);
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.currentGalleryImageId++.toString();
    const galleryImage: GalleryImage = { ...image, id };
    this.galleryImages.set(id, galleryImage);
    return galleryImage;
  }

  async updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined> {
    const existingImage = this.galleryImages.get(id);
    if (!existingImage) return undefined;

    const updatedImage: GalleryImage = { ...existingImage, ...image };
    this.galleryImages.set(id, updatedImage);
    return updatedImage;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  // Player peak methods
  async getPlayerPeaks(): Promise<PlayerPeak[]> {
    return Array.from(this.playerPeaks.values()).sort((a, b) => {
      // Sort by timestamp, newest first
      return new Date(b.timestamp!).getTime() - new Date(a.timestamp!).getTime();
    });
  }

  async getTodayPlayerPeak(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    // Filter peaks from today and find the max
    const todayPeaks = Array.from(this.playerPeaks.values()).filter(peak => {
      const peakDate = new Date(peak.recordDate);
      peakDate.setHours(0, 0, 0, 0); // Start of peak day
      return peakDate.getTime() === today.getTime();
    });

    if (todayPeaks.length === 0) {
      return 0; // No peaks recorded today
    }

    // Return the highest count
    return Math.max(...todayPeaks.map(peak => peak.count));
  }

  async recordPlayerPeak(count: number): Promise<PlayerPeak> {
    const id = this.currentPlayerPeakId++.toString();
    const now = new Date();

    const playerPeak: PlayerPeak = {
      id,
      count,
      recordDate: now,
      timestamp: now
    };

    this.playerPeaks.set(id, playerPeak);
    return playerPeak;
  }
}


// Database implementation of the storage interface
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return await User.findById(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await User.findOne({ username });
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return await User.create(insertUser);
  }

  // News posts methods
  async getNewsPosts(): Promise<NewsPost[]> {
    return await NewsPost.find().sort({ createdAt: -1 });
  }

  async getNewsPost(id: string): Promise<NewsPost | undefined> {
    return await NewsPost.findById(id);
  }

  async createNewsPost(post: InsertNewsPost): Promise<NewsPost> {
    return await NewsPost.create(post);
  }

  async deleteNewsPost(id: string): Promise<boolean> {
    const result = await NewsPost.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  // Server rules methods
  async getServerRules(): Promise<ServerRule[]> {
    return await ServerRule.find().sort({ order: 1 });
  }
  async getServerRule(id: string): Promise<ServerRule | undefined> {
    return await ServerRule.findById(id);
  }
  async createServerRule(rule: InsertServerRule): Promise<ServerRule> {
    return await ServerRule.create(rule);
  }
  async updateServerRule(id: string, rule: Partial<InsertServerRule>): Promise<ServerRule | undefined> {
    const updatedRule = await ServerRule.findByIdAndUpdate(id, rule, { new: true });
    return updatedRule;
  }
  async deleteServerRule(id: string): Promise<boolean> {
    const result = await ServerRule.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  // Server features methods
  async getServerFeatures(): Promise<ServerFeature[]> {
    return await ServerFeature.find().sort({ order: 1 });
  }
  async getServerFeature(id: string): Promise<ServerFeature | undefined> {
    return await ServerFeature.findById(id);
  }
  async createServerFeature(feature: InsertServerFeature): Promise<ServerFeature> {
    return await ServerFeature.create(feature);
  }
  async updateServerFeature(id: string, feature: Partial<InsertServerFeature>): Promise<ServerFeature | undefined> {
    const updatedFeature = await ServerFeature.findByIdAndUpdate(id, feature, { new: true });
    return updatedFeature;
  }
  async deleteServerFeature(id: string): Promise<boolean> {
    const result = await ServerFeature.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  // Gallery images methods
  async getGalleryImages(): Promise<GalleryImage[]> {
    return await GalleryImage.find().sort({ order: 1 });
  }
  async getGalleryImage(id: string): Promise<GalleryImage | undefined> {
    return await GalleryImage.findById(id);
  }
  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    return await GalleryImage.create(image);
  }
  async updateGalleryImage(id: string, image: Partial<InsertGalleryImage>): Promise<GalleryImage | undefined> {
    const updatedImage = await GalleryImage.findByIdAndUpdate(id, image, { new: true });
    return updatedImage;
  }
  async deleteGalleryImage(id: string): Promise<boolean> {
    const result = await GalleryImage.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }

  // Player peak methods
  async getPlayerPeaks(): Promise<PlayerPeak[]> {
    return await PlayerPeak.find().sort({ timestamp: -1 });
  }

  async getTodayPlayerPeak(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayPeaks = await PlayerPeak.find({ recordDate: { $gte: today, $lt: new Date(today.getTime() + 86400000) } });

    if (todayPeaks.length === 0) return 0;
    return Math.max(...todayPeaks.map(peak => peak.count));
  }

  async recordPlayerPeak(count: number): Promise<PlayerPeak> {
    return await PlayerPeak.create({ count });
  }
}

// Use DatabaseStorage for persistent storage
export const storage = new DatabaseStorage();