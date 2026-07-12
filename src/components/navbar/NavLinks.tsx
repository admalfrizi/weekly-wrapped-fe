"use client"

import { sideBarLinks } from '@/constant/sidebarLinks';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const NavLinks = () => {
    const pathName = usePathname();

    const matchingRoutes = sideBarLinks
        .map(({ route }) => route)
        .filter((route) =>
            route === '/'
                ? pathName === '/'
                : pathName === route || pathName?.startsWith(`${route}/`)
        );
    
    const activeRoute = matchingRoutes.sort((a, b) => b.length - a.length)[0];
    
    return (
        <div className='flex flex-col gap-y-2'>
            {sideBarLinks.map(({ icon: Icon, route, label }) => {
                const isActive = route === activeRoute;

                return (
                    <Link 
                        href={route}  
                        key={label}
                        className={cn(isActive 
                            ? "bg-gray-900 text-white"
                            : "text-gray-500",
                            "flex items-center justify-start gap-4 p-4 hover:bg-gray-900",
                            "hover:text-white"
                        )}
                    >
                        <Icon size={20} />
                        <p className={cn(isActive ? "base-bold" : "base-medium")}>{label}</p>
                    </Link>
                )
            })}
        </div>
    );
};

export default NavLinks;