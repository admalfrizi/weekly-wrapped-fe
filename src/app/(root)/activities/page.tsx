'use client';

import { DataTable } from '@/components/data-tables/data-table';
import { activityColumns } from '@/features/activities/components/activity-column';
import { useActivity } from '@/features/activities/hooks/useActivity';
import { PaginationState } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { isError } from 'util';

const ActivitiesPage = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const params: PaginatedDataRequest = {
        page: pagination?.pageIndex,
        limit: pagination?.pageSize
    }

    const { data, isLoading, isError } = useActivity(params);
    const meta = useMemo(() => data?.meta, [data]);

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
        () => activityColumns(),
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
        </div>
    );
};

export default ActivitiesPage;