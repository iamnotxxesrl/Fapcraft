import { db } from "../server/db";
import { 
  serverRules, 
  serverFeatures, 
  galleryImages,
  playerPeaks,
  newsPosts
} from "../shared/schema";

async function seedDatabase() {
  console.log("Starting database seeding...");

  // Add default server rules
  const defaultRules = [
    { order: 1, title: "18+ Only", description: "This is an adult server. All players must be 18 years or older. No exceptions." },
    { order: 2, title: "Respect Other Players", description: "While adult content and language is allowed, harassment, discrimination, and targeted attacks are not tolerated." },
    { order: 3, title: "No Griefing", description: "Do not destroy or modify other players' builds without permission. This includes theft." },
    { order: 4, title: "No Hacking or Exploits", description: "Using hacked clients, exploits, or cheats will result in an immediate ban." },
    { order: 5, title: "Adult Content Zones", description: "Adult content is permitted but should be confined to designated adult zones. Check signs for zone restrictions." }
  ];

  // Add default server features
  const defaultFeatures = [
    { order: 1, title: "Custom Protection", description: "Advanced land claiming and protection system to keep your builds safe.", icon: "shield-alt", iconBackground: "bg-mc-green" },
    { order: 2, title: "Adult Content", description: "Unfiltered chat and mature content for our 18+ community. Express yourself freely.", icon: "heart", iconBackground: "bg-mc-purple" },
    { order: 3, title: "Economy System", description: "Player-driven economy with shops, trading, and custom currency.", icon: "coins", iconBackground: "bg-mc-brown" },
    { order: 4, title: "Custom World", description: "Explore our handcrafted world with unique biomes and hidden treasures.", icon: "globe", iconBackground: "bg-mc-green" },
    { order: 5, title: "Custom Plugins", description: "Unique gameplay features you won't find on any other server.", icon: "magic", iconBackground: "bg-mc-purple" },
    { order: 6, title: "Active Community", description: "Regular events, active Discord, and friendly players waiting to meet you.", icon: "users", iconBackground: "bg-mc-brown" }
  ];

  // Update with the user-provided gallery images from attached_assets
  const defaultGalleryImages = [
    { order: 1, title: "Server Spawn", imageUrl: "/image_1744729561975.png" },
    { order: 2, title: "Creative Building", imageUrl: "/image_1744729617893.png" },
    { order: 3, title: "Main Town Square", imageUrl: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzY4NA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" },
    { order: 4, title: "Underwater Base", imageUrl: "https://images.unsplash.com/photo-1626736637425-ddacef8a4edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzcyMw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" },
    { order: 5, title: "Adult Zone", imageUrl: "https://images.unsplash.com/photo-1623934199716-dc28818a6ec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzcyNg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" },
    { order: 6, title: "Special Event Area", imageUrl: "https://images.unsplash.com/photo-1562092253-35254bca7bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8bWluZWNyYWZ0fHx8fHx8MTcwNzU0NzY3Mw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" }
  ];

  // Add default news posts
  const defaultNewsPosts = [
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

  // Initial player peak
  const initialPeak = {
    count: 15
  };

  try {
    // Clear existing data before inserting new data
    await db.delete(serverRules);
    await db.delete(serverFeatures);
    await db.delete(galleryImages);
    await db.delete(newsPosts);
    await db.delete(playerPeaks);
    
    console.log("Existing data cleared");

    // Insert server rules
    for (const rule of defaultRules) {
      await db.insert(serverRules).values(rule);
    }
    console.log("Server rules added");

    // Insert server features
    for (const feature of defaultFeatures) {
      await db.insert(serverFeatures).values(feature);
    }
    console.log("Server features added");

    // Insert gallery images
    for (const image of defaultGalleryImages) {
      await db.insert(galleryImages).values(image);
    }
    console.log("Gallery images added");

    // Insert news posts
    for (const post of defaultNewsPosts) {
      await db.insert(newsPosts).values(post);
    }
    console.log("News posts added");

    // Insert initial player peak
    await db.insert(playerPeaks).values(initialPeak);
    console.log("Initial player peak added");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database pool
    process.exit(0);
  }
}

// Run the seeding function
seedDatabase();