import { RECAP_PATH } from "@/constant/services";
import { apiClientToBE } from "@/lib/axios";

export async function generateRecap(params?: GenerateRecapRequest) {
  const res = await apiClientToBE.post<WeeklyRecap>(RECAP_PATH.GENERATE, { params });
  return res;
};