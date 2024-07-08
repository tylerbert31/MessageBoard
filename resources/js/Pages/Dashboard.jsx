import ConvoList from '@/Components/Dashboard/ConvoList';
import MessageList from '@/Components/Dashboard/MessageList';
import SearchResult from '@/Components/Dashboard/SearchResult';
import { Navbar } from '@/Components/NavBar';
import { Head } from '@inertiajs/react';
import React, { useState, useRef } from 'react';

export default function Dashboard({ auth, convo }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const inputRef = useRef(null);

    const searchBlur = () => {
        setSearch('');
        setSearchOpen(false);
        inputRef.current.value = '';
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => {
            setSearch(e.target.value);
        }, 700));
    };

    return (
        <main className='bg-base-200 h-screen max-h-[100vh] flex flex-col'>
            <Navbar user={auth.user} />
            <Head title="Dashboard" />
            <div className='flex min-w-full p-3 gap-3 grow'>
                {/* Convos */}
                <div className='min-w-[100px] sm:min-w-[240px] md:min-w-[350px] max-w-[100px] sm:max-w-[240px] md:max-w-[350px] bg-base-100 min-h-full rounded-lg p-3 shadow-sm flex flex-col gap-y-3'>
                    <div className="search w-full flex flex-row max-h-12 items-center justify-center sm:justify-start">
                        <button className={`p-2 m-1 rounded-full hover:bg-gray-100 transition-all ${searchOpen ? '' : 'hidden'}`}
                            onClick={searchBlur}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
                        </svg>
                        </button>
                        <input type="text" placeholder="Search"
                            className="input input-bordered grow self-center rounded-full min-w-[80px] hidden sm:block"
                            onFocus={() => setSearchOpen(true)}
                            onChange={handleSearchChange}
                            ref={inputRef}
                        />
                    </div>
                    {searchOpen && (
                        <div className="search_results py-3 grow flex flex-col gap-y-1 overflow-y-scroll">
                            <SearchResult search={search} />
                        </div>
                    )}
                    {!searchOpen && (
                        <ConvoList />
                    )}
                </div>
                {/* Chat */}
                <div className='h-full w-full bg-base-100 rounded-lg justify-between shadow-sm flex flex-col overflow-hidden'  style={{maxHeight: `calc(100dvh - 90px)`}}>
                    {convo && (<MessageList convo={convo}/>)}
                </div>
            </div>
        </main>
    );
}
