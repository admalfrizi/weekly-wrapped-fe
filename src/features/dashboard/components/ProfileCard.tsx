"use client"

import { Card, CardContent } from '@/components/ui/card';
import React from 'react';
import { useProfile } from '../hooks/useDashboard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const getInitials = (name?: string) => {
    if (!name) return '?';
 
    return name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
};

const ProfileCard = () => {
    const { data, isLoading } = useProfile();
    const profileData = data?.data

    return (
        <Card className='py-3'>
            <CardContent className='p-3'>
                <div className='flex items-center gap-x-4'>
                    <Avatar className='h-12 w-12'>
                        <AvatarFallback>
                            {isLoading ? '..' : getInitials(profileData?.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-y-2'>
                        <h1 className='font-semibold'>{isLoading ? 'Nama Anda' : profileData?.name}</h1>
                        <p>{isLoading ? 'Email Anda' : profileData?.email}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProfileCard;