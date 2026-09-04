
import { MonthlyData } from './types';

// Quarter-level backlink data (richer than the monthly directory counts).
// Shown only on the quarter view, with a breakdown + trend image in the modal.
export const QUARTERLY_BACKLINKS: Record<string, { directories: number; guestOutreach: number; collaborations: number; trendImage?: string }> = {
  Q1: { directories: 60, guestOutreach: 80, collaborations: 3, trendImage: '/backlinks-trend.png' },
};

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
    traffic: 2172,
    benchmarkVideos: 34,
    totalVideosOnSite: 938,
    newsletters: 5,
    blogs: 52, // Updated to 52 total (36 agency pillar + 16 listicles)
    trafficBreakdown: [
      { channel: 'Organic Search', sessions: 985, pageviews: 2774, users: 738 },
      { channel: 'Direct', sessions: 809, pageviews: 1896, users: 693 },
      { channel: 'Referral', sessions: 292, pageviews: 765, users: 212 },
      { channel: 'Organic Social', sessions: 39, pageviews: 114, users: 28 },
      { channel: 'Unassigned', sessions: 30, pageviews: 71, users: 27 },
      { channel: 'Organic Video', sessions: 17, pageviews: 44, users: 8 },
    ],
    campaigns: { email: 0, linkedin: 0, other: 0 },
    activities: ['Website edits', 'Indexing issues']
  },
  {
    month: 'February',
    quarter: 'Q4',
    traffic: 1406,
    benchmarkVideos: 236,
    totalVideosOnSite: 1059,
    newsletters: 6,
    blogs: 14,
    caseStudies: 9,
    servicePages: 1,
    trafficBreakdown: [
      { channel: 'Direct', sessions: 626, pageviews: 1143, users: 536 },
      { channel: 'Organic Search', sessions: 485, pageviews: 1317, users: 324 },
      { channel: 'Referral', sessions: 231, pageviews: 580, users: 162 },
      { channel: 'Unassigned', sessions: 39, pageviews: 69, users: 38 },
      { channel: 'Organic Social', sessions: 15, pageviews: 46, users: 11 },
      { channel: 'Organic Video', sessions: 5, pageviews: 24, users: 4 },
      { channel: 'Paid Search', sessions: 5, pageviews: 12, users: 5 },
    ],
    campaigns: { email: 824, linkedin: 412, other: 0 },
    activities: [
      'AI Chatbot',
      'SEO Machine',
      'MODEX newsletter',
      'Google ads for modex',
      'Benchmark QC',
      'Manual LinkedIn to 400 people'
    ]
  },
  {
    month: 'March',
    quarter: 'Q4',
    traffic: 3042,
    benchmarkVideos: 123,
    totalVideosOnSite: 1163,
    newsletters: 0,
    blogs: 0,
    pricingPages: 1,
    vsPages: 10,
    decliningPages: 6,
    commercialKeywordPages: 10,
    trafficBreakdown: [
      { channel: 'Direct', sessions: 2064, pageviews: 5891, users: 1874 },
      { channel: 'Organic Search', sessions: 485, pageviews: 1297, users: 236 },
      { channel: 'Referral', sessions: 279, pageviews: 579, users: 201 },
      { channel: 'Unassigned', sessions: 199, pageviews: 397, users: 190 },
      { channel: 'Organic Social', sessions: 12, pageviews: 30, users: 10 },
      { channel: 'Organic Video', sessions: 2, pageviews: 14, users: 1 },
    ],
    campaigns: { email: 0, linkedin: 0, other: 0 },
    activities: [
      'Security bug and updates',
      'VIH and highs - honors - tools - update',
      'Backlink and event strategy',
      'FAQ & glossary edits',
      'Schema and orphan pages audit'
    ]
  },
  {
    month: 'April',
    quarter: 'Q1',
    traffic: 3248,
    benchmarkVideos: 193,
    totalVideosOnSite: 1335,
    newsletters: 4,
    blogs: 11, // 1 pillar + 10 cluster
    listicleBlogs: 8,
    faqPages: 5,
    servicePages: 1,
    exhibitorPages: 1,
    trafficBreakdown: [
      { channel: 'Direct', sessions: 2367 },
      { channel: 'Organic Search', sessions: 390 },
      { channel: 'Unassigned', sessions: 248 },
      { channel: 'Referral', sessions: 221 },
      { channel: 'Organic Social', sessions: 12 },
      { channel: 'Paid Search', sessions: 9 },
      { channel: 'Organic Video', sessions: 1 },
    ],
    campaigns: { email: 574, linkedin: 511, other: 335 },
    activities: [
      '8 automated newsletters added',
      '50 guest posts (pilot project)',
      '35 backlink directories added'
    ]
  },
  {
    month: 'May',
    quarter: 'Q1',
    traffic: 3602,
    benchmarkVideos: 13,
    totalVideosOnSite: 1340, // User provided (some videos deleted)
    newsletters: 4,
    blogs: 0,
    trafficBreakdown: [
      { channel: 'Direct', sessions: 2045 },
      { channel: 'Referral', sessions: 750 },
      { channel: 'Organic Search', sessions: 420 },
      { channel: 'Unassigned', sessions: 406 },
      { channel: 'Organic Social', sessions: 14 },
      { channel: 'Organic Video', sessions: 1 },
    ],
    // Automate campaign — email manual (Salesforge) 136 + automated 950 = 1086; LinkedIn automated 511
    campaigns: { email: 1086, linkedin: 511, other: 0 },
    activities: [
      'Hiring complete — 4 members onboarded',
      'SaaS campaign lead expansion completed',
      'Automate campaign expansion (+400 leads)',
      'LinkedIn manual outreach (SaaS campaign)',
      'HeyGen video expansion',
      'New tech & content strategy audit',
      'Tech fixes: trailing slash, sitemap, schema'
    ]
  },
  {
    // All June figures are real. Activities are completed tasks from the task board.
    month: 'June',
    quarter: 'Q1',
    traffic: 4426, // GA4 Total Sessions (channel rows sum to 4381)
    benchmarkVideos: 0, // No benchmark videos added in June
    totalVideosOnSite: 1340, // Unchanged from May (no videos added)
    newsletters: 5,
    blogs: 0, // No new pages published in June
    revampedBlogs: 5,
    revampedVihPages: 41,
    internsHired: 3, // Hiring & training — 3 marketing interns onboarded
    backlinkDirectories: 25,
    videosScraped: 2000, // VIH video scraping
    techFixes: [
      'Checklist issues fixed',
      'Feed url fixed',
      'APO initialization',
      'UCSS',
      'Internal CSS',
      'Parsing errors',
      'Duplicate urls remove',
      'Virtual tour css issue fix',
      'Light gray issue fix',
      'Lazy load issues fix',
      'Conversion tracking'
    ],
    trafficBreakdown: [
      { channel: 'Direct', sessions: 2896 },
      { channel: 'AI Assistant', sessions: 582 },
      { channel: 'Organic Search', sessions: 577 },
      { channel: 'Referral', sessions: 155 },
      { channel: 'Unassigned', sessions: 149 },
      { channel: 'Organic Social', sessions: 18 },
      { channel: 'Organic Video', sessions: 4 },
    ],
    aiCrawl: {
      total: 4000,
      allowed: 3000,
      unsuccessful: 135,
      crawlers: [
        { name: 'ByteDance', bot: 'Bytespider', requests: 1060 },
        { name: 'Microsoft', bot: 'BingBot', requests: 435 },
        { name: 'Apple', bot: 'Applebot', requests: 404 },
        { name: 'Huawei', bot: 'PetalBot', requests: 402 },
        { name: 'Google', bot: 'Googlebot', requests: 353 },
        { name: 'OpenAI', bot: 'ChatGPT-User', requests: 196 },
        { name: 'Amazon', bot: 'Amazonbot', requests: 180 },
        { name: 'Anthropic', bot: 'ClaudeBot', requests: 158 },
        { name: 'Meta', bot: 'Meta-ExternalAgent', requests: 108 },
        { name: 'Baidu', bot: 'Baidu', requests: 89 },
      ],
    },
    googleCrawl: {
      totalRequests: 30200,
      downloadBytes: 990000000, // 990 MB
      avgResponseMs: 528,
    },
    // Campaigns intentionally omitted — handled by another team from June onward.
    activityGroups: [
      {
        // Renders as one box in the feed; clicking opens the Tech Fixes modal with the full error list.
        title: 'Tech & On-site Issues',
        action: 'tech-fixes',
        actionLabel: 'View all fixes',
        actionIcon: 'wrench'
      },
      {
        title: 'Content & VIH',
        items: [
          'VIH Non-indexed content revamp',
          'Video Scraping — ~2,000 VIH videos',
          'HeyGen videos'
        ]
      },
      {
        title: 'Ads',
        items: [
          'Google Ads (completed)'
        ]
      },
      {
        title: 'Hiring & Training',
        items: [
          'Hiring Process — 3 interns onboarded',
          'Interns sessions'
        ]
      },
      {
        title: 'Tools',
        items: [
          'Highs & Honors tool update'
        ]
      }
    ]
  },
  {
    // July 2026 — FY2026-27 Q2. NOTE: a second 'July' (FY2025-26 Q2) exists at the top of this
    // array; App.tsx scopes every month/quarter lookup by fiscal year so the two never merge.
    month: 'July',
    quarter: 'Q2',
    // GA4 "Active users" 6.2K. Caveat: the source snapshot covers the rolling 28 days
    // Jul 14 – Aug 10 2026, and earlier months record Sessions rather than Active Users.
    traffic: 6200,
    benchmarkVideos: 0,
    totalVideosOnSite: 1340, // Unchanged from June (no benchmark videos added)
    newsletters: 5,
    blogs: 0, // No new pages launched in July
    backlinkDirectories: 0, // No backlinks acquired
    techFixes: [], // No on-site fixes
    // Sessions by default channel group, same 28-day window as `traffic` above.
    // Direct and Organic Search are rounded in the GA4 snapshot; rows sum to ~6,921.
    trafficBreakdown: [
      { channel: 'Direct', sessions: 5000 },
      { channel: 'Organic Search', sessions: 1200 },
      { channel: 'AI Assistant', sessions: 463 },
      { channel: 'Unassigned', sessions: 124 },
      { channel: 'Referral', sessions: 78 },
      { channel: 'Paid Search', sessions: 31 },
      { channel: 'Organic Social', sessions: 25 },
    ],
    // aiCrawl intentionally omitted — Cloudflare AI crawler data unavailable for July.
    googleCrawl: {
      totalRequests: 32800,
    },
    // Campaigns intentionally omitted — handled by another team from June onward.
    activityGroups: [
      {
        title: 'YouTube Automation',
        items: [
          'Automated video generation done — 1 video launched'
        ]
      },
      {
        // Renders as one box; clicking opens the checklist modal with the three deliverables.
        title: 'Quote Agent V1 — Done',
        action: 'quote-agent',
        actionLabel: 'View what shipped',
        items: [
          'Invoice template',
          'Blueprint document template',
          'Chat flow'
        ]
      },
      {
        title: 'CRO Works',
        action: 'cro-works',
        actionLabel: 'View completed sections',
        items: [
          'Home page',
          'Header',
          'Footer'
        ]
      },
      {
        title: 'Reports & Skills',
        items: [
          'Balyo report',
          'VIH Video Skill V1'
        ]
      },
      {
        title: 'College Visits',
        items: [
          'Amrita College & CIT College'
        ]
      }
    ]
  },
  {
    // August 2026 — FY2026-27 Q2.
    month: 'August',
    quarter: 'Q2',
    traffic: 5200,
    benchmarkVideos: 0, // No benchmark videos added in August
    totalVideosOnSite: 1340, // Unchanged from July (no benchmark videos added)
    newsletters: 5,
    blogs: 0, // No new blog pages published in August
    caseStudies: 6, // 6 case studies published/revamped
    backlinkDirectories: 25,
    techFixes: [
      'SSL issue fix (had caused site outage)',
      'Spam / cyber attack on site resolved'
    ],
    // trafficBreakdown omitted — channel-level breakdown not provided for August.
    // aiCrawl carried over from June — reported unchanged ("still 4k"); no updated
    // crawler breakdown was provided for August.
    aiCrawl: {
      total: 4000,
      allowed: 3000,
      unsuccessful: 135,
      crawlers: [
        { name: 'ByteDance', bot: 'Bytespider', requests: 1060 },
        { name: 'Microsoft', bot: 'BingBot', requests: 435 },
        { name: 'Apple', bot: 'Applebot', requests: 404 },
        { name: 'Huawei', bot: 'PetalBot', requests: 402 },
        { name: 'Google', bot: 'Googlebot', requests: 353 },
        { name: 'OpenAI', bot: 'ChatGPT-User', requests: 196 },
        { name: 'Amazon', bot: 'Amazonbot', requests: 180 },
        { name: 'Anthropic', bot: 'ClaudeBot', requests: 158 },
        { name: 'Meta', bot: 'Meta-ExternalAgent', requests: 108 },
        { name: 'Baidu', bot: 'Baidu', requests: 89 },
      ],
    },
    googleCrawl: {
      totalRequests: 36200,
    },
    // Campaigns intentionally omitted — handled by another team from June onward.
    activityGroups: [
      {
        // Renders as one box in the feed; clicking opens the Tech Fixes modal with the full list.
        title: 'Tech & On-site Issues',
        action: 'tech-fixes',
        actionLabel: 'View all fixes',
        actionIcon: 'wrench'
      },
      {
        // Distinct action key from July's 'cro-works' group so Q2 quarter view resolves
        // each month's own edit list instead of always matching July's first.
        title: 'Website CRO Works',
        action: 'website-cro-works',
        actionLabel: 'View completed sections',
        items: [
          'Revamped home page and launched it',
          'Header & footer CRO',
          'Published 6 case studies',
          'EN-US pages CRO'
        ]
      },
      {
        title: 'Tools',
        items: [
          'VIH Tool Edit',
          'AEO Tool — V1 completed'
        ]
      }
    ]
  }
];
