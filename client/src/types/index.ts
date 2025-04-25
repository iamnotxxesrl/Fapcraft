export interface ServerStatus {
  online: boolean;
  host: string;
  port: number;
  eula_blocked: boolean;
  version?: string;
  protocol?: number;
  players: {
    online: number;
    max: number;
    list?: Array<{
      uuid: string;
      name: string;
    }>;
  };
  motd: {
    raw: string;
    clean: string;
    html: string;
  };
  favicon?: string;
  srv_record?: {
    host: string;
    port: number;
  };
  round_trip_latency?: number;
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  author: string;
}

export interface Screenshot {
  id: number;
  title: string;
  imageUrl: string;
  author: string;
  createdAt: string;
}

export interface ServerStat {
  id: number;
  peakPlayers: number;
  maxPlayers: number;
  uptime: number;
  totalPlayers: number;
  worldSize: string;
  date: string;
}

export interface DailyPlayerCount {
  id: number;
  date: string;
  count: number;
  percentage: number;
}
