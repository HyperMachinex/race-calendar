// Event Types
export interface Event {
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateEventInput {
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

export interface UpdateEventInput extends Partial<CreateEventInput> {}

// Category Types
export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
  description?: string;
  isDefault: boolean;
}

export interface CreateCategoryInput {
  name: string;
  color: string;
  icon?: string;
  description?: string;
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {}

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
