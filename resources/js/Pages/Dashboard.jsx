import { Navbar } from '@/Components/NavBar';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    console.log(auth.user)
    return (
        <main className='bg-base-200 min-h-dvh flex flex-col'>
            <Navbar user={auth.user} />
            <Head title="Dashboard" />
            <div className='flex min-w-full p-3 gap-3 grow'>
                {/* Convos */}
                <div className='w-[120px] sm:w-[240px] md:w-[350px] bg-base-100 min-h-full rounded-lg p-3 shadow-sm flex flex-col'>
                    <input type="text" placeholder="Search" className="input input-bordered w-full max-w-xs self-center rounded-full" />
                </div>
                {/* Chat */}
                <div className='grow bg-base-100 rounded-lg p-3 shadow-sm'>
                    
                </div>
            </div>
        </main>
    );
}
