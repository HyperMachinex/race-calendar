'use client';

import { useCategories as useCategoriesContext } from '@/context/categories-context';

/**
 * Hook to access categories context
 * Re-export for convenience
 */
export const useCategories = useCategoriesContext;
