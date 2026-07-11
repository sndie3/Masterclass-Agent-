import React from 'react'

interface DashboardCardProps {
    title: string,
    walletData: number
    children?: React.ReactNode
}

export default function DashboardCard({
    title,
    walletData,
    children
}: DashboardCardProps) {

    return (
        <div className='flex'>
            <div className='flex flex-col justify-center'>
                <p className='text-sm'>{title}</p>
                <p className='py-2 text-2xl text-white'> {(walletData).toLocaleString()}</p>
            </div>
            <div className='flex place-items-center px-4'>
                {children}
            </div>
        </div>
    )
}