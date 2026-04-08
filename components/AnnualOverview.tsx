
import React, { useState } from 'react';
import {
  Wrench,
  FileEdit,
  RefreshCw,
  Mail,
  Megaphone,
  Handshake,
  Search,
  Rocket,
  Award,
  ChevronRight,
  Users,
  Globe,
  Bot,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface AnnualMilestone {
  id: number;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  description: string;
  highlights: string[];
  tags: string[];
}

const ANNUAL_DATA: AnnualMilestone[] = [
  {
    id: 1,
    icon: <Wrench className="w-7 h-7" />,
    accentColor: 'from-orange-500 to-amber-600',
    glowColor: 'shadow-orange-500/30',
    title: 'Benchmark Tool',
    subtitle: 'Flagship Product Launch',
    metric: '1,200+',
    metricLabel: 'Pages Created',
    description: 'Built a comprehensive benchmark tool from the ground up — covering website development, content automation, and continuous updates that now powers over 1,200 live pages.',
    highlights: [
      'Full website development & deployment',
      'Content automation pipeline',
      'Continuous updates & maintenance',
      'Scalable page generation system',
    ],
    tags: ['Product', 'Automation', 'Scale'],
  },
  {
    id: 2,
    icon: <FileEdit className="w-7 h-7" />,
    accentColor: 'from-violet-500 to-purple-600',
    glowColor: 'shadow-violet-500/30',
    title: 'Strategic Page Updates',
    subtitle: 'Content Optimization at Scale',
    metric: '150+',
    metricLabel: 'Pages Updated',
    description: 'Executed a strategic overhaul of 150+ existing pages across key pillar content — service pages, case studies, glossary entries, FAQ sections, and more to boost authority and rankings.',
    highlights: [
      'Service page revamp',
      'Case studies optimization',
      'Glossary & FAQ enhancement',
      'Pillar content strategy alignment',
    ],
    tags: ['SEO', 'Content', 'Strategy'],
  },
  {
    id: 3,
    icon: <RefreshCw className="w-7 h-7" />,
    accentColor: 'from-emerald-500 to-teal-600',
    glowColor: 'shadow-emerald-500/30',
    title: 'Listicle Automation',
    subtitle: 'Self-Updating Content Engine',
    metric: 'AUTO',
    metricLabel: 'Trigger & Update',
    description: 'Created an intelligent listicle system that automatically detects new data, triggers content generation, and self-updates — eliminating manual content maintenance entirely.',
    highlights: [
      'Auto-trigger on new data',
      'Self-updating content pipeline',
      'Zero manual maintenance',
      'Scalable listicle generation',
    ],
    tags: ['Automation', 'AI', 'Innovation'],
  },
  {
    id: 4,
    icon: <Mail className="w-7 h-7" />,
    accentColor: 'from-sky-500 to-blue-600',
    glowColor: 'shadow-sky-500/30',
    title: 'Newsletter Automation',
    subtitle: 'Outreach & VIH Campaigns',
    metric: 'WEEKLY',
    metricLabel: 'Sending Cadence',
    description: 'Built a full newsletter automation pipeline — from outreach campaigns and VIH edits to weekly scheduled sends. Streamlined the entire communication workflow.',
    highlights: [
      'Automated outreach pipeline',
      'VIH newsletter edits & management',
      'Weekly sending schedule',
      'Template & content automation',
    ],
    tags: ['Email', 'Outreach', 'Automation'],
  },
  {
    id: 5,
    icon: <Megaphone className="w-7 h-7" />,
    accentColor: 'from-rose-500 to-pink-600',
    glowColor: 'shadow-rose-500/30',
    title: 'Campaign Outreach',
    subtitle: 'Multi-Channel Lead Generation',
    metric: '12,000+',
    metricLabel: 'People Reached',
    description: 'Targeted and executed campaigns reaching over 12,000 prospects through LinkedIn and email channels — driving brand awareness and lead generation at scale.',
    highlights: [
      'LinkedIn targeted campaigns',
      'Email outreach sequences',
      'Multi-channel coordination',
      '12K+ prospect touchpoints',
    ],
    tags: ['Campaigns', 'LinkedIn', 'Email'],
  },
  {
    id: 6,
    icon: <Handshake className="w-7 h-7" />,
    accentColor: 'from-amber-500 to-yellow-600',
    glowColor: 'shadow-amber-500/30',
    title: 'CIT Partnership & Team',
    subtitle: 'Strategic Growth & Hiring',
    metric: '3',
    metricLabel: 'Interns Hired',
    description: 'Signed a strategic partnership deal with CIT, hired 3 interns, and built a training program to onboard and upskill the new team members for sustained growth.',
    highlights: [
      'CIT partnership deal signed',
      '3 interns recruited',
      'Training & onboarding program',
      'Team capacity expansion',
    ],
    tags: ['Partnership', 'Hiring', 'Growth'],
  },
  {
    id: 7,
    icon: <Search className="w-7 h-7" />,
    accentColor: 'from-cyan-500 to-teal-600',
    glowColor: 'shadow-cyan-500/30',
    title: 'SEO Tools & SOPs',
    subtitle: 'Internal Tooling Ecosystem',
    metric: '5+',
    metricLabel: 'Tools Built',
    description: 'Developed a suite of internal SEO tools — SEO Machine, SEO Audit Tool, Backlink Audit Tool — plus comprehensive SOPs for leads automation, pages automation, and Claude-powered workflows.',
    highlights: [
      'SEO Machine development',
      'SEO Audit Tool',
      'Backlink Audit Tool',
      'SOPs: leads, pages & Claude automation',
    ],
    tags: ['Tools', 'SEO', 'SOPs'],
  },
  {
    id: 8,
    icon: <Rocket className="w-7 h-7" />,
    accentColor: 'from-fuchsia-500 to-purple-600',
    glowColor: 'shadow-fuchsia-500/30',
    title: 'Innovation Projects',
    subtitle: 'R&D & Experimental Tools',
    metric: '3+',
    metricLabel: 'Projects Shipped',
    description: 'Launched experimental innovation projects including the Highs & Honors tool, VIH tool, and a VIH video scraping automation — pushing the boundaries of what\'s possible.',
    highlights: [
      'Highs & Honors tool',
      'VIH tool development',
      'VIH video scraping automation',
      'Experimental R&D pipeline',
    ],
    tags: ['Innovation', 'R&D', 'Tools'],
  },
];

const YEARLY_STATS = [
  { label: 'Total Pages Created', value: '1,200+', icon: <Globe className="w-5 h-5" /> },
  { label: 'Pages Updated', value: '150+', icon: <FileEdit className="w-5 h-5" /> },
  { label: 'People Reached', value: '12,000+', icon: <Users className="w-5 h-5" /> },
  { label: 'Tools Built', value: '5+', icon: <Wrench className="w-5 h-5" /> },
  { label: 'Team Expanded', value: '3 Hires', icon: <Handshake className="w-5 h-5" /> },
  { label: 'Automations', value: '4+', icon: <Bot className="w-5 h-5" /> },
];

interface AnnualOverviewProps {
  isDark?: boolean;
}

export const AnnualOverview: React.FC<AnnualOverviewProps> = ({ isDark = true }) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <div className="space-y-16">
      {/* Hero Header */}
      <div className="relative overflow-hidden glass-card rounded-[3rem] p-12 md:p-16 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-violet-500/10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <Award className="w-96 h-96" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="px-5 py-2 text-[9px] font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-full uppercase tracking-widest shadow-2xl shadow-orange-500/40 animate-pulse">
              Annual Report
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              2025 — 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-4">
            Year in <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">Review</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
            A comprehensive overview of everything we built, shipped, and achieved from 2025 to 2026 — from product launches to team growth.
          </p>

          {/* Summary Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {YEARLY_STATS.map((stat, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-orange-500 opacity-60 group-hover:opacity-100 transition-opacity">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-2xl font-black text-white tracking-tighter mb-1">{stat.value}</div>
                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Timeline */}
      <div className="space-y-8">
        <div className="flex items-center gap-4 px-2">
          <div className="p-3 bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl shadow-xl shadow-orange-900/40">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black tracking-tighter text-white">Key Milestones</h2>
            <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em] mt-1">8 Major Achievements</p>
          </div>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ANNUAL_DATA.map((milestone, idx) => {
            const isExpanded = expandedCard === milestone.id;

            return (
              <div
                key={milestone.id}
                onClick={() => setExpandedCard(isExpanded ? null : milestone.id)}
                className={`relative overflow-hidden glass-card rounded-[2.5rem] transition-all duration-500 cursor-pointer group
                  ${isExpanded ? 'lg:col-span-2 shadow-2xl' : 'shadow-xl hover:-translate-y-1 hover:shadow-2xl'}
                `}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Accent gradient top bar */}
                <div className={`h-1 bg-gradient-to-r ${milestone.accentColor}`}></div>

                <div className={`p-10 ${isExpanded ? 'md:p-14' : ''}`}>
                  <div className={`flex ${isExpanded ? 'flex-col md:flex-row gap-10' : 'flex-col gap-6'}`}>
                    {/* Icon + Title Section */}
                    <div className={`${isExpanded ? 'md:w-1/2' : ''} space-y-5`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-5">
                          <div className={`p-4 bg-gradient-to-br ${milestone.accentColor} rounded-2xl shadow-xl ${milestone.glowColor} group-hover:scale-110 transition-transform duration-300`}>
                            <div className="text-white">{milestone.icon}</div>
                          </div>
                          <div>
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
                              {milestone.subtitle}
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight">
                              {milestone.title}
                            </h3>
                          </div>
                        </div>
                        <div className={`p-2 rounded-xl bg-white/5 text-slate-500 group-hover:text-orange-500 transition-all ${isExpanded ? 'rotate-90' : ''}`}>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Metric Badge */}
                      <div className="flex items-center gap-4">
                        <div className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${milestone.accentColor} bg-opacity-10 border border-white/10`}
                          style={{ background: 'rgba(255,255,255,0.05)' }}>
                          <span className="text-3xl font-black text-white tracking-tighter">{milestone.metric}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">{milestone.metricLabel}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {milestone.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full bg-white/5 text-slate-400 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="md:w-1/2 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                        <p className="text-slate-300 text-sm leading-relaxed font-medium">
                          {milestone.description}
                        </p>

                        <div className="space-y-3">
                          <div className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-4">
                            Key Highlights
                          </div>
                          {milestone.highlights.map((highlight, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                              style={{ animationDelay: `${hIdx * 80}ms` }}
                            >
                              <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0" />
                              <span className="text-sm font-bold text-slate-300">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Collapsed Description Preview */}
                  {!isExpanded && (
                    <p className="text-slate-500 text-xs font-medium leading-relaxed mt-4 line-clamp-2">
                      {milestone.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
