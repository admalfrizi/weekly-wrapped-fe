import { ACTIVITIES_PATH } from "@/constant/services";
import { post } from "./apiClient";
import { PaginationDataResponse } from "@/types/response";
import { createApiForBE } from "@/lib/axios-server";

export const activitiesApi = {
    getAllData: async (params?: PaginatedDataRequest) => await createApiForBE().get<PaginationDataResponse<Activity[]>>(
        ACTIVITIES_PATH.ACTIVITY, 
        {
            params
        }
    ),
}