import { getCategoryColor } from "@/lib/utils";

interface CompositionInsightProps {
  compositions: any[];
  insightText: string;
}

export const CompositionInsight = ({ compositions, insightText }: CompositionInsightProps) => {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 md:col-span-4">
      <h4 className="text-base font-semibold text-neutral-900">Komposisi kategori</h4>
      <p className="text-xs text-neutral-500">Berdasarkan waktu tercatat</p>
      
      <div className="mt-5 space-y-4">
        {compositions.map((r) => {
          const catColor = getCategoryColor(r.category_name);
          return (
            <div key={r.category_name}>
              <div className="flex justify-between text-xs text-neutral-600">
                <span className="font-medium text-neutral-800">{r.category_name}</span>
                <span>{r.percentage}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ width: `${r.percentage}%`, backgroundColor: catColor }} 
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 rounded-lg bg-neutral-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Insight</p>
        <p className="mt-1 text-sm text-neutral-700">
          {insightText || "Belum ada insight yang tersedia."}
        </p>
      </div>
    </div>
  );
};