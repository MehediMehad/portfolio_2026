// Generic API Response
export interface FetchResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    meta?: TMeta;
    data: T;
}

// Pagination Meta
export interface TMeta {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}