"use client"

import { Control, FieldValues, Path, useWatch } from "react-hook-form";
import { FormInput } from "@/components/input/FormInput";

interface PasswordRegisterInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    isPending?: boolean;
    placeholder?: string;
}

export function PasswordRegisterInput<T extends FieldValues>({
    control,
    name,
    label = "Password",
    isPending = false,
    placeholder = "••••••••"
}: PasswordRegisterInputProps<T>) {
    
    const passwordValue = useWatch({
        control,
        name,
    });

    const calculateStrength = (pass: string) => {
        let score = 0;
        if (!pass) return 0;
        
        if (pass.length >= 8) score += 1;
        if (/[a-zA-Z]/.test(pass)) score += 1;
        if (/[0-9]/.test(pass)) score += 1;
        if (/[^a-zA-Z0-9]/.test(pass)) score += 1;

        return Math.min(score, 4);
    };

    const strength = calculateStrength((passwordValue as string) || "");

    const getStrengthColor = (score: number) => {
        if (score === 1) return "bg-red-500";
        if (score === 2) return "bg-yellow-500";
        if (score >= 3) return "bg-emerald-500";
        return "bg-neutral-200";
    };

    const activeColor = getStrengthColor(strength);

    return (
        <div className="w-full">
            <FormInput<T>
                control={control}
                name={name}
                label={label}
                type="password"
                isPending={isPending}
                placeholder={placeholder}
            />
            
            <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                    <span 
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            strength >= level ? activeColor : "bg-neutral-200"
                        }`} 
                    />
                ))}
            </div>
            
            <p className="mt-1.5 text-[11px] text-neutral-500">
                Min. 8 karakter, kombinasi huruf & angka.
            </p>
        </div>
    );
}