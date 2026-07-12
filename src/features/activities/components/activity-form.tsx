import { FormDate } from "@/components/input/FormDate";
import { FormInput } from "@/components/input/FormInput";
import { FormSelect } from "@/components/input/FormSelect";
import { FormTextArea } from "@/components/input/FormTextArea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ActivitiesData, ActivitiesDataValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface CategoryOption {
    id: string;
    name: string;
}

interface ActivityFormProps {
    activity?: Activity | null;
    isEditMode: boolean;
    categories: CategoryOption[];
    onSuccess: () => void;
    onCancel: () => void;
}

export function ActivityForm({activity, isEditMode, categories, onSuccess, onCancel} : ActivityFormProps) {
    const { 
        control, 
        handleSubmit, 
        reset
    } = useForm<ActivitiesDataValues>({
        resolver: zodResolver(ActivitiesData),
        defaultValues: {
            category_id: isEditMode && activity ? activity.category.id : undefined, 
            value: "", 
            note: "", 
            occured_at: "", 
        }
    });

    useEffect(() => {
        if (activity) {
            reset({
                category_id: activity.category.id, 
                value: activity.value, 
                note: activity.note, 
                occured_at: activity.occurred_at, 
            });
        } else {
            reset({
                category_id: "", 
                value: "", 
                note: "", 
                occured_at: "", 
            });
        }
    }, [activity, categories, reset]);

    const onSubmit = (data: ActivitiesDataValues) => {

    }
    
    return (
        <div className="flex items-center justify-center mt-2">
            <div className="w-full bg-(--surface-2) rounded-[12px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative w-full">
                        {/* <FormSelect /> */}
                        <FormSelect
                            control={control}
                            name="category_id"
                            label="Kategori"
                            placeholder="Pilih Kategori"
                            isPending={isPending}
                            options={categories}
                        />
                        <FormInput 
                            control={control}
                            name="value" 
                            label={"Penulis Buku"} 
                            isPending={isPending}                        
                        />
                        <FormTextArea 
                            control={control}
                            name="value" 
                            label={"Penulis Buku"} 
                            isPending={isPending}  
                        />
                        <FormDate 
                            control={control}
                            name="occured_at" 
                            label="Tanggal Publikasi" 
                            isPending={isPending}                        
                        />
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-0">Cancel</button>
                            <button className="px-4 h-9 bg-(--bg-accent) text-(--text-accent) border border-(--border-accent) rounded-(--radius) text-[14px] font-medium">
                                Save activity
                            </button>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    )
}