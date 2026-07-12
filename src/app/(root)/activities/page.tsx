'use client';

import { DataTable } from '@/components/data-tables/data-table';
import { PaginationState } from '@tanstack/react-table';
import React, { useState } from 'react';
import { isError } from 'util';

const ActivitiesPage = () => {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const { data, isLoading, isError } = usePaginatedUsers(
        pagination.pageIndex,
        pagination.pageSize
    );

    return (
        <div className="container mx-auto py-8">
            <div className='flex flex-col gap-y-5'>
                <DataTable
                    columns={columns} 
                    data={books as Activity[]}  
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