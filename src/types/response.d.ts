export interface ApiSuccessResponse {
  status: boolean;
  message: string;
}

export interface Meta {
  page : number, 
  limit : number, 
  totalPages: number,
  totalCount: number, 
}

interface PaginationDataResponse<T> extends ApiSuccessResponse {
  data: T;
  meta?: Meta;
}