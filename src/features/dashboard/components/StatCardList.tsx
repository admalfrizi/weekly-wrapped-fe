import { Activity, BookOpen, Briefcase, Code2, Flame, Gamepad2, Wallet } from "lucide-react";
import { getCategoryColor } from "@/lib/utils";

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'coding': return <Code2 className="size-5" strokeWidth={2} />;
    case 'workout': return <Flame className="size-5" strokeWidth={2} />;
    case 'reading': return <BookOpen className="size-5" strokeWidth={2} />;
    case 'spending': return <Wallet className="size-5" strokeWidth={2} />;
    case 'working': return <Briefcase className="size-5" strokeWidth={2} />;
    case 'gaming': return <Gamepad2 className="size-5" strokeWidth={2} />;
    default: return <Activity className="size-5" strokeWidth={2} />;
  }
};

interface StatCardListProps {
  cards: any[];
}

export const StatCardList = ({ cards }: StatCardListProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((s, idx) => {
        const catColor = getCategoryColor(s.category_name);
        
        return (
          <div key={idx} className="rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div 
                className="grid size-9 place-items-center rounded-lg bg-neutral-50 text-white"
                style={{ backgroundColor: `${catColor}` }}
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
        );
      })}
    </div>
  );
};