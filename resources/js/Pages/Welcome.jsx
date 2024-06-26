import { Link, Head } from '@inertiajs/react';
import { Navbar } from '@/Components/NavBar';

export default function Welcome({ auth }) {
    const btn_txt = auth.user ? "Dashboard" : "Sign up";
    const btn_redir = auth.user ? "/dashboard" : "/auth/register";
    return (
        <>
            <main>
                <Head title="Messageboard" />
                <Navbar user={auth.user} />
                <div className="hero bg-base-200 min-h-screen px-2">
                    <div className="hero-content flex-col lg:flex-row">
                        <img
                        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                        className="max-w-sm rounded-lg shadow-2xl" />
                        <div>
                        <h1 className="text-5xl font-bold">Welcome to my Messageboard!</h1>
                        <p className="py-6">
                            Made by Tyler Bert, using Laravel+React, Breeze + Devdojo/Auth, Tailwind CSS, DaisyUI.
                        </p>
                            <a href={btn_redir} className="btn btn-neutral">{btn_txt}</a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
