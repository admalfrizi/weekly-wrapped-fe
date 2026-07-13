import { generateRecap, getRecap } from "@/api/recap_api"
import { useFetch, useMutate } from "@/lib/query"
import { PaginationDataResponse } from "@/types/response"

export const useGenerateRecap = () => {
    return useMutate<PaginationDataResponse<WeeklyRecap>, GenerateRecapRequest>(
        (params) => generateRecap(params)
    )
}

export function useRecap(
    slug: string
) {
    return useFetch<PaginationDataResponse<WeeklyRecap>>(
        ['recap'] as const,
        () => getRecap(slug)
    )
}