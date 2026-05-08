
import React from 'react';
import { X, Users, Globe, Share2, MessageCircle, HelpCircle, Video, Search, TrendingUp, Eye, UserCheck } from 'lucide-react';
import { MonthlyData, TrafficChannel } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface TrafficBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  data: MonthlyData[];
  selectedMonth: string;
}

const channelColors: Record<string, string> = {
  'Organic Search': '#22c55e',
  'Direct': '#3b82f6',
  'Referral': '#f59e0b',
  'Organic Social': '#a855f7',
  'Unassigned': '#64748b',
  'Organic Video': '#ef4444',
  'Paid Search': '#06b6d4',
};

const channelIcons: Record<string, React.ReactNode> = {
  'Organic Search': <Search className="w-4 h-4" />,
  'Direct': <Globe className="w-4 h-4" />,
  'Referral': <Share2 className="w-4 h-4" />,
  'Organic Social': <MessageCircle className="w-4 h-4" />,
  'Unassigned': <HelpCircle className="w-4 h-4" />,
  'Organic Video': <Video className="w-4 h-4" />,
  'Paid Search': <Search className="w-4 h-4" />,
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-xl shadow-xl border bg-[#1a1b1e] text-white border-white/10 text-[11px] font-sans">
        <div className="font-bold border-b border-white/10 pb-1 mb-2">{label}</div>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
            <span className="capitalize">{p.dataKey}: <strong>{p.value.toLocaleString()}</strong></span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const TrafficBreakdownModal: React.FC<TrafficBreakdownModalProps> = ({ isOpen, onClose, data, selectedMonth }) => {
  if (!isOpen) return null;

  // Get months that have traffic breakdown data
  const monthsWithBreakdown = data.filter(d => d.trafficBreakdown && d.trafficBreakdown.length > 0);

  // Current month and previous month
  const currentIdx = monthsWithBreakdown.findIndex(d => d.month === selectedMonth);
  const currentMonth = currentIdx >= 0 ? monthsWithBreakdown[currentIdx] : null;
  const prevMonth = currentIdx > 0 ? monthsWithBreakdown[currentIdx - 1] : null;
  const breakdown = currentMonth?.trafficBreakdown || [];
  const prevBreakdown = prevMonth?.trafficBreakdown || [];

  // Calculate totals
  const totals = breakdown.reduce(
    (acc, ch) => ({ sessions: acc.sessions + ch.sessions, pageviews: acc.pageviews + (ch.pageviews ?? 0), users: acc.users + (ch.users ?? 0) }),
    { sessions: 0, pageviews: 0, users: 0 }
  );
  const prevTotals = prevBreakdown.reduce(
    (acc, ch) => ({ sessions: acc.sessions + ch.sessions, pageviews: acc.pageviews + (ch.pageviews ?? 0), users: acc.users + (ch.users ?? 0) }),
    { sessions: 0, pageviews: 0, users: 0 }
  );

  // Helper to get % change
  const getChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? { value: 'New', isUp: true } : { value: '-', isUp: true };
    const pct = ((current - previous) / previous) * 100;
    return { value: `${Math.abs(pct).toFixed(1)}%`, isUp: pct >= 0 };
  };

  // Get prev sessions for a channel
  const getPrevSessions = (channel: string) => {
    const ch = prevBreakdown.find(c => c.channel === channel);
    return ch?.sessions || 0;
  };

  // Prepare chart data for comparison across months
  const comparisonChannels = ['Organic Search', 'Direct', 'Referral', 'Organic Social', 'Organic Video'];
  const comparisonData = comparisonChannels.map(channel => {
    const row: any = { channel: channel.replace('Organic ', 'Org. ') };
    monthsWithBreakdown.forEach(m => {
      const ch = m.trafficBreakdown?.find(c => c.channel === channel);
      row[m.month] = ch?.sessions || 0;
    });
    return row;
  });

  // Total change
  const totalChange = getChange(totals.sessions, prevTotals.sessions);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-3xl transform overflow-hidden rounded-[3rem] border border-white/10 bg-[#0f1115]/80 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all animate-in fade-in zoom-in duration-500">

        {/* Header */}
        <div className="flex flex-col items-center pt-12 pb-8 relative border-b border-white/5">
          <div className="p-4 bg-gradient-to-br from-slate-400 to-slate-600 rounded-3xl shadow-2xl shadow-slate-500/20 mb-6">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Traffic Breakdown</h3>
          <p className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em] mt-2">
            CHANNEL ANALYSIS: {currentMonth ? currentMonth.month : selectedMonth}
          </p>
          <button onClick={onClose} className="absolute top-10 right-10 p-3 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-colors border border-white/10 hover:bg-white/10">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-12 pb-12 space-y-10 max-h-[70vh] overflow-y-auto custom-scrollbar pt-8">

          {/* Total Summary with MoM */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-orange-500/10">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Sessions</span>
                <div className="text-4xl font-black text-white tracking-tighter">{totals.sessions.toLocaleString()}</div>
              </div>
            </div>
            {prevMonth && (
              <div className="text-right">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">vs {prevMonth.month}</span>
                <div className={`text-2xl font-black tracking-tight flex items-center justify-end gap-1 ${totalChange.isUp ? 'text-emerald-400' : 'text-red-400'}`}>
                  <span className="text-lg">{totalChange.isUp ? '\u2191' : '\u2193'}</span>
                  {totalChange.value}
                </div>
              </div>
            )}
          </div>

          {/* Channel Cards */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-5 w-1.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]"></div>
              <h4 className="text-base font-black text-white uppercase tracking-[0.2em]">BY CHANNEL</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {breakdown.map((ch, i) => {
                const color = channelColors[ch.channel] || '#64748b';
                const icon = channelIcons[ch.channel] || <Globe className="w-5 h-5" />;
                const share = totals.sessions > 0 ? ((ch.sessions / totals.sessions) * 100).toFixed(1) : '0';
                const prevSessions = getPrevSessions(ch.channel);
                const change = prevMonth ? getChange(ch.sessions, prevSessions) : null;

                return (
                  <div key={i} className="p-5 rounded-3xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all hover:-translate-y-0.5">
                    {/* Channel header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}20` }}>
                          <div style={{ color }}>{icon}</div>
                        </div>
                        <div>
                          <span className="font-black text-white text-sm">{ch.channel}</span>
                          <div className="text-[10px] font-bold text-slate-500">{share}% of total</div>
                        </div>
                      </div>
                      {change && (
                        <div className={`px-3 py-1.5 rounded-xl text-[11px] font-black ${change.isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                          {change.isUp ? '\u2191' : '\u2193'} {change.value}
                        </div>
                      )}
                    </div>

                    {/* Metrics row */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Sessions</div>
                        <div className="text-xl font-black text-white tracking-tight">{ch.sessions.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Pageviews</div>
                        <div className="text-xl font-black text-slate-300 tracking-tight">{ch.pageviews != null ? ch.pageviews.toLocaleString() : '—'}</div>
                      </div>
                      <div>
                        <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Users</div>
                        <div className="text-xl font-black text-slate-300 tracking-tight">{ch.users != null ? ch.users.toLocaleString() : '—'}</div>
                      </div>
                    </div>

                    {/* Share bar */}
                    <div className="mt-4 w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${share}%`, backgroundColor: color }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Monthly Comparison Chart */}
          {monthsWithBreakdown.length > 1 && (
            <section className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-5 w-1.5 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.8)]"></div>
                <h4 className="text-base font-black text-white uppercase tracking-[0.2em]">MONTHLY COMPARISON (SESSIONS)</h4>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData} barCategoryGap="20%">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="channel" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    {monthsWithBreakdown.map((m, i) => {
                      const colors = ['#64748b', '#f59e0b', '#f26522', '#22c55e', '#a855f7', '#06b6d4'];
                      return <Bar key={m.month} dataKey={m.month} fill={colors[i] || '#f26522'} radius={[4, 4, 0, 0]} />;
                    })}
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6">
                {monthsWithBreakdown.map((m, i) => {
                  const colors = ['#64748b', '#f59e0b', '#f26522'];
                  return (
                    <div key={m.month} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors[i] || '#f26522' }}></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Footer */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onClose}
              className="w-full sm:w-1/2 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] bg-[#f26522] hover:bg-[#ff7a3d] text-white shadow-2xl shadow-orange-600/30 transition-all active:scale-95 hover:translate-y-[-2px]"
            >
              EXIT ANALYSIS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
