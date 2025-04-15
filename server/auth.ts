import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { Express, Request, Response, NextFunction } from 'express';
import { db } from './db';
import { users, type User } from '@shared/schema';
import { eq } from 'drizzle-orm';
import { pool } from './db';

// Configure PostgreSQL store for sessions
const PgStore = connectPgSimple(session);

// Discord strategy scopes - what data we want from Discord
const DISCORD_SCOPES = ['identify', 'email'];

// Setup Passport with Discord strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: process.env.NODE_ENV === 'production' 
        ? 'https://fapcraft-site.vercel.app/api/auth/discord/callback'
        : 'http://localhost:5000/api/auth/discord/callback',
      scope: DISCORD_SCOPES,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        const [existingUser] = await db
          .select()
          .from(users)
          .where(eq(users.discordId, profile.id));

        if (existingUser) {
          // Update existing user with latest Discord data
          const [updatedUser] = await db
            .update(users)
            .set({
              discordUsername: profile.username,
              discordAvatar: profile.avatar,
              discordEmail: profile.email,
            })
            .where(eq(users.id, existingUser.id))
            .returning();

          return done(null, updatedUser);
        }

        // Create new user if they don't exist yet
        const [newUser] = await db
          .insert(users)
          .values({
            username: profile.username,
            discordId: profile.id,
            discordUsername: profile.username,
            discordAvatar: profile.avatar,
            discordEmail: profile.email,
          })
          .returning();

        return done(null, newUser);
      } catch (error) {
        console.error('Error during authentication:', error);
        return done(error as Error, undefined);
      }
    }
  )
);

// Serialize user to session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: number, done) => {
  try {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    done(null, user || null);
  } catch (error) {
    done(error, null);
  }
});

// Export function to configure authentication on our Express app
export function setupAuth(app: Express): void {
  // Session configuration
  app.use(
    session({
      store: new PgStore({
        pool,
        tableName: 'session',
      }),
      secret: process.env.SESSION_SECRET || 'fapcraft-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: process.env.NODE_ENV === 'production',
      }
    })
  );

  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Auth endpoints
  app.get('/api/auth/discord', 
    passport.authenticate('discord'));

  app.get('/api/auth/discord/callback',
    passport.authenticate('discord', {
      successRedirect: '/',
      failureRedirect: '/login-error',
    }));

  app.get('/api/auth/logout', (req, res) => {
    req.logout(() => {
      res.redirect('/');
    });
  });

  // User data endpoint
  app.get('/api/auth/user', (req, res) => {
    if (req.isAuthenticated()) {
      // Return user data without sensitive info
      const user = req.user as User;
      res.json({
        id: user.id,
        username: user.username,
        discordUsername: user.discordUsername,
        discordAvatar: user.discordAvatar,
        isAdmin: user.isAdmin
      });
    } else {
      res.status(401).json({ error: 'Not authenticated' });
    }
  });
}

// Auth middleware for protected routes
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Authentication required' });
}

// Admin middleware
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && (req.user as User).isAdmin) {
    return next();
  }
  res.status(403).json({ error: 'Admin privileges required' });
}