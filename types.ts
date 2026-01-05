export interface CampaignMetrics {
  email: number;
  linkedin: number;
  other: number;
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
  campaigns: CampaignMetrics;
  activities: string[];
}

export type Quarter = 'Q2' | 'Q3' | 'Q4';

export interface DashboardState {
  selectedQuarter: Quarter;
}