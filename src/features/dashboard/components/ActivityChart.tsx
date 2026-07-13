import { useMemo } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getCategoryColor } from "@/lib/utils";

interface ActivityChartProps {
  chartData: any[];
  compositions: any[];
}

export const ActivityChart = ({ chartData, compositions }: ActivityChartProps) => {
  const rechartsData = useMemo(() => {
    const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
    return days.map(dayName => {
      const dayData = chartData.filter(d => d.day_name === dayName);
      const dataPoint: any = { day_name: dayName };
      dayData.forEach(d => {
        dataPoint[d.category_name] = d.total_value;
      });
      return dataPoint;
    });
  }, [chartData]);

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 md:col-span-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h4 className="text-base font-semibold text-neutral-900">Aktivitas per hari</h4>
          <p className="text-xs text-neutral-500">Menit aktivitas / Nilai</p>
        </div>
        <div className="flex gap-4 text-xs text-neutral-600">
           {compositions.slice(0,3).map(comp => (
              <span key={comp.category_name} className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm" style={{ backgroundColor: getCategoryColor(comp.category_name) }} />
                {comp.category_name}
              </span>
           ))}
        </div>
      </div>
      <div className="h-64 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rechartsData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
            <XAxis dataKey="day_name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#737373' }} dy={10} />
            <Tooltip cursor={{ fill: '#f5f5f5' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            {compositions.map(comp => (
              <Bar
                key={comp.category_name}
                dataKey={comp.category_name}
                fill={getCategoryColor(comp.category_name)}
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};