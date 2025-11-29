import React, { useState } from 'react';
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
  LayoutDashboard
} from 'lucide-react';

const App: React.FC = () => {
  const allData = MONTHLY_DATA;
  const [viewMode, setViewMode] = useState<'current' | 'previous'>('current');

  // Determine the target month index based on selection
  // 'current' = November (index 4), 'previous' = October (index 3)
  const lastIndex = allData.length - 1;
  const targetIndex = viewMode === 'current' ? lastIndex : lastIndex - 1;
  
  const currentMonthData = allData[targetIndex];
  const prevMonthData = allData[targetIndex - 1];

  // For charts, we only show data up to the selected month to visualize the trend at that point in time
  const chartData = allData.slice(0, targetIndex + 1);

  const calculateTrend = (current: number, previous: number) => {
    if (previous === 0) return { trend: 'neutral' as const, value: '0%' };
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    const trend = diff > 0 ? 'up' : diff < 0 ? 'down' : 'neutral';
    return { trend: trend as 'up' | 'down' | 'neutral', value: `${diff > 0 ? '+' : ''}${percent}%` };
  };

  const trafficTrend = calculateTrend(currentMonthData.traffic, prevMonthData.traffic);
  const videoTrend = calculateTrend(currentMonthData.benchmarkVideos, prevMonthData.benchmarkVideos);
  
  // Blogs specific calculations (removed newsletter aggregation)
  const currentBlogs = currentMonthData.blogs;
  const prevBlogs = prevMonthData.blogs;
  const blogTrend = calculateTrend(currentBlogs, prevBlogs);

  // Total Campaigns
  const currentCampaigns = currentMonthData.campaigns.email + currentMonthData.campaigns.linkedin + currentMonthData.campaigns.other;
  const prevCampaigns = prevMonthData.campaigns.email + prevMonthData.campaigns.linkedin + prevMonthData.campaigns.other;
  const campaignTrend = calculateTrend(currentCampaigns, prevCampaigns);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-orange-600 rounded-lg shadow-lg shadow-orange-900/50">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              Marketing Dashboard
            </h1>
            <p className="text-slate-400 mt-2 ml-1">
              Comparing <span className="text-white font-medium">{prevMonthData.month}</span> vs <span className="text-orange-400 font-medium">{currentMonthData.month}</span>
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/50 backdrop-blur-sm">
            <button
              onClick={() => setViewMode('previous')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'previous' 
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              Last Month (Oct)
            </button>
            <button
              onClick={() => setViewMode('current')}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === 'current' 
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-900/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              This Month (Nov)
            </button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard 
            title={`Traffic (${currentMonthData.month})`}
            value={currentMonthData.traffic.toLocaleString()} 
            subValue={`vs ${prevMonthData.traffic.toLocaleString()} prev. month`}
            icon={<Users className="w-5 h-5 text-orange-400" />}
            colorClass="text-orange-400"
            trend={trafficTrend.trend}
            trendValue={trafficTrend.value}
          />
          <StatCard 
            title={`Videos (${currentMonthData.month})`}
            value={currentMonthData.benchmarkVideos}
            subValue={currentMonthData.benchmarkVideosSecondary ? `(${currentMonthData.benchmarkVideosSecondary} views)` : undefined}
            icon={<Video className="w-5 h-5 text-amber-400" />}
            colorClass="text-amber-400"
            trend={videoTrend.trend}
            trendValue={videoTrend.value}
          />
          <StatCard 
            title={`Blogs (${currentMonthData.month})`}
            value={currentBlogs}
            subValue={`vs ${prevBlogs} prev. month`}
            icon={<PenTool className="w-5 h-5 text-yellow-400" />}
            colorClass="text-yellow-400"
            trend={blogTrend.trend}
            trendValue={blogTrend.value}
          />
          <StatCard 
            title={`Campaigns (${currentMonthData.month})`}
            value={currentCampaigns.toLocaleString()} 
            subValue={`vs ${prevCampaigns.toLocaleString()} prev. month`}
            icon={<BarChart3 className="w-5 h-5 text-orange-500" />}
            colorClass="text-orange-500"
            trend={campaignTrend.trend}
            trendValue={campaignTrend.value}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Charts Column (Left 2/3) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Row 1: Traffic */}
            <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
               <TrafficChart data={chartData} />
            </div>

            {/* Row 2: Videos & Newsletters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
                 <VideosChart data={chartData} />
               </div>
               <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
                 <NewslettersChart data={chartData} />
               </div>
            </div>

            {/* Row 3: Blogs & Campaigns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
                 <BlogsChart data={chartData} />
               </div>
               <div className="bg-card rounded-xl p-6 border border-slate-700/50 shadow-lg">
                 <CampaignPerformanceChart data={chartData} />
               </div>
            </div>

          </div>

          {/* Activity Column (Right 1/3) */}
          <div className="lg:col-span-1 h-full">
             <div className="sticky top-6">
               {/* We pass allData here so the activity log shows the full history regardless of the toggle view */}
               <ActivityFeed data={allData} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;