import { VercelRequest, VercelResponse } from '@vercel/node';
import * as mcutil from 'minecraft-server-util';
import { db } from '../server/db';
import { playerPeaks, serverRules, serverFeatures, galleryImages, newsPosts } from '../shared/schema';
import { eq, desc, sql } from 'drizzle-orm';

// Handler for Vercel serverless functions
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Extract the path and method to determine which API handler to use
  const path = req.url?.replace(/^\/api/, '') || '/';
  const method = req.method?.toLowerCase() || 'get';
  
  try {
    // Send appropriate CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight CORS requests
    if (method === 'options') {
      return res.status(200).end();
    }
    
    // Route to the appropriate handler based on the request path and method
    if (path === '/status' && method === 'get') {
      return res.status(200).json({ status: 'API is working!' });
    }
    
    if (path === '/server-status' && method === 'get') {
      return await handleServerStatus(req, res);
    }
    
    if (path === '/content' && method === 'get') {
      return await handleContent(req, res);
    }
    
    if (path === '/news' && method === 'get') {
      return await handleGetNews(req, res);
    }
    
    if (path === '/news' && method === 'post') {
      return await handleCreateNews(req, res);
    }
    
    if (path.startsWith('/news/') && method === 'delete') {
      const id = parseInt(path.replace('/news/', ''));
      return await handleDeleteNews(req, res, id);
    }
    
    // If we get here, the route is not found
    return res.status(404).json({ error: 'Route not found' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

// API route handlers
async function handleServerStatus(_req: VercelRequest, res: VercelResponse) {
  const SERVER_ADDRESS = "fapcraft.sdlf.fun";
  const options = {
    timeout: 5000, // 5 seconds timeout
  };

  try {
    const result = await mcutil.status(SERVER_ADDRESS, 25565, options);
    
    // Get today's peak from database
    const todayPeak = await getTodayPlayerPeak();
    const currentPlayers = result.players.online;
    
    // If current player count is higher than today's peak, update it
    if (currentPlayers > todayPeak) {
      await recordPlayerPeak(currentPlayers);
    }
    
    return res.status(200).json({
      isOnline: true,
      playerCount: result.players.online,
      maxPlayers: result.players.max,
      peakToday: Math.max(todayPeak, currentPlayers), // Return the new peak
      version: result.version.name
    });
  } catch (err) {
    console.error('Error fetching Minecraft server status:', err);
    // Return offline status on error
    return res.status(200).json({
      isOnline: false,
      playerCount: 0,
      maxPlayers: 20,
      peakToday: await getTodayPlayerPeak(),
      version: 'Offline'
    });
  }
}

async function handleContent(_req: VercelRequest, res: VercelResponse) {
  // Get all content in a single request
  const [rules, features, images] = await Promise.all([
    getServerRules(),
    getServerFeatures(),
    getGalleryImages()
  ]);
  
  return res.status(200).json({
    serverRules: rules,
    serverFeatures: features,
    galleryImages: images
  });
}

async function handleGetNews(_req: VercelRequest, res: VercelResponse) {
  const news = await getNewsPosts();
  return res.status(200).json(news);
}

async function handleCreateNews(req: VercelRequest, res: VercelResponse) {
  const post = req.body;
  const newPost = await createNewsPost(post);
  return res.status(201).json(newPost);
}

async function handleDeleteNews(_req: VercelRequest, res: VercelResponse, id: number) {
  const success = await deleteNewsPost(id);
  if (success) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(404).json({ error: 'News post not found' });
  }
}

// Database interaction functions
async function getNewsPosts() {
  return db.select().from(newsPosts).orderBy(desc(newsPosts.createdAt));
}

async function createNewsPost(post: any) {
  const [newPost] = await db
    .insert(newsPosts)
    .values({
      title: post.title,
      content: post.content,
      author: post.author || null,
      isAnonymous: post.isAnonymous || false,
      createdAt: new Date()
    })
    .returning();
  return newPost;
}

async function deleteNewsPost(id: number) {
  const result = await db
    .delete(newsPosts)
    .where(eq(newsPosts.id, id))
    .returning({ id: newsPosts.id });
  return result.length > 0;
}

async function getServerRules() {
  return db.select().from(serverRules).orderBy(serverRules.order);
}

async function getServerFeatures() {
  return db.select().from(serverFeatures).orderBy(serverFeatures.order);
}

async function getGalleryImages() {
  return db.select().from(galleryImages);
}

async function getTodayPlayerPeak() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const [peak] = await db
    .select()
    .from(playerPeaks)
    .where(sql`DATE(${playerPeaks.timestamp}) = DATE(CURRENT_DATE)`)
    .orderBy(desc(playerPeaks.count))  // Use count field instead of playerCount
    .limit(1);
  
  return peak ? peak.count : 0;  // Return count field
}

async function recordPlayerPeak(count: number) {
  const [peak] = await db
    .insert(playerPeaks)
    .values({
      count,  // Use count field as defined in schema
      timestamp: new Date()
    })
    .returning();
  return peak;
}