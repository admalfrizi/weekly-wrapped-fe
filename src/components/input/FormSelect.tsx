import { Controller, FieldValues, Path, type Control } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";

interface Option {
    id: number | string;
    name: string;
}

interface FormSelectProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    isPending: boolean;
    placeholder?: string;
    options: Option[];
}

export function FormSelect<T extends FieldValues>({ 
    control, 
    name, 
    label, 
    isPending,
    placeholder = "Pilih opsi", 
    options 
}: FormSelectProps<T> ) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>
                        {label}
                    </FieldLabel>
                    <select
                        id={name}
                        disabled={isPending}
                        aria-invalid={fieldState.invalid}
                        value={field.value === undefined ? "" : field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value={0} disabled>
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>

                    {fieldState.invalid && fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}