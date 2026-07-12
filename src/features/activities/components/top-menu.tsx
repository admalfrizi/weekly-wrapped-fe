import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import React from 'react';

const TopMenu = ({...props}) => {
    return (
         <Card className="w-full bg-white rounded-xl p-6 flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between gap-x-6">
                <div className='flex flex-col align-center'>
                    <h1 className='font-bold text-xl'>
                        Aktivitas Anda
                    </h1>
                </div>
                <Button className="py-5" onClick={props.openCreateForm}>
                    Tambah Data
                </Button>
            </div>
         </Card>
    );
};

export default TopMenu;