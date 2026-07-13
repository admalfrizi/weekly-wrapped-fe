import { Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  profileName?: string;
  weekNumber?: number;
  totalEntries?: number;
}

export const DashboardHeader = ({ profileName, weekNumber, totalEntries }: DashboardHeaderProps) => {
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
        <button className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
          <Sparkles className="size-4" /> Generate recap
        </button>
      </div>
    </section>
  );
};