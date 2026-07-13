import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getCategoryColor = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case 'coding': return '#10b981';   // Emerald
    case 'workout': return '#f43f5e';  // Rose
    case 'reading': return '#0ea5e9';  // Sky
    case 'spending': return '#f59e0b'; // Amber
    case 'working': return '#3b82f6';  // Blue
    case 'gaming': return '#8b5cf6';   // Purple
    default: return '#94a3b8';         // Slate (Fallback)
  }
};