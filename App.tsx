import React, { useState, useMemo } from 'react';
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
  Plus
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
  const [selectedValue, setSelectedValue] = useState<string>('Oct'); // Default to Oct to show the fix
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Derived Lists
  const quarters = useMemo(() => Array.from(new Set(MONTHLY_DATA.map(d => d.quarter))), []);
  const months = useMemo(() => MONTHLY_DATA.map(d => d.month), []);

  // Filter Logic for KPI Cards & Activity Feed (Strict Filter)
  const currentDataList = useMemo(() => {
    if (selectedPeriodType === 'quarter') {
      return MONTHLY_DATA.filter(d => d.quarter === selectedValue);
    } else {
      return MONTHLY_DATA.filter(d => d.month === selectedValue);
    }
  }, [selectedPeriodType, selectedValue]);

  const currentAggregates = useMemo(() => {
    if (currentDataList.length === 1) return { ...currentDataList[0], traffic: currentDataList[0].traffic }; // Preserve structure
    return aggregateData(currentDataList);
  }, [currentDataList]);

  // Chart Data Logic (Contextual)
  // Fix: If a month is selected, show [Previous Month, Current Month].
  // This ensures the graph line ends exactly on the selected month's value, matching the KPI.
  const chartDataList = useMemo(() => {
    if (selectedPeriodType === 'quarter') {
      return currentDataList;
    } else {
      const currentIndex = MONTHLY_DATA.findIndex(d => d.month === selectedValue);
      if (currentIndex > 0) {
        // Return previous month and current month to show the immediate trend leading into the selection
        return [MONTHLY_DATA[currentIndex - 1], MONTHLY_DATA[currentIndex]];
      }
      // Fallback for the very first month (no previous data to draw a line from)
      return [MONTHLY_DATA[currentIndex]];
    }
  }, [currentDataList, selectedPeriodType, selectedValue]);

  // Comparison Logic (Always compare to previous period if available)
  const prevAggregates = useMemo(() => {
    if (selectedPeriodType === 'quarter') {
      // Find previous quarter index
      const idx = quarters.indexOf(selectedValue);
      if (idx > 0) {
        const prevQuarter = quarters[idx - 1];
        const prevData = MONTHLY_DATA.filter(d => d.quarter === prevQuarter);
        return aggregateData(prevData);
      }
    } else {
      // Find previous month index
      const idx = months.indexOf(selectedValue);
      if (idx > 0) {
        return MONTHLY_DATA[idx - 1];
      }
    }
    return null; // No previous data
  }, [selectedPeriodType, selectedValue, quarters, months]);


  // Trend Calculation
  const calculateTrend = (current: number, previous: number | undefined | null) => {
    if (previous === undefined || previous === null || previous === 0) return { trend: 'neutral' as const, value: '-' };
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    const trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral';
    return { trend: trend as 'up' | 'down' | 'neutral', value: `${diff > 0 ? '+' : ''}${percent}%` };
  };

  const trafficTrend = calculateTrend(currentAggregates.traffic, prevAggregates?.traffic);
  const videoTrend = calculateTrend(currentAggregates.benchmarkVideos, prevAggregates?.benchmarkVideos);
  const blogTrend = calculateTrend(currentAggregates.blogs, prevAggregates?.blogs);
  
  const currentCampaigns = currentAggregates.campaigns.email + currentAggregates.campaigns.linkedin + currentAggregates.campaigns.other;
  const prevCampaigns = prevAggregates ? (prevAggregates.campaigns.email + prevAggregates.campaigns.linkedin + prevAggregates.campaigns.other) : 0;
  const campaignTrend = calculateTrend(currentCampaigns, prevAggregates ? prevCampaigns : null);

  const handleSidebarClick = (type: PeriodType, value: string) => {
    setSelectedPeriodType(type);
    setSelectedValue(value);
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100 font-sans transition-all duration-300">
      
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } bg-slate-900 border-r border-slate-800 flex-shrink-0 fixed h-full transition-all duration-300 z-20 hidden md:flex flex-col`}
      >
        <div className={`p-6 border-b border-slate-800 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
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
          {/* Quarters Section */}
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
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
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

          {/* Months Section */}
          <div>
             <h3 className={`text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2 transition-all duration-300 ${isSidebarCollapsed ? 'text-center' : ''}`}>
               {isSidebarCollapsed ? 'Mth' : 'Months'}
             </h3>
             <div className={`space-y-1 relative ${!isSidebarCollapsed ? 'border-l border-slate-800 ml-3 pl-3' : ''}`}>
                {months.map(m => (
                  <button
                    key={m}
                    onClick={() => handleSidebarClick('month', m)}
                    className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      selectedPeriodType === 'month' && selectedValue === m
                        ? 'text-orange-400 bg-slate-800'
                        : 'text-slate-400 hover:text-slate-200'
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

        {/* Toggle Button */}
        <div className="p-4 border-t border-slate-800 flex justify-center">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'} p-4 md:p-8 overflow-x-hidden transition-all duration-300`}>
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">
                {selectedPeriodType === 'quarter' ? `${selectedValue} Performance` : `${selectedValue} Performance`}
              </h1>
              <p className="text-slate-400 mt-2">
                Viewing data for {selectedPeriodType === 'quarter' ? `Quarter ${selectedValue}` : `Month of ${selectedValue}`}
              </p>
            </div>

            <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-orange-900/20 active:transform active:scale-95">
                 <Plus className="w-4 h-4" />
                 Add Data
               </button>
            </div>
          </header>

          {/* KPI Cards (Using Strict Filtered Data) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Total Traffic"
              value={currentAggregates.traffic.toLocaleString()} 
              subValue={prevAggregates ? `vs ${prevAggregates.traffic.toLocaleString()}` : undefined}
              icon={<Users className="w-5 h-5 text-orange-400" />}
              colorClass="text-orange-400"
              trend={trafficTrend.trend}
              trendValue={trafficTrend.value}
            />
            <StatCard 
              title="Benchmark Videos"
              value={currentAggregates.benchmarkVideos}
              subValue={currentAggregates.benchmarkVideosSecondary ? `(${currentAggregates.benchmarkVideosSecondary} views)` : undefined}
              icon={<Video className="w-5 h-5 text-amber-400" />}
              colorClass="text-amber-400"
              trend={videoTrend.trend}
              trendValue={videoTrend.value}
            />
             <StatCard 
              title="Blogs Published"
              value={currentAggregates.blogs}
              subValue={prevAggregates ? `vs ${prevAggregates.blogs}` : undefined}
              icon={<PenTool className="w-5 h-5 text-yellow-400" />}
              colorClass="text-yellow-400"
              trend={blogTrend.trend}
              trendValue={blogTrend.value}
            />
            <StatCard 
              title="Campaigns"
              value={currentCampaigns.toLocaleString()} 
              subValue={prevAggregates ? `vs ${prevCampaigns.toLocaleString()}` : undefined}
              icon={<BarChart3 className="w-5 h-5 text-orange-500" />}
              colorClass="text-orange-500"
              trend={campaignTrend.trend}
              trendValue={campaignTrend.value}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Charts Column (Left 2/3) - Using Contextual Chart Data */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Row 1: Traffic */}
              <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
                 {/* TrafficChart now receives chartDataList (Contextual trend) */}
                 <TrafficChart data={chartDataList} />
              </div>

              {/* Row 2: Videos & Newsletters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
                   <VideosChart data={chartDataList} />
                 </div>
                 <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
                   <NewslettersChart data={chartDataList} />
                 </div>
              </div>

              {/* Row 3: Blogs & Campaigns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
                   <BlogsChart data={chartDataList} />
                 </div>
                 <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
                   <CampaignPerformanceChart data={chartDataList} />
                 </div>
              </div>

            </div>

            {/* Activity Column (Right 1/3) - Using Strict Filtered Data */}
            <div className="lg:col-span-1 h-full">
               <div className="sticky top-6">
                 {/* ActivityFeed remains focused on the selected month/period */}
                 <ActivityFeed data={currentDataList} />
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default App;