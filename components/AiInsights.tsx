import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { MonthlyData } from '../types';
import { generateQuarterlyInsights } from '../services/geminiService';

interface AiInsightsProps {
  quarter: string;
  data: MonthlyData[];
}

export const AiInsights: React.FC<AiInsightsProps> = ({ quarter, data }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateQuarterlyInsights(quarter, data);
    setInsights(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-orange-900/30 to-amber-900/30 rounded-xl p-6 border border-orange-500/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            AI Executive Summary
          </h3>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
            {insights ? 'Regenerate' : 'Generate Insights'}
          </button>
        </div>

        {!insights && !loading && (
          <div className="text-slate-400 text-sm p-4 text-center border border-dashed border-orange-500/30 rounded-lg">
            Tap the button above to analyze marketing performance for {quarter} using Gemini AI.
          </div>
        )}

        {loading && (
          <div className="space-y-3 animate-pulse">
             <div className="h-4 bg-orange-500/20 rounded w-3/4"></div>
             <div className="h-4 bg-orange-500/20 rounded w-full"></div>
             <div className="h-4 bg-orange-500/20 rounded w-5/6"></div>
          </div>
        )}

        {insights && !loading && (
          <div className="text-slate-200 text-sm prose prose-invert prose-sm max-w-none">
             <div className="whitespace-pre-wrap font-sans leading-relaxed">
               {insights}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};