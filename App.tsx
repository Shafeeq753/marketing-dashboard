
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
import { 
  Users, 
  Video, 
  Layers, 
  BarChart3,
  LayoutDashboard,
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
  MapPin,
  HelpCircle
} from 'lucide-react';
import { MonthlyData } from './types';

const aggregateData = (data: MonthlyData[]) => {
  const aggregated = data.reduce((acc, curr) => ({
    traffic: acc.traffic + curr.traffic,
    benchmarkVideos: acc.benchmarkVideos + curr.benchmarkVideos,
    newsletters: acc.newsletters + curr.newsletters,
    blogs: acc.blogs + curr.blogs,
    campaigns: {
        email: acc.campaigns.email + curr.campaigns.email,
        linkedin: acc.campaigns.linkedin + curr.campaigns.linkedin,
        other: acc.campaigns.other + curr.campaigns.other
    },
    totalVideosOnSite: curr.totalVideosOnSite 
  }), { 
    traffic: 0, 
    benchmarkVideos: 0, 
    newsletters: 0, 
    blogs: 0, 
    campaigns: { email: 0, linkedin: 0, other: 0 },
    totalVideosOnSite: 0
  });

  if (data.length > 0) {
    aggregated.totalVideosOnSite = data[data.length - 1].totalVideosOnSite;
  }

  return aggregated;
};

type PeriodType = 'quarter' | 'month';

