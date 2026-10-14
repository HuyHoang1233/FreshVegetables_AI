export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errorCode?: string;
  details?: string[];
}

export interface PageResponse<T> {
  content: T[];
  page?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
