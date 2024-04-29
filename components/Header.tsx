'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import Avatar from 'react-avatar';
import { useBoardStore } from '@/store/BoardStore';

const Header = () => {

    const [searchString, setSearchString, board] = useBoardStore(state => [
        state.searchString,
        state.setSearchString,
        state.board
    ])

    return (
        <header>
            <div className='flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl'>
                <Image src='https://links.papareact.com/c2cdd5' width={300} height={100} alt='' 
                className='w-44 md:w-56 pb-10 md:pb-0 object-contain'/>

                <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br
                from-cyan-200 to-violet-400 rounded-md filter blur-3xl opacity-50 -z-50'/>
        
                <div className='flex items-center space-x-5 flex-1 justify-end w-full'>
                    <form className='flex items-center space-x-5 bg-white rounded-md px-2 shadow-md flex-1
                    md:flex-initial'>
                        <MagnifyingGlassIcon className='w-6 h-6 text-gray-400'/>
                        <input type='text' placeholder='Search' className='flex-1 outline-none p-2' value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}/>
                        <button hidden type='submit'></button>
                    </form>

                    <Avatar name='Parker Archibald' round size='50' color='#0055D1'/>
                </div>
            </div>
            
        </header>
    )
}

export default Header;