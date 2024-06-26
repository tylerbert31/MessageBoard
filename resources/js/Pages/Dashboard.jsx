import { Navbar } from '@/Components/NavBar';
import { Head } from '@inertiajs/react';
import OnlineAvatar from '@/Components/OnlineAvatar';

export default function Dashboard({ auth }) {
    return (
        <main className='bg-base-200 min-h-dvh'>
            <Navbar user={auth.user} />
            <Head title="Dashboard" />

            <div className="py-3 bg-base-200">
                <div className=" mx-auto sm:px-6 lg:px-8">
                    <div className="px-3 text-gray-900 overflow-x-auto flex flex-row gap-3">
                        {
                            Array.from({ length: 13 }).map((_, i) => (
                                <OnlineAvatar key={i} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}
