import { RECAP_PATH } from "@/constant/services";
import { apiClientToBE } from "@/lib/axios";
import { PaginationDataResponse } from "@/types/response";

export async function generateRecap(params?: GenerateRecapRequest) {
  const res = await apiClientToBE.post<WeeklyRecap>(RECAP_PATH.GENERATE, { params });
  return res;
};

export async function getRecap(slug: string) {
  const { data } = await apiClientToBE.get<PaginationDataResponse<WeeklyRecap>>(RECAP_PATH.RECAP_SLUG(slug));
  return data;
};