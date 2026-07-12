interface User {
  id: string;
  name: string;
  username: string;
  email: string;
}

interface Activity {
  id: string;
  category: string;
  value: string;
  note: string;
  category: {
    id: string;
    name: string;
  };
  occurred_at?: string;
  created_at?: string;
}