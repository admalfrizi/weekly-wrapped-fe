import { ACTIVITIES_PATH } from "@/constant/services";
import { post } from "./apiClient";
import { PaginationDataResponse } from "@/types/response";

export const activitiesApi = {
    getAllData: async (params?: PaginatedDataRequest) => await post<PaginationDataResponse<Activity[]>>(
        ACTIVITIES_PATH.ACTIVITY, 
        {
            params
        }
    ),
}