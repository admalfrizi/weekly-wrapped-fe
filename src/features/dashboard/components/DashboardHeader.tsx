import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  profileName?: string;
  weekNumber?: number;
  totalEntries?: number;
  onGenerate: () => void;
  isPending?: boolean;
}

export const DashboardHeader = ({ profileName, weekNumber, totalEntries,onGenerate, isPending }: DashboardHeaderProps) => {
  return (
    <section className="mb-8 flex w-full flex-col gap-4 border-b border-neutral-200 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Halo, {profileName}</p>
        <h3 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
          Minggu {weekNumber || '-'} · 13-19 Jul 2026
        </h3>
        <p className="mt-1 text-sm text-neutral-500">
          {totalEntries || 0} entri tercatat · 2 hari lagi sebelum recap otomatis di-generate.
        </p>
      </div>
      <div className="flex gap-2">
        <Button 
          className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          onClick={onGenerate}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
          {isPending ? 'Generating...' : 'Generate recap'}
        </Button>
      </div>
    </section>
  );
};