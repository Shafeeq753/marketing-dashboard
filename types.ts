export interface CampaignMetrics {
  email: number;
  linkedin: number;
  other: number;
}

export interface TrafficChannel {
  channel: string;
  sessions: number;
  pageviews?: number;
  users?: number;
}

export interface AiCrawler {
  name: string;
  bot?: string;
  requests: number;
}

export interface AiCrawlStats {
  total: number;
  allowed: number;
  unsuccessful: number;
  crawlers?: AiCrawler[];
}

export interface GoogleCrawlStats {
  totalRequests: number;
  downloadBytes?: number; // total download size in bytes
  avgResponseMs?: number; // average response time (ms)
}

export interface ActivityGroup {
  title: string;
  items?: string[];
  action?: string; // If set, the group renders as ONE clickable box that fires this action (e.g. open a modal) instead of listing items
}

export interface MonthlyData {
  month: string;
  quarter: string;
  traffic: number;
  benchmarkVideos: number;
  benchmarkVideosSecondary?: number; // Historical secondary metric (e.g. views)
  totalVideosOnSite: number; // The running total of active videos on the site
  newsletters: number;
  blogs: number;
  caseStudies?: number;
  servicePages?: number;
  locationPages?: number;
  faqPages?: number;
  glossary?: number;
  pricingPages?: number;
  vsPages?: number;
  decliningPages?: number;
  commercialKeywordPages?: number;
  exhibitorPages?: number;
  listicleBlogs?: number;
  revampedBlogs?: number; // Existing blog pages revamped (not newly published)
  revampedVihPages?: number; // Existing VIH pages revamped
  internsHired?: number; // Hiring & training — interns onboarded
  backlinkDirectories?: number; // Backlink directories added
  backlinkGuestOutreach?: number; // Guest outreach for backlinks
  backlinkCollaborations?: number; // Backlink collaborations
  videosScraped?: number; // Videos scraped for VIH
  techFixes?: string[]; // Tech / on-site issues fixed (listed in modal)
  trafficBreakdown?: TrafficChannel[];
  aiCrawl?: AiCrawlStats; // AI crawler stats (e.g. Cloudflare AI crawlers)
  googleCrawl?: GoogleCrawlStats; // Google Search Console crawl stats
  campaigns?: CampaignMetrics; // Optional: omitted for periods handled by another team (e.g. current FY)
  activities?: string[];
  activityGroups?: ActivityGroup[]; // Grouped activities for the feed (falls back to flat `activities`)
}

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface DashboardState {
  selectedQuarter: Quarter;
}