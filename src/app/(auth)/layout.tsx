import { Card } from '@/components/ui/card';
import React, { ReactNode } from 'react';

const AuthLayout = ({children}: {children: ReactNode}) => {
    return (
        <main className='flex min-h-screen items-center justify-center px-4 py-10'>
            <Card className='w-full max-w-2xl rounded-[10px] border px-4 py-10 shadow-md sm:min-w=[520px] sm:px-8'>
                {children}
            </Card>
        </main>
    );
};

export default AuthLayout;