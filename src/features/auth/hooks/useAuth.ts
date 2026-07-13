import { login, register } from "@/api/auth_api"
import { useMutate } from "@/lib/query"

export const useLogin = () => {
    return useMutate<User, LoginDataRequest>(
        (loginData) => login(loginData)
    )
}

export const useRegister = () => {
    return useMutate<User, RegisterDataRequest>(
        (registerData) => register(registerData)
    )
}