const App: React.FC = () => {
  const [selectedPeriodType, setSelectedPeriodType] = useState<PeriodType>('month');
  const [selectedValue, setSelectedValue] = useState<string>('January');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCrawlModalOpen, setIsCrawlModalOpen] = useState(false);
  const [isWebsiteEditsModalOpen, setIsWebsiteEditsModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const quarters = useMemo(() => Array.from(new Set(MONTHLY_DATA.map(d => d.quarter))), []);
  const months = useMemo(() => MONTHLY_DATA.map(d => d.month), []);

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
    if (selectedPeriodType === 'quarter') {
      const idx = quarters.indexOf(selectedValue);
      if (idx > 0) {
        const prevQuarter = quarters[idx - 1];
        const prevData = MONTHLY_DATA.filter(d => d.quarter === prevQuarter);
        return aggregateData(prevData);
      }
    } else {
      const idx = months.indexOf(selectedValue);
      if (idx > 0) {
        return MONTHLY_DATA[idx - 1];
      }
    }
    return null;
  }, [selectedPeriodType, selectedValue, quarters, months]);

  const trafficDisplayValue = useMemo(() => {
    if (selectedPeriodType === 'quarter' && currentDataList.length > 0) {
      return Math.round(currentAggregates.traffic / currentDataList.length);
    }
    return currentAggregates.traffic;
  }, [selectedPeriodType, currentAggregates.traffic, currentDataList.length]);

  const trafficPrevValue = useMemo(() => {
    if (!prevAggregates) return null;
    if (selectedPeriodType === 'quarter') {
      const prevQuarter = quarters[quarters.indexOf(selectedValue) - 1];
      const prevMonthsCount = MONTHLY_DATA.filter(d => d.quarter === prevQuarter).length;
      return Math.round(prevAggregates.traffic / (prevMonthsCount || 1));
    }
    return prevAggregates.traffic;
  }, [selectedPeriodType, prevAggregates, selectedValue, quarters]);

  const calculateTrend = (current: number, previous: number | undefined | null) => {
    if (previous === undefined || previous === null || previous === 0) return { trend: 'neutral' as const, value: '-' };
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    const trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral';
    return { trend: trend as 'up' | 'down' | 'neutral', value: `${Math.abs(Number(percent))}%` };
  };

  const trafficTrend = calculateTrend(trafficDisplayValue, trafficPrevValue);
  const videoTrend = calculateTrend(currentAggregates.benchmarkVideos, prevAggregates?.benchmarkVideos);
  const blogTrend = calculateTrend(currentAggregates.blogs, prevAggregates?.blogs);

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
    }
  };

  return (
    <div className={`flex min-h-screen font-sans transition-all duration-700`}>
      {/* Sidebar */}
      <aside className={`${isSidebarCollapsed ? 'w-24' : 'w-80'} glass m-4 mr-0 rounded-[2.5rem] flex-shrink-0 fixed h-[calc(100vh-2rem)] transition-all duration-500 z-30 hidden lg:flex flex-col shadow-2xl`}>
        <div className={`p-10 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-start gap-4'}`}>
          <div className="p-3 bg-orange-600 rounded-2xl shadow-xl shadow-orange-900/40 flex-shrink-0">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col">
              <span className={`font-black text-xl tracking-tighter whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>MPV ANALYTICS</span>
              <span className="text-[10px] font-black text-orange-500 tracking-[0.2em] uppercase">Enterprise v2.0</span>
            </div>
          )}
        </div>
        <nav className="flex-1 px-6 space-y-12 overflow-y-auto custom-scrollbar pt-6">
          <div>
            <h3 className={`text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-6 px-4 ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? 'PER' : 'Strategy Periods'}
            </h3>
            <ul className="space-y-3">
              {quarters.map(q => (
                <li key={q}>
                  <button onClick={() => handleSidebarClick('quarter', q)} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between px-5'} py-4 rounded-2xl text-sm font-black transition-all ${selectedPeriodType === 'quarter' && selectedValue === q ? 'bg-white/10 text-orange-500' : isDarkMode ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
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
                <button key={m} onClick={() => handleSidebarClick('month', m)} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} px-4 py-4 rounded-2xl text-[13px] font-bold transition-all text-left ${selectedPeriodType === 'month' && selectedValue === m ? 'text-orange-500 bg-orange-500/10' : isDarkMode ? 'text-slate-500 hover:text-slate-200 hover:bg-white/5' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}>
                  {isSidebarCollapsed ? m.substring(0, 3) : m}
                  {!isSidebarCollapsed && selectedPeriodType === 'month' && selectedValue === m && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)]"></div>}
                </button>
              ))}
            </div>
          </div>
        </nav>
        <div className={`p-8 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-200/50'} flex justify-center`}>
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className={`p-3.5 rounded-2xl glass ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'} transition-all hover:scale-110 active:scale-90`}>
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 ${isSidebarCollapsed ? 'lg:ml-28' : 'lg:ml-80'} p-4 md:p-12 transition-all duration-500`}>
        <div className="max-w-7xl mx-auto space-y-12">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 text-[9px] font-black text-white bg-accent rounded-full uppercase tracking-widest shadow-lg shadow-accent/20">Insight Live</span>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>System Ready</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h1 className={`text-6xl font-black tracking-tighter transition-all ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  <span className="opacity-30">{selectedValue.substring(0, 3)}</span> Overview.
                </h1>
              </div>
              <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-400'} text-sm font-bold tracking-tight`}>
                Analyzing {selectedPeriodType === 'quarter' ? `Quarter ${selectedValue}` : `Month of ${selectedValue}`} metrics
              </p>
            </div>
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-3 bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all hover:translate-y-[-2px] hover:shadow-2xl active:scale-95">
                <Plus className="w-5 h-5" />Upload Data
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard title="Total Traffic" value={trafficDisplayValue.toLocaleString()} subValue={trafficPrevValue ? `vs prev period: ${trafficPrevValue.toLocaleString()}` : undefined} icon={<Users className="w-6 h-6" />} colorClass="text-slate-400" trend={trafficTrend.trend} trendValue={trafficTrend.value} isDark={isDarkMode} />
            <StatCard title="Benchmark Videos" value={currentAggregates.benchmarkVideos} subValue={`Total on site: ${currentAggregates.totalVideosOnSite}`} icon={<Video className="w-6 h-6" />} colorClass="text-amber-500" trend={videoTrend.trend} trendValue={videoTrend.value} isDark={isDarkMode} />
            <StatCard title="New Published pages" value={currentAggregates.blogs} subValue={prevAggregates ? `vs prev: ${prevAggregates.blogs}` : "New pages"} icon={<Layers className="w-6 h-6" />} colorClass="text-yellow-500" trend={blogTrend.trend} trendValue={blogTrend.value} isDark={isDarkMode} isClickable={true} onClick={() => setIsModalOpen(true)} />
            <StatCard title="Campaign Reach" value={<div className="flex items-center gap-8 mt-1"><div className="flex flex-col"><span className={`text-[9px] uppercase font-black tracking-[0.1em] mb-1.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Email</span><span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentAggregates.campaigns.email.toLocaleString()}</span></div><div className="flex flex-col"><span className={`text-[9px] uppercase font-black tracking-[0.1em] mb-1.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>LinkedIn</span><span className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentAggregates.campaigns.linkedin.toLocaleString()}</span></div></div>} icon={<BarChart3 className="w-6 h-6" />} colorClass="text-orange-500" isDark={isDarkMode} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
            <div className="lg:col-span-2 space-y-10">
              <div className="glass rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                  <Zap className="w-64 h-64" />
                </div>
                <TrafficChart data={chartDataList} isDark={isDarkMode} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="glass rounded-[2.5rem] p-8 shadow-xl"><VideosChart data={chartDataList} isDark={isDarkMode} /></div>
                <div className="glass rounded-[2.5rem] p-8 shadow-xl"><NewslettersChart data={chartDataList} isDark={isDarkMode} /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="glass rounded-[2.5rem] p-8 shadow-xl"><BlogsChart data={chartDataList} isDark={isDarkMode} /></div>
                <div className="glass rounded-[2.5rem] p-8 shadow-xl"><CampaignPerformanceChart data={chartDataList} isDark={isDarkMode} /></div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-10">
                <ActivityFeed data={currentDataList} isDark={isDarkMode} onActivityClick={handleActivityClick} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <CrawlStatsModal isOpen={isCrawlModalOpen} onClose={() => setIsCrawlModalOpen(false)} isDark={isDarkMode} />
      <WebsiteEditsModal isOpen={isWebsiteEditsModalOpen} onClose={() => setIsWebsiteEditsModalOpen(false)} isDark={isDarkMode} />

      {/* Content Deep Dive Modal - REBUILT TO MATCH SCREENSHOT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className={`relative w-full max-w-2xl transform overflow-hidden rounded-[2rem] border ${isDarkMode ? 'bg-[#0f1115] border-white/5' : 'bg-white border-slate-200'} shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-300`}>
            
            {/* Modal Header */}
            <div className={`flex flex-col items-center pt-10 pb-6 relative`}>
               <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg mb-4">
                  <Layers className="w-7 h-7 text-white" />
               </div>
               <h3 className={`text-2xl font-black text-white uppercase tracking-tighter`}>Content Deep Dive</h3>
               <p className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mt-1">BREAKDOWN: {selectedValue}</p>
               
               <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/5">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-10 pb-10 space-y-10">
              
              {/* EXPLAINER VIDEO AGENCY PILLAR Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-1 bg-orange-500 rounded-full"></div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">EXPLAINER VIDEO AGENCY PILLAR</h4>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'CASE STUDIES', value: 5, icon: <FileText className="w-3.5 h-3.5" /> },
                    { label: 'SERVICE PAGE', value: 1, icon: <LayoutGrid className="w-3.5 h-3.5" /> },
                    { label: 'LOCATION PAGES', value: 5, icon: <Tag className="w-3.5 h-3.5" /> },
                    { label: 'BLOGS', value: 10, icon: <FileText className="w-3.5 h-3.5" /> },
                    { label: 'FAQ PAGES', value: 5, icon: <Zap className="w-3.5 h-3.5" /> },
                    { label: 'GLOSSARY', value: 10, icon: <Layers className="w-3.5 h-3.5" /> },
                  ].map((item, i) => (
                    <div key={i} className={`p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col justify-between h-24`}>
                      <div className="flex justify-between items-start">
                        <span className="text-2xl font-black text-white leading-none">{item.value}</span>
                        <div className="text-orange-500/60">{item.icon}</div>
                      </div>
                      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Total Distribution Bar */}
                <div className="bg-orange-600/10 border border-orange-500/20 rounded-xl p-3 flex justify-between items-center px-5">
                   <span className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em]">TOTAL PILLAR DISTRIBUTION</span>
                   <span className="text-xl font-black text-orange-500">36</span>
                </div>
              </section>

              {/* Curated Listicles Section */}
              <section className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-1 bg-[#8b5cf6] rounded-full"></div>
                    <h4 className="text-sm font-black text-white uppercase tracking-widest">CURATED LISTICLES</h4>
                  </div>
                  <span className="px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-[#8b5cf6] text-white shadow-lg shadow-[#8b5cf6]/20">
                    16 ITEMS TOTAL
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-[8px] font-black text-orange-400 uppercase tracking-widest">
                       <Tag className="w-3 h-3" /> INDUSTRY VERTICAL
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['AI', 'Cyber', 'FinTech', 'Health', 'Bio', 'Clean', 'EdTech', 'Data'].map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-slate-400">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-[8px] font-black text-orange-400 uppercase tracking-widest">
                       <MonitorPlay className="w-3 h-3" /> VIDEO FORMAT
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Explainer', 'Brand'].map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-slate-400">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                    <div className="flex items-center gap-2 text-[8px] font-black text-orange-400 uppercase tracking-widest">
                       <LayoutDashboard className="w-3 h-3" /> STYLE MATRIX
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['2D', '3D', 'Motion', 'Live'].map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-slate-400">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer Button */}
              <div className="flex justify-center pt-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] bg-[#f26522] hover:bg-[#e05a1d] text-white shadow-xl transition-all active:scale-95"
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
