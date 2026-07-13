"use client"

import { fetchProfileClient } from "@/api/auth_api"
import { fetchWeeklyDashboard } from "@/api/dashboard_api"
import { useFetch } from "@/lib/query"
import { DashboardData } from "@/types/dashboard"
import { PaginationDataResponse } from "@/types/response"

export const dashboardKeys = {
  all: ['profile'] as const,
  detail: () => ['profile', 'detail'] as const,
  weekly: ['weekly'] as const
}

export const useProfile = () => {
  return useFetch<PaginationDataResponse<User>>(
    dashboardKeys.detail(),
    () => fetchProfileClient()
  )
}

export const useWeeklyData = (
  params: WeeklyDashboardRequest
) => {
  return useFetch<PaginationDataResponse<DashboardData>>(
    dashboardKeys.weekly,
    () => fetchWeeklyDashboard(params)
  )
}