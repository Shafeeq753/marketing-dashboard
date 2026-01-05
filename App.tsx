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
import { 
  Users, 
  Video, 
  PenTool, 
  BarChart3,
  LayoutDashboard,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  Plus,
  Moon,
  Sun
} from 'lucide-react';
import { MonthlyData } from './types';

// Helper to aggregate data for a list of months (e.g. for a Quarter)
const aggregateData = (data: MonthlyData[]) => {
  return data.reduce((acc, curr) => ({
    traffic: acc.traffic + curr.traffic,
    benchmarkVideos: acc.benchmarkVideos + curr.benchmarkVideos,
    benchmarkVideosSecondary: (acc.benchmarkVideosSecondary || 0) + (curr.benchmarkVideosSecondary || 0),
    newsletters: acc.newsletters + curr.newsletters,
    blogs: acc.blogs + curr.blogs,
    campaigns: {
        email: acc.campaigns.email + curr.campaigns.email,
        linkedin: acc.campaigns.linkedin + curr.campaigns.linkedin,
        other: acc.campaigns.other + curr.campaigns.other
    }
  }), { 
    traffic: 0, 
    benchmarkVideos: 0, 
    benchmarkVideosSecondary: 0, 
    newsletters: 0, 
    blogs: 0, 
    campaigns: { email: 0, linkedin: 0, other: 0 } 
  });
};

type PeriodType = 'quarter' | 'month';

