export interface CampaignMetrics {
  email: number;
  linkedin: number;
  other: number;
}

export interface TrafficChannel {
  channel: string;
  sessions: number;
  pageviews: number;
  users: number;
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
  trafficBreakdown?: TrafficChannel[];
  campaigns: CampaignMetrics;
  activities: string[];
}

export type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';

export interface DashboardState {
  selectedQuarter: Quarter;
}