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
    id: number;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
}