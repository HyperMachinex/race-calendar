import { Category } from '@/types';

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'work',
    name: 'Work',
    color: '#3b82f6',
    icon: 'briefcase',
    description: 'Work-related events and meetings',
    isDefault: true,
  },
  {
    id: 'personal',
    name: 'Personal',
    color: '#10b981',
    icon: 'user',
    description: 'Personal appointments and activities',
    isDefault: true,
  },
  {
    id: 'family',
    name: 'Family',
    color: '#f59e0b',
    icon: 'users',
    description: 'Family events and gatherings',
    isDefault: true,
  },
  {
    id: 'health',
    name: 'Health',
    color: '#ef4444',
    icon: 'heart',
    description: 'Health and fitness activities',
    isDefault: true,
  },
  {
    id: 'education',
    name: 'Education',
    color: '#8b5cf6',
    icon: 'book',
    description: 'Learning and educational activities',
    isDefault: true,
  },
  {
    id: 'social',
    name: 'Social',
    color: '#ec4899',
    icon: 'users',
    description: 'Social events and gatherings',
    isDefault: true,
  },
];
