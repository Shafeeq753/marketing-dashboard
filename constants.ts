
import { MonthlyData } from './types';

export const MONTHLY_DATA: MonthlyData[] = [
  {
    month: 'July',
    quarter: 'Q2',
    traffic: 1673,
    benchmarkVideos: 310,
    totalVideosOnSite: 775, // Calculated: 834 - 59
    newsletters: 1,
    blogs: 16,
    campaigns: { email: 1100, linkedin: 0, other: 0 },
    activities: ['-']
  },
  {
    month: 'August',
    quarter: 'Q2',
    traffic: 1567,
    benchmarkVideos: 59,
    totalVideosOnSite: 834, // Calculated: 879 - 45
    newsletters: 3,
    blogs: 8,
    campaigns: { email: 356, linkedin: 475, other: 0 },
    activities: ['Newsletter Automation', 'Benchmark tool']
  },
  {
    month: 'September',
    quarter: 'Q2',
    traffic: 2500,
    benchmarkVideos: 45,
    totalVideosOnSite: 879, // Calculated: 952 - 73
    newsletters: 5,
    blogs: 16,
    campaigns: { email: 0, linkedin: 0, other: 0 },
    activities: ['-']
  },
  {
    month: 'Oct',
    quarter: 'Q3',
    traffic: 2520,
    benchmarkVideos: 73,
    totalVideosOnSite: 952, // User provided
    newsletters: 4,
    blogs: 0,
    campaigns: { email: 2545, linkedin: 444, other: 267 },
    activities: ['Benchmark Revamp', 'Warehouse campaign revamp']
  },
  {
    month: 'Nov',
    quarter: 'Q3',
    traffic: 2100,
    benchmarkVideos: 28,
    totalVideosOnSite: 924, // User provided
    newsletters: 4,
    blogs: 0,
    campaigns: { email: 800, linkedin: 180, other: 0 },
    activities: ['Benchmark listicles automation', 'Benchmark blog frontend revamp', 'Hiring (3)']
  },
  {
    month: 'Dec',
    quarter: 'Q3',
    traffic: 1800,
    benchmarkVideos: 74,
    totalVideosOnSite: 930, // User provided
    newsletters: 4,
    blogs: 0,
    campaigns: { email: 295, linkedin: 103, other: 0 },
    activities: ['Listicles automation', 'Website issues', 'Indexing issues']
  },
  {
    month: 'January',
    quarter: 'Q4',
    traffic: 1600,
    benchmarkVideos: 34,
    totalVideosOnSite: 938,
    newsletters: 5,
    blogs: 52, // Updated to 52 total (36 agency pillar + 16 listicles)
    campaigns: { email: 0, linkedin: 0, other: 0 },
    activities: ['Website edits', 'Indexing issues']
  },
  {
    month: 'February',
    quarter: 'Q4',
    traffic: 990,
    benchmarkVideos: 236,
    totalVideosOnSite: 1059,
    newsletters: 6,
    blogs: 14,
    caseStudies: 9,
    servicePages: 1,
    campaigns: { email: 824, linkedin: 412, other: 0 },
    activities: [
      'AI Chatbot',
      'SEO Machine',
      'MODEX newsletter',
      'Google ads for modex',
      'Benchmark QC',
      'Manual LinkedIn to 400 people'
    ]
  }
];
