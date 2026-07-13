import { DASHBOARD_PATH } from "@/constant/services"
import { apiClient } from "@/lib/axios"
import { DashboardData } from "@/types/dashboard"
import { PaginationDataResponse } from "@/types/response"

export async function fetchWeeklyDashboard(params: WeeklyDashboardRequest) {
    const res = await apiClient.get<PaginationDataResponse<DashboardData>>(DASHBOARD_PATH.WEEKLY,{ params })
    return res.data
}