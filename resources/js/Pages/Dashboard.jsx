import SearchResult from '@/Components/Dashboard/SearchResult';
import { Navbar } from '@/Components/NavBar';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Dashboard({ auth }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);

    const searchBlur = () => {
            setSearchOpen(false);
            setSearch('');
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => {
            setSearch(e.target.value);
        }, 700));
    };

    return (
        <main className='bg-base-200 min-h-dvh flex flex-col'>
            <Navbar user={auth.user} />
            <Head title="Dashboard" />
            <div className='flex min-w-full p-3 gap-3 grow'>
                {/* Convos */}
                <div className='w-[120px] sm:w-[240px] md:w-[350px] bg-base-100 min-h-full rounded-lg p-3 shadow-sm flex flex-col'>
                    <div className="search w-full flex flex-row max-h-12 items-center">
                        <button className={`p-2 m-1 rounded-full hover:bg-gray-100 transition-all ${searchOpen ? '' : 'hidden'}`}
                            onClick={searchBlur}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                        </button>
                        <input type="text" placeholder="Search"
                            className="input input-bordered grow max-w-xs self-center rounded-full"
                            onFocus={() => setSearchOpen(true)}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {searchOpen && (
                        <div className="search_results py-3 flex flex-col gap-y-1 overflow-y-scroll">
                            <SearchResult search={search} />
                        </div>
                    )}
                </div>
                {/* Chat */}
                <div className='grow bg-base-100 rounded-lg p-3 shadow-sm'>
                    
                </div>
            </div>
        </main>
    );
}
