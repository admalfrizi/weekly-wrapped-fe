import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCategoryColor = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'coding': return '#10b981';
    case 'workout': return '#f43f5e';
    case 'reading': return '#0ea5e9'; 
    case 'spending': return '#f59e0b';
    case 'working': return '#3b82f6';
    case 'gaming': return '#8b5cf6';
    default: return '#94a3b8';       
  }
};

export const getMondayOfCurrentWeek = (): string => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  
  const monday = new Date(today);
  monday.setDate(today.getDate() - daysToSubtract);
  
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, '0');
  const day = String(monday.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};