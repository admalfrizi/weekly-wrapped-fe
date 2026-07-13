'use client';

import { useProfile, useWeeklyData } from "@/features/dashboard/hooks/useDashboard";
import { getCategoryColor } from "@/lib/utils";
import { Activity, BookOpen, Briefcase, Code2, Flame, Gamepad2, Sparkles, Wallet } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'coding': return <Code2 className="size-5" strokeWidth={2} />;
    case 'workout': return <Flame className="size-5" strokeWidth={2} />;
    case 'reading': return <BookOpen className="size-5" strokeWidth={2} />;
    case 'spending': return <Wallet className="size-5" strokeWidth={2} />;
    case 'working': return <Briefcase className="size-5" strokeWidth={2} />;
    case 'gaming': return <Gamepad2 className="size-5" strokeWidth={2} />;
    default: return <Activity className="size-5" strokeWidth={2} />; // Fallback icon
  }
};

export default function Home() {
  const params: WeeklyDashboardRequest = {
    startDate: "2026-07-13"
  }

  const { data: weeklyData } = useWeeklyData(params);
  const { data, isLoading } = useProfile();
  const profileData = data?.data

  const dashboard = weeklyData?.data;
  const cards = dashboard?.cards || [];
  const compositions = dashboard?.compositions || [];
  const chartData = dashboard?.chart_data || [];

  const chartWeek = useMemo(() => {
    const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    
    return days.map(dayName => {
      const dayData = chartData.filter(d => d.day_name === dayName);
      
      const categories: Record<string, number> = {};
      dayData.forEach(d => {
        categories[d.category_name] = d.total_value;
      });

      return { day_name: dayName, categories };
    });
  }, [chartData]);

  const maxChartValue = useMemo(() => {
    let max = 1;
    chartData.forEach(d => { if (d.total_value > max) max = d.total_value; });
    return max;
  }, [chartData]);

  return (
    <>
      <section className="mb-8 flex w-full flex-col gap-4 border-b border-neutral-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Halo, Adrian</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            Minggu {dashboard?.week_number || '-'} · 13-19 Jul 2026
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            {dashboard?.total_entries || 0} entri tercatat · 2 hari lagi sebelum recap otomatis di-generate.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            <Sparkles className="size-4" /> Generate recap
          </button>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-4">
        {cards.map((s, idx) => {
          const catColor = getCategoryColor(s.category_name);
          
          return (
            <div key={idx} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between">
              {/* Using the Icon Mapper here! */}
              <div 
                className="grid size-9 place-items-center rounded-lg bg-neutral-50 text-white"
                style={{
                  backgroundColor: `${catColor}`
                }}
              >
                {getCategoryIcon(s.category_name)}
              </div>
              <span className={`text-xs font-medium ${s.trend_percent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {s.trend_percent > 0 ? '+' : ''}{s.trend_percent}%
              </span>
            </div>
            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-neutral-500">{s.category_name}</p>
            <p className="mt-1 text-2xl font-semibold text-neutral-900">
              {s.current_total}
              {s.unit && <span className="ml-1 text-sm font-normal text-neutral-500">{s.unit}</span>}
            </p>
            <p className="mt-1 text-xs text-neutral-400">vs minggu lalu</p>
          </div>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 md:col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h4 className="text-base font-semibold text-neutral-900">Aktivitas per hari</h4>
              <p className="text-xs text-neutral-500">Menit aktivitas / Nilai</p>
            </div>
            <div className="flex gap-4 text-xs text-neutral-600">
               {compositions.slice(0,3).map(comp => (
                  <span key={comp.category_name} className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-sm" style={{ backgroundColor: comp.color_hex || '#cbd5e1' }} />
                    {comp.category_name}
                  </span>
               ))}
            </div>
          </div>
          
          <div className="relative h-56">
            {/* gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-dashed border-neutral-100" />
              ))}
            </div>
            <div className="relative flex h-full items-end gap-3 pt-2">
              {chartWeek.map((day) => (
                <div key={day.day_name} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end justify-center gap-1">
                    {Object.keys(day.categories).length > 0 ? (
                      Object.entries(day.categories).map(([catName, val]) => {
                         const color = compositions.find(c => c.category_name === catName)?.color_hex || '#cbd5e1';
                         const heightPct = Math.min(((val as number) / maxChartValue) * 100, 100);
                         
                         return (
                           <div 
                             key={catName}
                             className="w-2.5 rounded-t" 
                             style={{ height: `${heightPct}%`, backgroundColor: color }} 
                             title={`${catName}: ${val}`}
                           />
                         )
                      })
                    ) : (
                      <div className="w-2.5" />
                    )}
                  </div>
                  <span className="text-xs text-neutral-500">{day.day_name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 md:col-span-4">
          <h4 className="text-base font-semibold text-neutral-900">Komposisi kategori</h4>
          <p className="text-xs text-neutral-500">Berdasarkan waktu tercatat</p>
          
          <div className="mt-5 space-y-4">
            {compositions.map((r) => (
              <div key={r.category_name}>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span className="font-medium text-neutral-800">{r.category_name}</span>
                  <span>{r.percentage}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${r.percentage}%`, backgroundColor: r.color_hex || '#cbd5e1' }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg bg-neutral-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Insight</p>
            {/* Dynamic Insight text from Backend */}
            <p className="mt-1 text-sm text-neutral-700">
              {dashboard?.insight_text || "Belum ada insight yang tersedia."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
