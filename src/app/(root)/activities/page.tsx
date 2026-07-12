'use client';

import { DataTable } from '@/components/data-tables/data-table';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { activityColumns } from '@/features/activities/components/activity-column';
import { CategoryOption } from '@/features/activities/components/activity-form';
import { ActivityFormDialog } from '@/features/activities/components/activity-form-dialog';
import TopMenu from '@/features/activities/components/top-menu';
import { useActivity, useCategories, useDeleteActivity } from '@/features/activities/hooks/useActivity';
import { PaginationState } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { toast } from 'sonner';

const ActivitiesPage = () => {
    const [formOpen, setFormOpen] = useState(false);
    const [editActivity, setEditActivity] = useState<Activity | null>(null);
    const [deleteActivity, setDeleteActivity] = useState<Activity | null>(null);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const params: PaginatedDataRequest = {
        page: pagination?.pageIndex,
        limit: pagination?.pageSize
    }

    const { data, isLoading, isError } = useActivity(params);
    const categoryData: CategoryOption[] = []
    const meta = useMemo(() => data?.meta, [data]);
    const category = useCategories();
    const deleteMutation = useDeleteActivity();

    const openCreateForm = () => {
        setEditActivity(null)
        setFormOpen(true);
    };

    const openEditForm = (activity: Activity) => {
        setEditActivity(activity)
        setFormOpen(true);
    };

    const categories = useMemo(() => {
        if (!category?.data) return [];
        
        return category.data?.data.map((cat: any) => ({
            id: cat.id,
            name: cat.name 
        }));
    }, [categoryData]);

    const activity = useMemo(() => {
        if (!data) return [];

        return data.data.map((rawBook: any) => {
            if (typeof rawBook.category === 'string' || rawBook.category_id) {
                const { category_id, category, ...rest } = rawBook;
                return {
                    ...rest,
                    category: {
                        id: category_id,
                        name: category
                    }
                };
            }
            
            return rawBook;
        });
    }, [data]) as Activity[];

    const columns = useMemo(
        () => activityColumns({
            onEdit: (activity) => openEditForm(activity),
            onDelete: (activity) => setDeleteActivity(activity)
        }),
        []
    );

    const pageCount = useMemo(() => {
        if (meta?.total_pages) return meta.total_pages;
        if (meta?.total_items) return Math.ceil(meta.total_items / pagination.pageSize);
        return -1;
    }, [meta, pagination.pageSize]);

    return (
        <div className="container mx-auto py-8">
            <div className='flex flex-col gap-y-5'>
                <TopMenu openCreateForm={openCreateForm} />
                <DataTable
                    columns={columns} 
                    data={activity as Activity[]}  
                    isLoading={isLoading}
                    isError={isError}
                    manualPagination
                    pageCount={pageCount}
                    pagination={pagination}
                    onPaginationChange={setPagination}              
                />
            </div>
            <ActivityFormDialog open={formOpen} onOpenChange={setFormOpen} activity={editActivity} categories={categories}/>
            <ConfirmDialog
                open={Boolean(deleteActivity)}
                onOpenChange={(open) => !open && setDeleteActivity(null)}
                title="Hapus Aktivitas ini ?"
                description={`Data aktivitas ini akan dihapus selamanya. Yakin beneran mau dihapus ?`}
                isPending={deleteMutation.isPending}
                onConfirm={() => {
                    if (deleteActivity) {
                        deleteMutation.mutate({ id: deleteActivity.id }, {
                            onSuccess: () => { 
                                toast.success("Aktivitas anda telah dihapus")
                                setDeleteActivity(null)
                            },
                        });
                    }
                }}
            />
        </div>
    );
};

export default ActivitiesPage;