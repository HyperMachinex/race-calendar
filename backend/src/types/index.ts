import { Request } from 'express';

// Event Types
export interface IEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  categoryId: string;
  location?: string;
  color?: string;
  isAllDay?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateEventDTO {
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  categoryId: string;
  location?: string;
  color?: string;
  isAllDay?: boolean;
}

export interface UpdateEventDTO extends Partial<CreateEventDTO> {}

// Category Types
export interface ICategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
  description?: string;
  isDefault: boolean;
}

export interface CreateCategoryDTO {
  name: string;
  color: string;
  icon?: string;
  description?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Query Types
export interface EventQuery {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// Auth Types (for future implementation)
export interface IUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: IUser;
}
