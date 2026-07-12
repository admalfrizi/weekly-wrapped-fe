import { activitiesApi } from "@/api/activities_api";
import { useFetch } from "@/lib/query";
import { PaginationDataResponse } from "@/types/response";
import { keepPreviousData } from "@tanstack/react-query";

export const activityKeys = {
    all: () => ["activity"] as const, 
    list: (params?: PaginatedDataRequest) => [...activityKeys.all(), "list", params] as const,
    categoriesOption: () => ["categories"],
    detail: (id: number) => ["activity", id] as const
};

export function useActivity(
    params: PaginatedDataRequest
) {
    return useFetch<PaginationDataResponse<Activity[]>>(
        activityKeys.list(params),
        () => activitiesApi.getAllData(params),
        {
            placeholderData: keepPreviousData
        }
    )
}