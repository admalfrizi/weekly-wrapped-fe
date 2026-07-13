import { apiClient, apiForAuth } from "@/lib/axios";
import { AUTH_PATH } from "@/constant/services";

export async function login(params?: LoginDataRequest) {
    const res = await apiForAuth.post<User>(AUTH_PATH.LOGIN_URL, params)
    return res
}

export async function register(params?: RegisterDataRequest) {
    const res = await apiForAuth.post<User>(AUTH_PATH.REGISTER_URL, params)
    return res
}