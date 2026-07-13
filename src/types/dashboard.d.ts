export interface StatCard {
  category_name: string;
  icon?: string | null;
  current_total: number;
  unit: string;
  trend_percent: number;
}

export interface DailyActivity {
  date: string;
  day_name: string;
  category_name: string;
  total_value: number;
}

export interface CategoryComposition {
  category_name: string;
  color_hex?: string | null;
  percentage: number;
}

interface DashboardData {
  week_number: number;
  total_entries: number;
  cards: StatCard[];
  chart_data: DailyActivity[];
  compositions: CategoryComposition[];
  insight_text: string;
}