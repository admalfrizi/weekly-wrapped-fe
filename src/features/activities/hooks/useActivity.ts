import { createActivity, fetchActivity, fetchCategories } from "@/api/activity_api";
import { useFetch, useMutate } from "@/lib/query";
import { PaginationDataResponse } from "@/types/response";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CategoryOption } from "../components/activity-form";

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
        () => fetchActivity(params),
        {
            placeholderData: keepPreviousData
        }
    )
}

export function useCategories() {
    return useQuery({
        queryKey: activityKeys.categoriesOption(),
        queryFn: async () => fetchCategories(),
    })
}

export function useCreateActivity() {
    return useMutate<Activity, ActivityDataRequest>(
        (params) => createActivity(params)
    )
}