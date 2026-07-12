export interface ApiSuccessResponse {
  status: boolean;
  message: string;
}

export interface Meta {
  page : number, 
  limit : number, 
  total_items: number,
  total_pages: number, 
}

interface PaginationDataResponse<T> extends ApiSuccessResponse {
  data: T;
  meta?: Meta;
}