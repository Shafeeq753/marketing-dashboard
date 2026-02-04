
import React, { useState } from 'react';
import { X, ChevronRight, CheckCircle, Info, Activity, Layers, Download, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CrawlStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

const crawlData = [
  { date: '11/6/25', requests: 180 }, { date: '11/12/25', requests: 210 },
  { date: '11/17/25', requests: 150 }, { date: '11/24/25', requests: 240 },
  { date: '11/28/25', requests: 120 }, { date: '12/4/25', requests: 190 },
  { date: '12/9/25', requests: 230 }, { date: '12/15/25', requests: 170 },
  { date: '12/20/25', requests: 350 }, { date: '12/27/25', requests: 210 },
  { date: '12/31/25', requests: 280 }, { date: '1/6/26', requests: 380 },
  { date: '1/11/26', requests: 240 }, { date: '1/18/26', requests: 880 },
  { date: '1/22/26', requests: 420 }, { date: '1/29/26', requests: 590 },
  { date: '2/2/26', requests: 310 }, { date: '2/5/26', requests: 460 },
];

const CustomTooltip = ({ active, payload, label, isDark }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 rounded-lg shadow-xl border text-[11px] font-sans ${
        isDark ? 'bg-[#303134] text-white border-white/10' : 'bg-white text-slate-900 border-slate-200'
      }`}>
        <div className={`font-bold border-b pb-1 mb-1 ${isDark ? 'border-white/10' : 'border-slate-100'}`}>{label}</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4285f4]"></div>
          <span className="font-medium">requests: {payload[0].value.toLocaleString()}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const CrawlStatsModal: React.FC<CrawlStatsModalProps> = ({ isOpen, onClose, isDark }) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'size' | 'time'>('requests');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 backdrop-blur-md transition-colors duration-500 ${
          isDark ? 'bg-slate-950/80' : 'bg-slate-500/30'
        }`} 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className={`relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 border transition-colors duration-500 ${
        isDark ? 'bg-[#1a1c1e] text-white border-[#3c4043]' : 'bg-white text-slate-900 border-slate-200'
      }`}>
        
        {/* Top Header Bar */}
        <div className={`px-6 py-3 border-b flex items-center justify-between shrink-0 transition-colors duration-500 ${
          isDark ? 'border-[#3c4043] bg-[#202124]' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="text-slate-500 hover:underline cursor-pointer">Settings</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Crawl stats</span>
          </div>
          <div className="flex items-center gap-4">
             <button className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
               isDark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'
             }`}>
               <Download className="w-4 h-4" />
               Export
             </button>
             <button onClick={onClose} className={`p-1 transition-colors ${
               isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'
             }`}>
               <X className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Scrollable Report Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
             <div>
                <h1 className={`text-2xl font-normal mb-1 tracking-tight ${isDark ? 'text-white' : 'text-slate-800'}`}>Crawl stats report</h1>
                <p className={`text-[10px] uppercase font-black tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Property: MPV-Analytics.com</p>
             </div>
             <div className="text-[11px] text-slate-500">
                Last updated: <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>2/2/26</span>
             </div>
          </div>

          {/* Main Chart Container with Tabs */}
          <div className={`rounded-xl border shadow-sm overflow-hidden transition-colors duration-500 ${
            isDark ? 'bg-[#202124] border-[#3c4043]' : 'bg-white border-slate-200'
          }`}>
            <div className={`grid grid-cols-1 md:grid-cols-3 border-b ${isDark ? 'border-[#3c4043]' : 'border-slate-100'}`}>
               {/* Total Crawl Requests Tab */}
               <div 
                 onClick={() => setActiveTab('requests')}
                 className={`p-6 cursor-pointer transition-all border-b-2 ${
                   activeTab === 'requests' 
                     ? (isDark ? 'bg-blue-600/10 border-blue-500' : 'bg-blue-50 border-blue-500') 
                     : 'border-transparent opacity-60 hover:opacity-100'
                 }`}
               >
                 <div className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-tight mb-2">
                   <input type="checkbox" checked={activeTab === 'requests'} readOnly className="accent-blue-500 w-3.5 h-3.5" />
                   Total crawl requests
                   <Info className="w-4 h-4 opacity-40 ml-auto" />
                 </div>
                 <div className={`text-4xl font-normal tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-800'}`}>22.7K</div>
               </div>

               {/* Total Download Size Tab */}
               <div 
                 onClick={() => setActiveTab('size')}
                 className={`p-6 cursor-pointer transition-all border-b-2 ${
                   activeTab === 'size' 
                     ? (isDark ? 'bg-blue-600/10 border-blue-500' : 'bg-blue-50 border-blue-500') 
                     : 'border-transparent opacity-60 hover:opacity-100'
                 }`}
               >
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-2">
                   <input type="checkbox" checked={activeTab === 'size'} readOnly className="w-3.5 h-3.5" />
                   Total download size (Bytes)
                   <Info className="w-4 h-4 opacity-40 ml-auto" />
                 </div>
                 <div className={`text-4xl font-normal tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>805M</div>
               </div>

               {/* Avg Response Time Tab */}
               <div 
                 onClick={() => setActiveTab('time')}
                 className={`p-6 cursor-pointer transition-all border-b-2 ${
                   activeTab === 'time' 
                     ? (isDark ? 'bg-blue-600/10 border-blue-500' : 'bg-blue-50 border-blue-500') 
                     : 'border-transparent opacity-60 hover:opacity-100'
                 }`}
               >
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tight mb-2">
                   <input type="checkbox" checked={activeTab === 'time'} readOnly className="w-3.5 h-3.5" />
                   Avg response time (ms)
                   <Info className="w-4 h-4 opacity-40 ml-auto" />
                 </div>
                 <div className={`text-4xl font-normal tracking-tight ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>1.17K</div>
               </div>
            </div>

            {/* Chart Visualization */}
            <div className="h-[280px] w-full p-6 pt-10">
              <div className="text-[10px] text-slate-500 mb-2 opacity-60 uppercase font-black tracking-[0.2em] px-8">
                  Crawl requests
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={crawlData} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke={isDark ? "rgba(255,255,255,0.05)" : "#f1f3f4"} />
                  <XAxis 
                    dataKey="date" 
                    stroke={isDark ? "#8e9196" : "#5f6368"}
                    fontSize={11} 
                    axisLine={false} 
                    tickLine={false} 
                    dy={12}
                    interval={2}
                  />
                  <YAxis 
                    stroke={isDark ? "#8e9196" : "#5f6368"}
                    fontSize={11} 
                    axisLine={false} 
                    tickLine={false}
                    ticks={[0, 300, 600, 900]}
                  />
                  <Tooltip content={<CustomTooltip isDark={isDark} />} />
                  <Line 
                    type="monotone" 
                    dataKey="requests" 
                    stroke="#4285f4" 
                    strokeWidth={1.8} 
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 0, fill: '#4285f4' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Host Status Row */}
          <div className={`p-5 rounded-xl border flex items-center justify-between group cursor-pointer transition-all ${
            isDark ? 'bg-[#202124] border-[#3c4043] hover:bg-[#303134]' : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}>
            <div className="flex items-center gap-5">
              <div className="bg-emerald-500/10 p-2 rounded-full ring-4 ring-emerald-500/5">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-base font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>Host status</span>
                <Info className="w-4 h-4 text-slate-500 opacity-60" />
              </div>
              <span className={`text-xs ml-4 hidden lg:inline font-medium ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Host had no problems in the last 90 days</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
          </div>

          {/* Breakdown Section */}
          <div className="space-y-6">
             <div className="flex items-center gap-4">
                <h3 className={`text-[10px] font-black uppercase tracking-[0.25em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Crawl requests breakdown</h3>
                <div className={`flex-1 h-px ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}></div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`rounded-xl border overflow-hidden transition-colors ${isDark ? 'bg-[#202124] border-[#3c4043]' : 'bg-white border-slate-200'}`}>
                    <div className={`px-5 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-500 border-b border-slate-100'}`}>
                      <Activity className="w-3.5 h-3.5" />
                      By response
                    </div>
                    <div className="p-4 space-y-3">
                        {[
                          { label: 'OK (200)', val: '85%', color: '#4285f4' },
                          { label: 'Not found (404)', val: '7%', color: '#ea4335' },
                          { label: 'Other', val: '8%', color: '#9aa0a6' }
                        ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between text-xs py-1 px-1">
                                <span className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{row.label}</span>
                                <div className="flex items-center gap-4">
                                    <span className={`font-bold w-8 text-right ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.val}</span>
                                    <div className={`h-1.5 w-24 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                                        <div className="h-full transition-all duration-1000" style={{ width: row.val, backgroundColor: row.color }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`rounded-xl border overflow-hidden transition-colors ${isDark ? 'bg-[#202124] border-[#3c4043]' : 'bg-white border-slate-200'}`}>
                    <div className={`px-5 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-500 border-b border-slate-100'}`}>
                      <Layers className="w-3.5 h-3.5" />
                      By file type
                    </div>
                    <div className="p-4 space-y-3">
                        {[
                          { label: 'HTML', val: '50%', color: '#fbbc04' },
                          { label: 'Image', val: '19%', color: '#34a853' },
                          { label: 'Script', val: '31%', color: '#4285f4' }
                        ].map((row, i) => (
                            <div key={i} className="flex items-center justify-between text-xs py-1 px-1">
                                <span className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{row.label}</span>
                                <div className="flex items-center gap-4">
                                    <span className={`font-bold w-8 text-right ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.val}</span>
                                    <div className={`h-1.5 w-24 rounded-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                                        <div className="h-full transition-all duration-1000" style={{ width: row.val, backgroundColor: row.color }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className={`px-8 py-6 border-t flex justify-end shrink-0 transition-colors duration-500 ${
          isDark ? 'border-[#3c4043] bg-[#202124]' : 'border-slate-100 bg-slate-50'
        }`}>
          <button 
            onClick={onClose}
            className={`px-10 py-2.5 rounded font-bold text-xs uppercase tracking-widest shadow-md transition-all active:scale-95 ${
              isDark ? 'bg-[#4285f4] hover:bg-[#3b78db] text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
