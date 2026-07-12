import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { ActivityForm, CategoryOption } from "./activity-form";

interface ActivityFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    activity?: Activity | null;
    categories: CategoryOption[];
}

export function ActivityFormDialog({open, onOpenChange, activity, categories}: ActivityFormDialogProps) {
    const isEditMode = Boolean(activity);
    const handleSuccess = () => { 
        toast.success(`Data buku telah berhasil  ${isEditMode ? "disimpan" : "dibuat"} !`, {
            closeButton: true
        })
        onOpenChange(false)
    };
    const handleCancel = () => { 
        toast.error(`Ada kesalahan pada data buku anda !`, {
            closeButton: true
        })
        onOpenChange(false) 
    };
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">{isEditMode ? "Ubah Data Aktivitas" : "Tambah Aktivitas Baru"}</DialogTitle>
                    <DialogDescription>
                        {isEditMode ? "Melakukan perubahan pada data aktivitas" : "Menambahkan nama data aktivitas baru"}
                    </DialogDescription>
                </DialogHeader>
                <ActivityForm 
                    activity={activity} 
                    isEditMode={isEditMode} 
                    onSuccess={handleSuccess} 
                    onCancel={handleCancel}
                    categories={categories}
                />
            </DialogContent>
        </Dialog>
    )
}