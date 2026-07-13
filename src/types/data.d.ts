interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

interface Activity {
  id: string;
  value: number;
  note: string;
  category: {
    id: string;
    name: string;
  };
  occurred_at?: string;
  created_at?: string;
}

interface WeeklyRecap {
  id: string;
  user_id: string;
  week_start: string;
  week_end: string;
  slug: string;
  narrative: string;
  stats_snapshot: DashboardData;
  created_at: string;
}