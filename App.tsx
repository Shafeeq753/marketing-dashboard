
import React, { useState, useMemo, useEffect } from 'react';
import { MONTHLY_DATA } from './constants';
import { StatCard } from './components/StatCard';
import { 
  TrafficChart, 
  VideosChart, 
  NewslettersChart, 
  BlogsChart, 
  CampaignPerformanceChart 
} from './components/Charts';
import { ActivityFeed } from './components/ActivityFeed';
import { CrawlStatsModal } from './components/CrawlStatsModal';
import { WebsiteEditsModal } from './components/WebsiteEditsModal';
import { ChatbotModal } from './components/ChatbotModal';
import { TrafficBreakdownModal } from './components/TrafficBreakdownModal';
import { SecurityModal } from './components/SecurityModal';
import { AnnualOverview } from './components/AnnualOverview';
import {
  Users,
  Video,
  Layers,
  BarChart3,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  Plus,
  X,
  FileText,
  Tag,
  MonitorPlay,
  Zap,
  LayoutGrid,
  Trophy
} from 'lucide-react';
import { MonthlyData } from './types';

const aggregateData = (data: MonthlyData[]): MonthlyData => {
  const aggregated = data.reduce((acc, curr) => ({
    month: 'Aggregated',
    quarter: curr.quarter,
    traffic: acc.traffic + curr.traffic,
    benchmarkVideos: acc.benchmarkVideos + curr.benchmarkVideos,
    newsletters: acc.newsletters + curr.newsletters,
    blogs: acc.blogs + curr.blogs,
    caseStudies: (acc.caseStudies || 0) + (curr.caseStudies || 0),
    servicePages: (acc.servicePages || 0) + (curr.servicePages || 0),
    locationPages: (acc.locationPages || 0) + (curr.locationPages || 0),
    faqPages: (acc.faqPages || 0) + (curr.faqPages || 0),
    glossary: (acc.glossary || 0) + (curr.glossary || 0),
    pricingPages: (acc.pricingPages || 0) + (curr.pricingPages || 0),
    vsPages: (acc.vsPages || 0) + (curr.vsPages || 0),
    decliningPages: (acc.decliningPages || 0) + (curr.decliningPages || 0),
    commercialKeywordPages: (acc.commercialKeywordPages || 0) + (curr.commercialKeywordPages || 0),
    exhibitorPages: (acc.exhibitorPages || 0) + (curr.exhibitorPages || 0),
    campaigns: {
      email: acc.campaigns.email + curr.campaigns.email,
      linkedin: acc.campaigns.linkedin + curr.campaigns.linkedin,
      other: acc.campaigns.other + curr.campaigns.other
    },
    activities: [...acc.activities, ...curr.activities],
    totalVideosOnSite: curr.totalVideosOnSite 
  }), { 
    month: '',
    quarter: '',
    traffic: 0, 
    benchmarkVideos: 0, 
    newsletters: 0, 
    blogs: 0, 
    caseStudies: 0,
    servicePages: 0,
    locationPages: 0,
    faqPages: 0,
    glossary: 0,
    pricingPages: 0,
    vsPages: 0,
    decliningPages: 0,
    commercialKeywordPages: 0,
    exhibitorPages: 0,
    campaigns: { email: 0, linkedin: 0, other: 0 },
    activities: [],
    totalVideosOnSite: 0
  });

  if (data.length > 0) {
    aggregated.totalVideosOnSite = data[data.length - 1].totalVideosOnSite;
  }

  return aggregated;
};

type PeriodType = 'quarter' | 'month' | 'annual';

