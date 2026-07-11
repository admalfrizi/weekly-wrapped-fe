import Sidebar from '@/components/navbar/Sidebar';
import React, { ReactNode } from 'react';
import { QueryProviders } from '../query-providers';
import { cookies } from 'next/headers';

const MainLayout = async ({children}: {children: ReactNode}) => {
    return (
        <div className='flex min-h-screen flex-col md:flex-row'>
            <Sidebar />
            <main className="md:ml-64 w-full min-h-screen relative p-6 md:p-10">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;