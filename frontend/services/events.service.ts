import { api } from './api';

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date | string;
  startTime?: string;
  endTime?: string;
  categoryId: string;
  location?: string;
  color?: string;
  isAllDay?: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateEventDTO {
  title: string;
  description?: string;
  date: Date | string;
  startTime?: string;
  endTime?: string;
  categoryId: string;
  location?: string;
  color?: string;
  isAllDay?: boolean;
}

export interface EventQuery {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export const eventsService = {
  getAll: async (query?: EventQuery) => {
    const params = new URLSearchParams();
    if (query?.categoryId) params.append('categoryId', query.categoryId);
    if (query?.startDate) params.append('startDate', query.startDate);
    if (query?.endDate) params.append('endDate', query.endDate);
    if (query?.search) params.append('search', query.search);

    const queryString = params.toString();
    return api.get<Event[]>(`/events${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id: string) => {
    return api.get<Event>(`/events/${id}`);
  },

  create: async (event: CreateEventDTO) => {
    return api.post<Event>('/events', event);
  },

  update: async (id: string, event: Partial<CreateEventDTO>) => {
    return api.patch<Event>(`/events/${id}`, event);
  },

  delete: async (id: string) => {
    return api.delete(`/events/${id}`);
  },
};
