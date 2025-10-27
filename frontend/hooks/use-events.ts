'use client';

import { useEvents as useEventsContext } from '@/context/events-context';

/**
 * Hook to access events context
 * Re-export for convenience
 */
export const useEvents = useEventsContext;
