import { register } from "module";
import { post } from "./apiClient";
import { LoginDataRequest, RegisterDataRequest } from "@/types/params";
import { AUTH_PATH } from "@/constant/services";

export const authApi = {
    login: async (loginData?: LoginDataRequest) => await post<User>(
        AUTH_PATH.LOGIN_URL, 
        {
            loginData
        }
    ),
    register: async (registerData?: RegisterDataRequest) => await post<User>(
        AUTH_PATH.REGISTER_URL,
        {
            registerData
        }
    )
}