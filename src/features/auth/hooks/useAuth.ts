import { authApi } from "@/api/auth_api"
import { useMutate } from "@/lib/query"

export const useLogin = () => {
    return useMutate<User, LoginDataRequest>(
        (loginData) => authApi.login(loginData)
    )
}

export const useRegister = () => {
    return useMutate<User, RegisterDataRequest>(
        (registerData) => authApi.register(registerData)
    )
}