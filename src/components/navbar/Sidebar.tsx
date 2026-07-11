"use client"

import React, { useTransition } from 'react';
import NavLinks from './NavLinks';
import { Button } from '../ui/button';
import { logoutUser } from '@/app/actions/auth';
import { Card, CardContent } from '../ui/card';
import ProfileCard from '@/features/dashboard/components/ProfileCard';

const Sidebar = () => {
    const [isPending, startTransition] = useTransition()
    
    return (
        <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container border-r border-white/5 shadow-md flex flex-col py-6 md:justify-between md:flex z-50" id="SideNavBar">
            <div className="px-6 mb-10">
                <h1 className="font-display-lg text-display-lg text-primary tracking-tighter">Wrapped</h1>
            </div>
            <div className='flex flex-1 flex-col gap-6'>
                <NavLinks />
            </div>
            <div className='flex flex-col gap-6 px-5'>
                <ProfileCard />
                <Button className='w-full' onClick={() => startTransition(() => logoutUser())} >
                    {isPending ? 'Logging out...' : 'Log Out'}
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;