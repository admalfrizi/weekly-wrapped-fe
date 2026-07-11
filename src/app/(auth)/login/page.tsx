"use client"

import LoginForm from '@/features/auth/components/forms/LoginForms';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const LoginPage = () => {
    const router = useRouter()
    const handleSuccess = () => { 
        toast.success(`Login Berhasil`)
        router.push("/")
    }

    const handleError = (message: string) => {
        toast.error(message, {
            closeButton: true
        })
    }

    return (
        <div className='flex flex-col gap-y-5'>
            <div className="mb-5 flex items-center justify-between">
                <div className='flex flex-col gap-y-2'>
                    <h3 className="text-2xl font-bold text-neutral-900">Sign in</h3>
                    <p className="text-sm text-neutral-500">Masuk ke akunmu</p>
                </div>
                <span className="rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-neutral-600">JWT</span>
            </div>
            <LoginForm
                onSuccess={handleSuccess}
                onError={handleError}
            />
        </div>
    );
};

export default LoginPage;