const App: React.FC = () => {
  // State
  const [selectedPeriodType, setSelectedPeriodType] = useState<PeriodType>('month');
  const [selectedValue, setSelectedValue] = useState<string>('Dec');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Sync theme with body class for Tailwind dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Derived Lists
  const quarters = useMemo(() => Array.from(new Set(MONTHLY_DATA.map(d => d.quarter))), []);
  const months = useMemo(() => MONTHLY_DATA.map(d => d.month), []);

  // Filter Logic
  const currentDataList = useMemo(() => {
    if (selectedPeriodType === 'quarter') {
      return MONTHLY_DATA.filter(d => d.quarter === selectedValue);
    } else {
      return MONTHLY_DATA.filter(d => d.month === selectedValue);
    }
  }, [selectedPeriodType, selectedValue]);

  const currentAggregates = useMemo(() => {
    if (currentDataList.length === 1) return { ...currentDataList[0], traffic: currentDataList[0].traffic };
    return aggregateData(currentDataList);
  }, [currentDataList]);

  // Chart Data Logic
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

  // Comparison Logic
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

  // Calculation for Traffic (Average if Quarter, Total if Month)
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

  // Trend Calculation
  const calculateTrend = (current: number, previous: number | undefined | null) => {
    if (previous === undefined || previous === null || previous === 0) return { trend: 'neutral' as const, value: '-' };
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    const trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral';
    return { trend: trend as 'up' | 'down' | 'neutral', value: `${diff > 0 ? '+' : ''}${percent}%` };
  };

  const trafficTrend = calculateTrend(trafficDisplayValue, trafficPrevValue);
  const videoTrend = calculateTrend(currentAggregates.benchmarkVideos, prevAggregates?.benchmarkVideos);
  const blogTrend = calculateTrend(currentAggregates.blogs, prevAggregates?.blogs);

  const handleSidebarClick = (type: PeriodType, value: string) => {
    setSelectedPeriodType(type);
    setSelectedValue(value);
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-[#f8fafc] text-slate-900'}`}>
      
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-r flex-shrink-0 fixed h-full transition-all duration-300 z-20 hidden md:flex flex-col`}
      >
        <div className={`p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="p-2 bg-orange-600 rounded-lg shadow-lg shadow-orange-900/50 flex-shrink-0">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold text-lg tracking-tight whitespace-nowrap transition-opacity duration-300 ${isSidebarCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100'}`}>
                MPV Dash
              </span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-8 overflow-y-auto overflow-x-hidden">
          <div>
            <h3 className={`text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2 transition-all duration-300 ${isSidebarCollapsed ? 'text-center' : ''}`}>
              {isSidebarCollapsed ? 'Qtr' : 'Quarters'}
            </h3>
            <ul className="space-y-1">
              {quarters.map(q => (
                <li key={q}>
                  <button
                    onClick={() => handleSidebarClick('quarter', q)}
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedPeriodType === 'quarter' && selectedValue === q
                        ? 'bg-orange-600/10 text-orange-500 border border-orange-600/20'
                        : isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                    title={isSidebarCollapsed ? `Quarter ${q}` : ''}
                  >
                    <span className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" />
                      {!isSidebarCollapsed && q}
                    </span>
                    {!isSidebarCollapsed && selectedPeriodType === 'quarter' && selectedValue === q && <ChevronRight className="w-4 h-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
             <h3 className={`text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2 transition-all duration-300 ${isSidebarCollapsed ? 'text-center' : ''}`}>
               {isSidebarCollapsed ? 'Mth' : 'Months'}
             </h3>
             <div className={`space-y-1 relative ${!isSidebarCollapsed ? `border-l ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} ml-3 pl-3` : ''}`}>
                {months.map(m => (
                  <button
                    key={m}
                    onClick={() => handleSidebarClick('month', m)}
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      selectedPeriodType === 'month' && selectedValue === m
                        ? 'text-orange-500 bg-orange-500/5'
                        : isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title={isSidebarCollapsed ? m : ''}
                  >
                    {isSidebarCollapsed ? m.substring(0, 3) : m}
                     {!isSidebarCollapsed && selectedPeriodType === 'month' && selectedValue === m && <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>}
                  </button>
                ))}
             </div>
          </div>
        </nav>

        <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} flex justify-center`}>
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`p-2 rounded-lg ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'} transition-colors`}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} p-4 md:p-8 overflow-x-hidden transition-all duration-300`}>
        <div className="w-full space-y-8">
          
          {/* Header */}
          <header className={`flex flex-col md:flex-row md:items-center justify-between gap-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} pb-6`}>
            <div>
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {selectedPeriodType === 'quarter' ? `${selectedValue} Performance` : `${selectedValue} Performance`}
              </h1>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} mt-2`}>
                Viewing data for {selectedPeriodType === 'quarter' ? `Quarter ${selectedValue}` : `Month of ${selectedValue}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setIsDarkMode(!isDarkMode)}
                 className={`p-2.5 rounded-lg border transition-all ${
                   isDarkMode 
                     ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' 
                     : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                 }`}
                 title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
               >
                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
               </button>

               <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-orange-900/20 active:transform active:scale-95">
                 <Plus className="w-4 h-4" />
                 Add Data
               </button>
            </div>
          </header>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title={selectedPeriodType === 'quarter' ? "Average Traffic" : "Total Traffic"}
              value={trafficDisplayValue.toLocaleString()} 
              subValue={trafficPrevValue ? `vs ${trafficPrevValue.toLocaleString()}` : undefined}
              icon={<Users className="w-5 h-5 text-orange-400" />}
              colorClass="text-orange-400"
              trend={trafficTrend.trend}
              trendValue={trafficTrend.value}
              isDark={isDarkMode}
            />
            <StatCard 
              title="Benchmark Videos"
              value={currentAggregates.benchmarkVideos}
              subValue={currentAggregates.benchmarkVideosSecondary ? `(${currentAggregates.benchmarkVideosSecondary} views)` : undefined}
              icon={<Video className="w-5 h-5 text-amber-400" />}
              colorClass="text-amber-400"
              trend={videoTrend.trend}
              trendValue={videoTrend.value}
              isDark={isDarkMode}
            />
             <StatCard 
              title="Blogs Published"
              value={currentAggregates.blogs}
              subValue={prevAggregates ? `vs ${prevAggregates.blogs}` : undefined}
              icon={<PenTool className="w-5 h-5 text-yellow-400" />}
              colorClass="text-yellow-400"
              trend={blogTrend.trend}
              trendValue={blogTrend.value}
              isDark={isDarkMode}
            />
            <StatCard 
              title="Campaigns"
              value={
                <div className="flex items-center gap-4 mt-1">
                   <div className="flex flex-col">
                      <span className={`text-[10px] uppercase font-bold tracking-wider mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Emails (E)</span>
                      <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentAggregates.campaigns.email.toLocaleString()}</span>
                   </div>
                   <div className={`w-px ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} h-8`}></div>
                   <div className="flex flex-col">
                      <span className={`text-[10px] uppercase font-bold tracking-wider mb-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>LinkedIn (L)</span>
                      <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{currentAggregates.campaigns.linkedin.toLocaleString()}</span>
                   </div>
                </div>
              }
              icon={<BarChart3 className="w-5 h-5 text-orange-500" />}
              colorClass="text-orange-500"
              isDark={isDarkMode}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Charts Column */}
            <div className="lg:col-span-2 space-y-6">
              
              <div className={`${isDarkMode ? 'bg-card border-slate-700/50' : 'bg-white border-slate-200'} rounded-xl p-6 border shadow-sm`}>
                 <TrafficChart data={chartDataList} isDark={isDarkMode} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className={`${isDarkMode ? 'bg-card border-slate-700/50' : 'bg-white border-slate-200'} rounded-xl p-6 border shadow-sm`}>
                   <VideosChart data={chartDataList} isDark={isDarkMode} />
                 </div>
                 <div className={`${isDarkMode ? 'bg-card border-slate-700/50' : 'bg-white border-slate-200'} rounded-xl p-6 border shadow-sm`}>
                   <NewslettersChart data={chartDataList} isDark={isDarkMode} />
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className={`${isDarkMode ? 'bg-card border-slate-700/50' : 'bg-white border-slate-200'} rounded-xl p-6 border shadow-sm`}>
                   <BlogsChart data={chartDataList} isDark={isDarkMode} />
                 </div>
                 <div className={`${isDarkMode ? 'bg-card border-slate-700/50' : 'bg-white border-slate-200'} rounded-xl p-6 border shadow-sm`}>
                   <CampaignPerformanceChart data={chartDataList} isDark={isDarkMode} />
                 </div>
              </div>

            </div>

            {/* Activity Column */}
            <div className="lg:col-span-1 h-full">
               <div className="sticky top-6">
                 <ActivityFeed data={currentDataList} isDark={isDarkMode} />
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;