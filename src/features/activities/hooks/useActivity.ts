import { useFetch } from "@/lib/query";
import { PaginationDataResponse } from "@/types/response";
import { keepPreviousData } from "@tanstack/react-query";

export const activityKeys = {
    all: () => ["activity"] as const, 
    list: (params?: PaginatedDataRequest) => [...activityKeys.all(), "list", params] as const,
    categoriesOption: () => ["categories"],
    detail: (id: number) => ["activity", id] as const
};

export async function fetchActivity(params: PaginatedDataRequest) {
  const { page, limit } = params;
  const res = await fetch(`/api/activity?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch activity')

  const data = await res.json()
  return data
}

export function useActivity(
    params: PaginatedDataRequest
) {
    return useFetch<PaginationDataResponse<Activity[]>>(
        activityKeys.list(params),
        () => fetchActivity(params),
        {
            placeholderData: keepPreviousData
        }
    )
}