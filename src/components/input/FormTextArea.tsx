import { Controller, FieldValues, Path, type Control } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";


interface FormTextAreaProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    isPending: boolean;
    placeholder?: string;
}

export function FormTextArea<T extends FieldValues>({ 
    control, 
    name, 
    label, 
    isPending,
    placeholder = "Pilih opsi"
}: FormTextAreaProps<T> ) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>
                        {label}
                    </FieldLabel>
                    <Textarea
                        id={name}
                        disabled={isPending}
                        aria-invalid={fieldState.invalid}
                        value={field.value === undefined ? "" : field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    {fieldState.invalid && fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    )
}