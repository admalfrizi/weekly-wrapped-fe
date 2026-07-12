import { createActivity, deleteActivity, fetchActivity, fetchCategories, updateActivity } from "@/api/activity_api";
import { useFetch, useMutate } from "@/lib/query";
import { PaginationDataResponse } from "@/types/response";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
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
    const queryClient = useQueryClient();
    return useMutate<Activity, ActivityDataRequest>(
        (params) => createActivity(params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: activityKeys.all()})
            }
        }
    )
}

export function useEditActivity() {
    const queryClient = useQueryClient();
    return useMutate<Activity, UpdateActivityDataRequest>(
        (params) => updateActivity(params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: activityKeys.all()})
            }
        }
    )
}

export function useDeleteActivity() {
    const queryClient = useQueryClient();
    return useMutate<Activity, DeleteActivityRequest>(
        (params) => deleteActivity(params?.id),
        {
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: activityKeys.all()})
            }
        }
    )
}