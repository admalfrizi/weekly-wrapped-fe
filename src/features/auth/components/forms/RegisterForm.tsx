"use client"

import { FormInput } from "@/components/input/FormInput"
import { RegisterDataValues, RegisterData } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserPlus } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useRegister } from "../../hooks/useAuth"
import { PasswordRegisterInput } from "../input/PasswordRegisterInput"

interface RegisterFormProps {
    onSuccess: () => void;
    onError: (message: string) => void;
}

export default function RegisterForm({ onSuccess, onError }: RegisterFormProps) {

    const { mutate: onRegister, isPending } = useRegister();

    const { 
        control, 
        handleSubmit
    } = useForm<RegisterDataValues>({
        resolver: zodResolver(RegisterData),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        }
    }) 

    const onSubmit = (data: RegisterDataValues) => {
        onRegister(data, {
            onSuccess: onSuccess,
            onError(error) {
                onError(error.message)
            },
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <FormInput<RegisterDataValues>
                        control={control}
                        name="name" 
                        label={"Name"} 
                        type="name"
                        isPending={isPending} 
                        placeholder="John Fox"
                    />
                    <FormInput<RegisterDataValues>
                        control={control}
                        name="username" 
                        label={"Username"} 
                        type="name"
                        isPending={isPending} 
                        placeholder="@johnfox"
                    />
                    <FormInput<RegisterDataValues>
                        control={control}
                        name="email" 
                        label={"Email"} 
                        type="email"
                        isPending={isPending} 
                        placeholder="email@example.com"
                    />
                    <PasswordRegisterInput<RegisterDataValues> 
                        control={control}
                        name="password"
                        isPending={isPending}
                    />
                    <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
                        <UserPlus className="size-4" /> Buat akun
                    </button>
                    <p className="pt-1 text-center text-xs text-neutral-500">
                        Sudah punya akun? <span className="font-medium text-neutral-900 underline underline-offset-2">
                            <Link href="/login">
                                Login Disini
                            </Link>
                        </span>
                    </p>
                </div>
            </form>
        </>
    )
}