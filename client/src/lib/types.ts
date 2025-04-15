import { NewsPost, ServerRule, ServerFeature, GalleryImage } from "@shared/schema";

// Server status type (from older API)
export interface ServerStatus {
  isOnline: boolean;
  playerCount: number;
  maxPlayers: number;
  peakToday: number;
}

// Minecraft server status type (from new API)
export interface MinecraftServerStatus {
  online: number;
  max: number;
  motd: string;
  version: string;
  latency: number;
  status?: string; // For offline servers
  error?: string;  // For error cases
}

// Server content type
export interface ServerContent {
  serverRules: ServerRule[];
  serverFeatures: ServerFeature[];
  galleryImages: GalleryImage[];
}

// Re-export shared types
export type { NewsPost, ServerRule, ServerFeature, GalleryImage };
