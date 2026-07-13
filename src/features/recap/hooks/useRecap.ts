import { generateRecap } from "@/api/recap_api"
import { useMutate } from "@/lib/query"

export const useGenerateRecap = () => {
    return useMutate<WeeklyRecap, GenerateRecapRequest>(
        (params) => generateRecap(params)
    )
}