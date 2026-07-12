import { CONFIG } from "@/config";
import { ACTIVITIES_PATH } from "@/constant/services";
import { CategoryOption } from "@/features/activities/components/activity-form";
import { apiClient } from "@/lib/axios-server";
import { PaginationDataResponse } from "@/types/response";

export async function fetchActivity(params: PaginatedDataRequest) {
  const { page, limit } = params;
  const res = await fetch(`/api/activity?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error('Failed to fetch activity')

  const data = await res.json()
  return data
}

export async function fetchCategories() {
  const res = await apiClient.get<PaginationDataResponse<CategoryOption[]>>(ACTIVITIES_PATH.ACTIVITY_CATEGORIES)
  return res.data
}

export async function createActivity(params?: ActivityDataRequest) {
  const res = await apiClient.post("/activity", params)
  return res
}