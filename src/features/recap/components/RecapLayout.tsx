import React from 'react';
import { Sparkles, Trophy, Calendar, Zap } from 'lucide-react';
import { getCategoryColor } from '@/lib/utils'; // Reusing your color helper

interface RecapLayoutProps {
  recap: WeeklyRecap;
}

export const RecapLayout = ({ recap }: RecapLayoutProps) => {
  const stats = recap.stats_snapshot;

  console.log( recap )
  
  const topCategory = stats.compositions.length > 0 
    ? stats.compositions.reduce((prev: { percentage: number; }, current: { percentage: number; }) => (prev.percentage > current.percentage) ? prev : current)
    : null;

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-linear-to-br from-neutral-900 via-indigo-950 to-neutral-900 p-8 text-white shadow-2xl">
      
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-200 backdrop-blur-md">
          <Sparkles className="size-3.5" />
          Minggu {stats.week_number} Wrapped
        </div>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-white">
          Recap Aktivitasmu
        </h1>
        <p className="mt-1 text-sm text-indigo-200/70">
          {new Date(recap.week_start).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} — {new Date(recap.week_end).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>

      {/* Top Category Highlight */}
      {topCategory && (
        <div className="mb-8 rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 text-center">
          <p className="text-sm font-medium text-indigo-300 uppercase tracking-widest">Kategori Teratas</p>
          <div 
            className="mx-auto mt-4 flex size-16 items-center justify-center rounded-2xl shadow-lg"
            style={{ backgroundColor: getCategoryColor(topCategory.category_name) }}
          >
             <Trophy className="size-8 text-white" />
          </div>
          <h2 className="mt-4 text-3xl font-bold">{topCategory.category_name}</h2>
          <p className="mt-1 text-sm text-indigo-200">Mendominasi {topCategory.percentage}% dari minggumu!</p>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white/5 p-5 backdrop-blur-sm border border-white/10">
          <Zap className="mb-2 size-5 text-amber-400" />
          <p className="text-2xl font-bold text-white">{stats.total_entries}</p>
          <p className="text-xs font-medium text-indigo-200">Total Entri</p>
        </div>
        <div className="rounded-2xl bg-white/5 p-5 backdrop-blur-sm border border-white/10">
          <Calendar className="mb-2 size-5 text-emerald-400" />
          <p className="text-2xl font-bold text-white">Rabu</p>
          <p className="text-xs font-medium text-indigo-200">Paling Produktif</p>
        </div>
      </div>

      {/* The AI Narrative */}
      <div className="rounded-2xl bg-linear-to-r from-indigo-500/20 to-purple-500/20 p-6 backdrop-blur-md border border-indigo-500/30">
        <p className="text-sm font-medium leading-relaxed text-indigo-100">
          "{recap.narrative}"
        </p>
      </div>
    </div>
  );
};