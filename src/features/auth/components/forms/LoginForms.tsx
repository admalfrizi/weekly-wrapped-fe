"use client"

import { LoginData, LoginDataValues } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormInput } from "../../../../components/input/FormInput"
import { Button } from "@/components/ui/button"
import { useLogin } from "../../hooks/useAuth"
import Link from "next/link"

interface LoginFormProps {
    onSuccess: () => void;
    onError: (message: string) => void;
}

export default function LoginForm({ onSuccess, onError }: LoginFormProps) {
    const { mutate: onLogin, isPending } = useLogin();

    const { 
        control, 
        handleSubmit
    } = useForm<LoginDataValues>({
        resolver: zodResolver(LoginData),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = (data: LoginDataValues) => {
        onLogin(data, {
            onSuccess,
            onError(error) {
                onError(error.message)
            },
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <FormInput<LoginDataValues>
                        control={control}
                        name="email" 
                        label={"Email"} 
                        type="email"
                        isPending={isPending} 
                        placeholder="email@example.com"
                    />
                    <FormInput<LoginDataValues>
                        control={control}
                        name="password" 
                        label={"Password"} 
                        isPending={isPending}
                        type="password"
                        placeholder="••••••••"
                    />
                    <Button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
                        Login
                    </Button>
                    <div className="relative py-1 text-center">
                        <span className="absolute inset-x-0 top-1/2 z-0 h-px bg-neutral-200" />
                        <span className="relative bg-white px-2 text-[10px] font-medium uppercase tracking-widest text-neutral-400">atau</span>
                    </div>
                    <Button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50">
                        Lanjutkan dengan Google
                    </Button>
                    <p className="pt-1 text-center text-xs text-neutral-500">
                        Belum punya akun? <span className="font-medium text-neutral-900 underline underline-offset-2">
                            <Link href="/register">
                                Daftar
                            </Link>
                            
                        </span>
                    </p>
                </div>
            </form>
        </>
        
    )
}