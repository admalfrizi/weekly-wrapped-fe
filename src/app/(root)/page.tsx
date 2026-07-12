import { BookOpen, Code2, Flame, Plus, Sparkles, Wallet } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="w-full mb-8 flex flex-col gap-4 border-b border-neutral-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Halo, Adrian</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">Minggu 47 · 18–24 Nov 2026</h3>
          <p className="mt-1 text-sm text-neutral-500">18 entri tercatat · 2 hari lagi sebelum recap otomatis di-generate.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800">
            <Sparkles className="size-4" /> Generate recap
          </button>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-4">
        {[
            { c: "Workout", v: "240", u: "min", icon: Flame, delta: "+15%", up: true, accent: "text-rose-600 bg-rose-50" },
            { c: "Reading", v: "92", u: "pages", icon: BookOpen, delta: "+8%", up: true, accent: "text-sky-600 bg-sky-50" },
            { c: "Coding", v: "14", u: "hours", icon: Code2, delta: "+22%", up: true, accent: "text-emerald-600 bg-emerald-50" },
            { c: "Spending", v: "Rp 480k", u: "", icon: Wallet, delta: "-20%", up: false, accent: "text-amber-600 bg-amber-50" },
          ].map((s) => (
            <div key={s.c} className="rounded-xl border border-neutral-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className={`grid size-9 place-items-center rounded-lg ${s.accent}`}>
                  <s.icon className="size-4.5" strokeWidth={2} />
                </div>
                <span className={`text-xs font-medium ${s.up ? "text-emerald-600" : "text-rose-600"}`}>
                  {s.delta}
                </span>
              </div>
              <p className="mt-5 text-xs font-medium uppercase tracking-wider text-neutral-500">{s.c}</p>
              <p className="mt-1 text-2xl font-semibold text-neutral-900">
                {s.v}
                {s.u && <span className="ml-1 text-sm font-normal text-neutral-500">{s.u}</span>}
              </p>
              <p className="mt-1 text-xs text-neutral-400">vs minggu lalu</p>
            </div>
          ))}
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 md:col-span-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h4 className="text-base font-semibold text-neutral-900">Aktivitas per hari</h4>
              <p className="text-xs text-neutral-500">Menit aktivitas (Workout · Reading · Coding)</p>
            </div>
            <div className="flex gap-4 text-xs text-neutral-600">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-rose-500" />Workout</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-sky-500" />Reading</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-sm bg-emerald-500" />Coding</span>
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
              {[
                { d: "Sen", w: 30, r: 20, c: 60 },
                { d: "Sel", w: 50, r: 15, c: 70 },
                { d: "Rab", w: 40, r: 30, c: 95 },
                { d: "Kam", w: 20, r: 40, c: 50 },
                { d: "Jum", w: 60, r: 25, c: 80 },
                { d: "Sab", w: 80, r: 55, c: 30 },
                { d: "Min", w: 25, r: 65, c: 15 },
              ].map((day) => (
                <div key={day.d} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end justify-center gap-1">
                    <div className="w-2.5 rounded-t bg-rose-500" style={{ height: `${day.w}%` }} />
                    <div className="w-2.5 rounded-t bg-sky-500" style={{ height: `${day.r}%` }} />
                    <div className="w-2.5 rounded-t bg-emerald-500" style={{ height: `${day.c}%` }} />
                  </div>
                  <span className="text-xs text-neutral-500">{day.d}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 border-t border-neutral-100 pt-3 text-xs text-neutral-500">
            Hari paling produktif: <span className="font-medium text-neutral-800">Rabu</span> (9.5 jam total)
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-6 md:col-span-4">
          <h4 className="text-base font-semibold text-neutral-900">Komposisi kategori</h4>
          <p className="text-xs text-neutral-500">Berdasarkan waktu tercatat</p>
          <div className="mt-5 space-y-4">
            {[
              { c: "Coding", pct: 42, color: "bg-emerald-500" },
              { c: "Workout", pct: 28, color: "bg-rose-500" },
              { c: "Reading", pct: 18, color: "bg-sky-500" },
              { c: "Spending", pct: 12, color: "bg-amber-500" },
            ].map((r) => (
              <div key={r.c}>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span className="font-medium text-neutral-800">{r.c}</span>
                  <span>{r.pct}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                  <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-lg bg-neutral-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">Insight</p>
            <p className="mt-1 text-sm text-neutral-700">Coding mendominasi minggu ini — hampir setengah dari total aktivitas.</p>
          </div>
        </div>
      </div>
    </>
  );
}
