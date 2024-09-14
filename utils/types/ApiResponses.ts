export interface PaginatedResponse<T> {
    data: T[];
    pagesCount: number;
    currentPage: number;
    type: string;
}
export interface SingleObjectResponse<T> {
    data: T,
}
export interface ErrorResponse {
    data: []
    error: Error
  }
  
  export interface Error {
    status: number
    name: string
    message: string
  }
  