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
  benchmarkVideosSecondary?: number; // The number in brackets (e.g., views or cumulative)
  newsletters: number;
  blogs: number;
  campaigns: CampaignMetrics;
  activities: string[];
}

export type Quarter = 'Q2' | 'Q3' | 'Q4';

export interface DashboardState {
  selectedQuarter: Quarter;
}