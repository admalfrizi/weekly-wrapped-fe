"use client"

import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { useProfile } from '../hooks/useProfile';

const ProfileCard = () => {
    const { data, isLoading, error } = useProfile();

    return (
        <Card className='py-3'>
            <CardContent className='p-3'>
                <div className='flex flex-col gap-y-2'>
                    <h1 className='font-semibold'>{isLoading ? 'Nama Anda' : data?.name}</h1>
                    <p>{isLoading ? 'Email Anda' : data?.email}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;