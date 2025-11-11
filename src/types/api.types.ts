// src/types/api.types.ts
export interface ApiError {
  message: string;
  statusCode?: number;
  details?: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface SearchParams extends PaginationParams {
  name?: string;
}