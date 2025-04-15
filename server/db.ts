import mongoose from 'mongoose';

const MONGODB_URI = "mongodb+srv://atlas-sample-dataset-load-67fe97bbc322c94e0169da1c:YGHay6EGHJdXXCsm@cluster0.wo6xnwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schemas
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  discordId: { type: String, unique: true, sparse: true },
  discordUsername: String,
  discordAvatar: String,
  discordEmail: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const NewsPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: String,
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Define additional schemas
const ServerRuleSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const ServerFeatureSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  iconBackground: { type: String, default: 'bg-mc-green' }
});

const GalleryImageSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

const PlayerPeakSchema = new mongoose.Schema({
  count: { type: Number, required: true },
  recordDate: { type: Date, default: Date.now },
  timestamp: { type: Date, default: Date.now }
});

// Create models
export const User = mongoose.model('User', UserSchema);
export const NewsPost = mongoose.model('NewsPost', NewsPostSchema);
export const ServerRule = mongoose.model('ServerRule', ServerRuleSchema);
export const ServerFeature = mongoose.model('ServerFeature', ServerFeatureSchema);
export const GalleryImage = mongoose.model('GalleryImage', GalleryImageSchema);
export const PlayerPeak = mongoose.model('PlayerPeak', PlayerPeakSchema);