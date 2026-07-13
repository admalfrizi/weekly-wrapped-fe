'use client';

import { ActivityChart } from "@/features/dashboard/components/ActivityChart";
import { CompositionInsight } from "@/features/dashboard/components/CompositionInsight";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { StatCardList } from "@/features/dashboard/components/StatCardList";
import { useProfile, useWeeklyData } from "@/features/dashboard/hooks/useDashboard";
import { getMondayOfCurrentWeek } from "@/lib/utils";
import { useMemo } from "react";

export default function Home() {
  const params = useMemo(() => ({
    startDate: getMondayOfCurrentWeek()
  }), []);

  const { data: weeklyData } = useWeeklyData(params);
  const { data: profileResponse } = useProfile();
  
  const dashboard = weeklyData?.data;

  return (
    <>
      <DashboardHeader 
        profileName={profileResponse?.data?.name} 
        weekNumber={dashboard?.week_number}
        totalEntries={dashboard?.total_entries}
      />
      <StatCardList cards={dashboard?.cards || []} />
      <div className="mt-6 grid gap-6 md:grid-cols-12">
        <ActivityChart 
          chartData={dashboard?.chart_data || []} 
          compositions={dashboard?.compositions || []} 
        />
        <CompositionInsight 
          compositions={dashboard?.compositions || []} 
          insightText={dashboard?.insight_text || ""} 
        />
      </div>
    </>
  );
}