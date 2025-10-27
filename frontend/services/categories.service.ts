import { api } from './api';

export interface Category {
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

export const categoriesService = {
  getAll: async () => {
    return api.get<Category[]>('/categories');
  },

  getById: async (id: string) => {
    return api.get<Category>(`/categories/${id}`);
  },

  create: async (category: CreateCategoryDTO) => {
    return api.post<Category>('/categories', category);
  },

  update: async (id: string, category: Partial<CreateCategoryDTO>) => {
    return api.patch<Category>(`/categories/${id}`, category);
  },

  delete: async (id: string) => {
    return api.delete(`/categories/${id}`);
  },
};
