import { MonthlyData } from './types';

export const MONTHLY_DATA: MonthlyData[] = [
  {
    month: 'July',
    quarter: 'Q2',
    traffic: 1673,
    benchmarkVideos: 310,
    newsletters: 1,
    blogs: 16,
    campaigns: { email: 1100, linkedin: 0, other: 0 },
    activities: ['Weekly Newsletter (1)']
  },
  {
    month: 'August',
    quarter: 'Q2',
    traffic: 1567,
    benchmarkVideos: 59,
    newsletters: 3,
    blogs: 8,
    campaigns: { email: 356, linkedin: 475, other: 0 },
    activities: ['Weekly Newsletter (3)', 'Newsletter Automation', 'Benchmark tool']
  },
  {
    month: 'September',
    quarter: 'Q2',
    traffic: 2500,
    benchmarkVideos: 45,
    newsletters: 5,
    blogs: 16,
    campaigns: { email: 0, linkedin: 0, other: 0 },
    activities: ['Weekly Newsletter (5)']
  },
  {
    month: 'Oct',
    quarter: 'Q3',
    traffic: 2520,
    benchmarkVideos: 73,
    benchmarkVideosSecondary: 952,
    newsletters: 4,
    blogs: 0,
    campaigns: { email: 2545, linkedin: 444, other: 267 },
    activities: ['Weekly Newsletter (4)', 'Benchmark Revamp', 'Warehouse campaign revamp']
  },
  {
    month: 'Nov',
    quarter: 'Q3',
    traffic: 2100,
    benchmarkVideos: 28,
    benchmarkVideosSecondary: 924,
    newsletters: 4,
    blogs: 0,
    campaigns: { email: 800, linkedin: 180, other: 0 },
    activities: ['Weekly Newsletter (4)', 'Benchmark listicles automation', 'Benchmark blog frontend revamp', 'Hiring (3)']
  }
];