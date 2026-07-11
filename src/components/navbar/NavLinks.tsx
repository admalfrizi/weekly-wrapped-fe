"use client"

import { sideBarLinks } from '@/constant/sidebarLinks';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const NavLinks = () => {
    return (
        <div>
            {sideBarLinks.map(({ icon: Icon, route, label }) => {

                return (
                    <Link 
                        href={route}  
                        key={label}
                        className={"text-gray-700 flex items-center justify-start gap-4 bg-transparent p-4"}
                    >
                        <Icon size={20} />
                        <p className={""}>{label}</p>
                    </Link>
                )
            })}
        </div>
    );
};

export default NavLinks;