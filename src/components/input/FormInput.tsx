import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps<T extends FieldValues>{
    control: Control<T>;
    name: Path<T>;
    label: string;        
    isPending: boolean;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    min?: number | string;
}

export function FormInput<T extends FieldValues>({ 
    control,
    name, 
    label, 
    isPending,
    placeholder, 
    type = "text", 
    min 
}: FormInputProps<T>) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const currentType = isPasswordField 
        ? (showPassword ? "text" : "password") 
        : type;
        
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>
                        {label}
                    </FieldLabel>
                    <div className="relative w-full">
                        <Input
                            className={`p-5 ${isPasswordField ? "pr-12" : ""}`}
                            {...field}
                            id={name}
                            type={currentType}
                            min={min}
                            value={field.value === undefined ? "" : field.value}
                            aria-invalid={fieldState.invalid}
                            placeholder={placeholder}
                            autoComplete="off"
                            disabled={isPending}
                            onChange={(e) => {
                                if (type === "number") {
                                    const value = e.target.value === "" ? "" : Number(e.target.value);
                                    field.onChange(value);
                                } else {
                                    field.onChange(e.target.value);
                                }
                            }}
                        />
                        {isPasswordField && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                disabled={isPending}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        )}
                    </div>
                    
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}