const App: React.FC = () => {
  const [selectedPeriodType, setSelectedPeriodType] = useState<PeriodType>('month');
  const [selectedValue, setSelectedValue] = useState<string>('April');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCrawlModalOpen, setIsCrawlModalOpen] = useState(false);
  const [isWebsiteEditsModalOpen, setIsWebsiteEditsModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [isTrafficModalOpen, setIsTrafficModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const quarters = useMemo(() => Array.from(new Set(MONTHLY_DATA.map(d => d.quarter))).reverse(), []);
  const months = useMemo(() => MONTHLY_DATA.map(d => d.month).reverse(), []);

  const currentDataList = useMemo(() => {
    if (selectedPeriodType === 'quarter') {
      return MONTHLY_DATA.filter(d => d.quarter === selectedValue);
    } else {
      return MONTHLY_DATA.filter(d => d.month === selectedValue);
    }
  }, [selectedPeriodType, selectedValue]);

  const currentAggregates = useMemo(() => {
    if (currentDataList.length === 1) return currentDataList[0];
    return aggregateData(currentDataList);
  }, [currentDataList]);

  const chartDataList = useMemo(() => {
    if (selectedPeriodType === 'quarter') {
      return currentDataList;
    } else {
      const currentIndex = MONTHLY_DATA.findIndex(d => d.month === selectedValue);
      if (currentIndex > 0) {
        return [MONTHLY_DATA[currentIndex - 1], MONTHLY_DATA[currentIndex]];
      }
      return [MONTHLY_DATA[currentIndex]];
    }
  }, [currentDataList, selectedPeriodType, selectedValue]);

  const prevAggregates = useMemo(() => {
    const chronologicalQuarters = Array.from(new Set(MONTHLY_DATA.map(d => d.quarter)));
    
    if (selectedPeriodType === 'quarter') {
      const idx = chronologicalQuarters.indexOf(selectedValue);
      if (idx > 0) {
        const prevQuarter = chronologicalQuarters[idx - 1];
        const prevData = MONTHLY_DATA.filter(d => d.quarter === prevQuarter);
        return aggregateData(prevData);
      }
    } else {
      const idx = MONTHLY_DATA.findIndex(d => d.month === selectedValue);
      if (idx > 0) {
        return MONTHLY_DATA[idx - 1];
      }
    }
    return null;
  }, [selectedPeriodType, selectedValue]);

  const trafficDisplayValue = useMemo(() => {
    if (selectedPeriodType === 'quarter' && currentDataList.length > 0) {
      return Math.round(currentAggregates.traffic / currentDataList.length);
    }
    return currentAggregates.traffic;
  }, [selectedPeriodType, currentAggregates.traffic, currentDataList.length]);

  const trafficPrevValue = useMemo(() => {
    if (!prevAggregates) return null;
    if (selectedPeriodType === 'quarter') {
      const chronologicalQuarters = Array.from(new Set(MONTHLY_DATA.map(d => d.quarter)));
      const idx = chronologicalQuarters.indexOf(selectedValue);
      const prevQuarter = chronologicalQuarters[idx - 1];
      const prevMonthsCount = MONTHLY_DATA.filter(d => d.quarter === prevQuarter).length;
      return Math.round(prevAggregates.traffic / (prevMonthsCount || 1));
    }
    return prevAggregates.traffic;
  }, [selectedPeriodType, prevAggregates, selectedValue]);

  const calculateTrend = (current: number, previous: number | undefined | null) => {
    if (previous === undefined || previous === null || previous === 0) return { trend: 'neutral' as const, value: '-' };
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    const trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral';
    return { trend: trend as 'up' | 'down' | 'neutral', value: `${Math.abs(Number(percent))}%` };
  };

  const getTotalPages = (d: MonthlyData) =>
    d.blogs + (d.caseStudies || 0) + (d.servicePages || 0) + (d.locationPages || 0) +
    (d.faqPages || 0) + (d.glossary || 0) + (d.pricingPages || 0) + (d.vsPages || 0) +
    (d.decliningPages || 0) + (d.commercialKeywordPages || 0) + (d.exhibitorPages || 0);

  const currentTotalPages = getTotalPages(currentAggregates);
  const prevTotalPages = prevAggregates ? getTotalPages(prevAggregates) : null;

  const trafficTrend = calculateTrend(trafficDisplayValue, trafficPrevValue);
  const videoTrend = calculateTrend(currentAggregates.benchmarkVideos, prevAggregates?.benchmarkVideos);
  const blogTrend = calculateTrend(currentTotalPages, prevTotalPages);

  const handleSidebarClick = (type: PeriodType, value: string) => {
    setSelectedPeriodType(type);
    setSelectedValue(value);
  };

  const handleActivityClick = (activity: string) => {
    const act = activity.toLowerCase();
    if (act.includes('indexing issues') || act.includes('website issues')) {
      setIsCrawlModalOpen(true);
    } else if (act.includes('website edits')) {
      setIsWebsiteEditsModalOpen(true);
    } else if (act.includes('ai chatbot')) {
      setIsChatbotModalOpen(true);
    } else if (act.includes('security bug')) {
      setIsSecurityModalOpen(true);
    }
  };

  return (
    <div className="flex min-h-screen font-sans text-slate-200 selection:bg-orange-500/30">
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-24' : 'w-80'} sidebar-glass m-6 rounded-[2.5rem] flex-shrink-0 fixed h-[calc(100vh-3rem)] transition-all duration-700 z-30 hidden lg:flex flex-col shadow-2xl`}>
        <div className={`p-10 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start gap-4'}`}>
          <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl shadow-xl shadow-orange-900/40 flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tighter whitespace-nowrap text-white">MPV ANALYTICS</span>
              <span className="text-[10px] font-black text-orange-500 tracking-[0.2em] uppercase opacity-80">Enterprise v2.0</span>
            </div>
          )}
        </div>
        <nav className="flex-1 px-6 space-y-12 overflow-y-auto custom-scrollbar pt-6">
          {/* Annual Review */}
          <div>
            <h3 className={`text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-6 px-4 ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? 'YR' : 'Annual Report'}
            </h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => handleSidebarClick('annual', '2025-2026')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between px-5'} py-4 rounded-2xl text-sm font-black transition-all ${selectedPeriodType === 'annual' ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 text-orange-500 border border-orange-500/20 shadow-lg shadow-orange-500/10' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                  <span className="flex items-center gap-4"><Trophy className="w-5 h-5 opacity-80" />{!isSidebarCollapsed && '2025 — 2026'}</span>
                  {!isSidebarCollapsed && selectedPeriodType === 'annual' && <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,1)] animate-pulse"></div>}
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-6 px-4 ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? 'PER' : 'Strategy Periods'}
            </h3>
            <ul className="space-y-3">
              {quarters.map(q => (
                <li key={q}>
                  <button onClick={() => handleSidebarClick('quarter', q)} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between px-5'} py-4 rounded-2xl text-sm font-black transition-all ${selectedPeriodType === 'quarter' && selectedValue === q ? 'bg-white/10 text-orange-500 border border-white/5' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                    <span className="flex items-center gap-4"><CalendarDays className="w-5 h-5 opacity-60" />{!isSidebarCollapsed && q}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-6 px-4 ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? 'MON' : 'Monthly Performance'}
            </h3>
            <div className={`space-y-1 ${!isSidebarCollapsed ? `pl-4` : ''}`}>
              {months.map(m => (
                <button key={m} onClick={() => handleSidebarClick('month', m)} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-4 rounded-2xl text-[13px] font-bold transition-all text-left ${selectedPeriodType === 'month' && selectedValue === m ? 'text-orange-500 bg-orange-500/10' : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'}`}>
                  {isSidebarCollapsed ? m.substring(0, 3) : m}
                  {!isSidebarCollapsed && selectedPeriodType === 'month' && selectedValue === m && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,1)]"></div>}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <div className="p-8 flex justify-center border-t border-white/5">
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="p-4 rounded-2xl glass-card text-slate-500 hover:text-white transition-all hover:scale-110 active:scale-90 shadow-xl shadow-black/20">
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 ${isSidebarCollapsed ? 'lg:ml-32' : 'lg:ml-[22rem]'} p-6 md:p-12 transition-all duration-700`}>
        <div className="max-w-7xl mx-auto space-y-12">
          {selectedPeriodType === 'annual' ? (
            <>
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 text-[9px] font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-full uppercase tracking-widest shadow-2xl shadow-orange-500/40 animate-pulse">Annual Report</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">2025 — 2026</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-7xl font-black tracking-tighter transition-all text-white">
                      <span className="opacity-20">YR</span> Annual.
                    </h1>
                  </div>
                  <p className="text-slate-500 text-sm font-bold tracking-tight">
                    Complete year-over-year performance and milestone review
                  </p>
                </div>
              </header>
              <AnnualOverview isDark={true} />
            </>
          ) : (
            <>
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 text-[9px] font-black text-white bg-accent rounded-full uppercase tracking-widest shadow-2xl shadow-accent/40 animate-pulse">Insight Live</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">System Ready</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h1 className="text-7xl font-black tracking-tighter transition-all text-white">
                      <span className="opacity-20">{selectedValue.substring(0, 3)}</span> Overview.
                    </h1>
                  </div>
                  <p className="text-slate-500 text-sm font-bold tracking-tight">
                    Deep diving into {selectedPeriodType === 'quarter' ? `Quarter ${selectedValue}` : `Month of ${selectedValue}`} strategy data
                  </p>
                </div>
                <div className="flex items-center">
                  <button className="group flex items-center gap-4 bg-white text-slate-950 px-10 py-5 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all hover:translate-y-[-4px] hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.3)] active:scale-95">
                    <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" /> Upload Data
                  </button>
                </div>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                <StatCard title="Total Traffic" value={trafficDisplayValue.toLocaleString()} subValue={trafficPrevValue ? `vs prev period: ${trafficPrevValue.toLocaleString()}` : undefined} icon={<Users className="w-6 h-6" />} colorClass="text-slate-400" trend={trafficTrend.trend} trendValue={trafficTrend.value} isDark={true} isClickable={true} onClick={() => setIsTrafficModalOpen(true)} />
                <StatCard title="Benchmark Videos" value={currentAggregates.benchmarkVideos} subValue={`Total on site: ${currentAggregates.totalVideosOnSite}`} icon={<Video className="w-6 h-6" />} colorClass="text-amber-500" trend={videoTrend.trend} trendValue={videoTrend.value} isDark={true} />
                <StatCard title="New Published pages" value={currentTotalPages} subValue={prevTotalPages !== null ? `vs prev: ${prevTotalPages}` : "New pages"} icon={<Layers className="w-6 h-6" />} colorClass="text-yellow-500" trend={blogTrend.trend} trendValue={blogTrend.value} isDark={true} isClickable={true} onClick={() => setIsModalOpen(true)} />
                <StatCard title="Campaign Reach" value={<div className="flex items-center gap-8 mt-1"><div className="flex flex-col"><span className="text-[9px] uppercase font-black tracking-[0.1em] mb-1.5 text-slate-500">Email</span><span className="text-2xl font-black text-white">{currentAggregates.campaigns.email.toLocaleString()}</span></div><div className="flex flex-col"><span className="text-[9px] uppercase font-black tracking-[0.1em] mb-1.5 text-slate-500">LinkedIn</span><span className="text-2xl font-black text-white">{currentAggregates.campaigns.linkedin.toLocaleString()}</span></div></div>} icon={<BarChart3 className="w-6 h-6" />} colorClass="text-orange-500" isDark={true} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                <div className="lg:col-span-2 space-y-10">
                  <div className="glass-card rounded-[3rem] p-12 shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.05] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                      <Zap className="w-64 h-64" />
                    </div>
                    <TrafficChart data={chartDataList} isDark={true} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="glass-card rounded-[3rem] p-10 shadow-xl"><VideosChart data={chartDataList} isDark={true} /></div>
                    <div className="glass-card rounded-[3rem] p-10 shadow-xl"><NewslettersChart data={chartDataList} isDark={true} /></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="glass-card rounded-[3rem] p-10 shadow-xl"><BlogsChart data={chartDataList} isDark={true} /></div>
                    <div className="glass-card rounded-[3rem] p-10 shadow-xl"><CampaignPerformanceChart data={chartDataList} isDark={true} /></div>
                  </div>
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-10">
                    <ActivityFeed data={currentDataList} isDark={true} onActivityClick={handleActivityClick} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <CrawlStatsModal isOpen={isCrawlModalOpen} onClose={() => setIsCrawlModalOpen(false)} isDark={true} />
      <WebsiteEditsModal isOpen={isWebsiteEditsModalOpen} onClose={() => setIsWebsiteEditsModalOpen(false)} isDark={true} />
      <ChatbotModal isOpen={isChatbotModalOpen} onClose={() => setIsChatbotModalOpen(false)} isDark={true} />
      <TrafficBreakdownModal isOpen={isTrafficModalOpen} onClose={() => setIsTrafficModalOpen(false)} isDark={true} data={MONTHLY_DATA} selectedMonth={selectedPeriodType === 'month' ? selectedValue : ''} />
      <SecurityModal isOpen={isSecurityModalOpen} onClose={() => setIsSecurityModalOpen(false)} isDark={true} />

      {/* Content Deep Dive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl transform overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f1115]/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-500">
            
            {/* Modal Header */}
            <div className="flex flex-col items-center pt-12 pb-8 relative border-b border-white/5">
               <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl shadow-orange-500/20 mb-6">
                  <Layers className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Content Deep Dive</h3>
               <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em] mt-2">BREAKDOWN: {selectedValue}</p>
               
               <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/10 hover:bg-white/10">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-12 pb-12 space-y-12 max-h-[70vh] overflow-y-auto custom-scrollbar pt-8">
              
              {/* Content Breakdown Section */}
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-5 w-1.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]"></div>
                  <h4 className="text-base font-black text-white uppercase tracking-[0.2em]">PUBLISHED CONTENT BREAKDOWN</h4>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'CASE STUDIES', value: (currentAggregates as any).caseStudies || 0, icon: <FileText className="w-4 h-4" /> },
                    { label: 'SERVICE PAGE', value: (currentAggregates as any).servicePages || 0, icon: <LayoutGrid className="w-4 h-4" /> },
                    { label: 'LOCATION PAGES', value: (currentAggregates as any).locationPages || 0, icon: <Tag className="w-4 h-4" /> },
                    { label: 'BLOGS', value: (currentAggregates as any).blogs || 0, icon: <FileText className="w-4 h-4" /> },
                    { label: 'FAQ PAGES', value: (currentAggregates as any).faqPages || 0, icon: <Zap className="w-4 h-4" /> },
                    { label: 'GLOSSARY', value: (currentAggregates as any).glossary || 0, icon: <Layers className="w-4 h-4" /> },
                    { label: 'PRICING PAGES', value: (currentAggregates as any).pricingPages || 0, icon: <Tag className="w-4 h-4" /> },
                    { label: 'VS / COMPARISON', value: (currentAggregates as any).vsPages || 0, icon: <LayoutGrid className="w-4 h-4" /> },
                    { label: 'DECLINING PAGES', value: (currentAggregates as any).decliningPages || 0, icon: <FileText className="w-4 h-4" /> },
                    { label: 'COMMERCIAL KEYWORDS', value: (currentAggregates as any).commercialKeywordPages || 0, icon: <Zap className="w-4 h-4" /> },
                    { label: 'EXHIBITOR PAGES', value: (currentAggregates as any).exhibitorPages || 0, icon: <LayoutGrid className="w-4 h-4" /> },
                  ].filter(item => item.value > 0).map((item, i) => (
                    <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between h-28 group hover:bg-white/10 transition-colors">
                      <div className="flex justify-between items-start">
                        <span className="text-3xl font-black text-white leading-none tracking-tighter group-hover:scale-110 transition-transform origin-left">{item.value}</span>
                        <div className="text-orange-500 opacity-60 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                      </div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-300 transition-colors">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Total Distribution Bar */}
                <div className="bg-orange-600/10 border border-orange-500/20 rounded-2xl p-4 flex justify-between items-center px-8 shadow-inner">
                   <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em]">TOTAL PUBLISHED PAGES</span>
                   <span className="text-2xl font-black text-orange-500 tracking-tighter">
                    {((currentAggregates as any).caseStudies || 0) +
                     ((currentAggregates as any).servicePages || 0) +
                     ((currentAggregates as any).locationPages || 0) +
                     ((currentAggregates as any).blogs || 0) +
                     ((currentAggregates as any).faqPages || 0) +
                     ((currentAggregates as any).glossary || 0) +
                     ((currentAggregates as any).pricingPages || 0) +
                     ((currentAggregates as any).vsPages || 0) +
                     ((currentAggregates as any).decliningPages || 0) +
                     ((currentAggregates as any).commercialKeywordPages || 0) +
                     ((currentAggregates as any).exhibitorPages || 0)}
                   </span>
                </div>
              </section>

              {/* Footer Button */}
              <div className="flex justify-center pt-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-1/2 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] bg-[#f26522] hover:bg-[#ff7a3d] text-white shadow-2xl shadow-orange-600/30 transition-all active:scale-95 hover:translate-y-[-2px]"
                >
                  EXIT ANALYSIS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
