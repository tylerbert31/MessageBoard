import { Link } from "@inertiajs/react";

export const Navbar = ({user = null}) => {
    console.log(user)
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" href={route(user ? 'dashboard' : 'welcome')}>Messageboard</Link>
                </div>
                {!user && (
                    <div className="flex-none">
                        <ul className="menu menu-horizontal px-1">
                            <li><a href={route('login')}>Login</a></li>
                            <li><a href={route('register')}>Register</a></li>
                            <li><a href="/auth/password/reset">Forgot Password</a></li>
                        </ul>
                    </div>
                )}
                {user && (
                    <>
                        <div className="navbar-end">
                            <button className="btn btn-ghost btn-circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                stroke="currentColor" className="size-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>

                            </button>
                            <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                            </button>
                        </div>
                        
                        <div className="dropdown dropdown-end  z-[999]">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.avatar} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                <a className="justify-between" href={route('profile.edit')}>Profile
                                </a>
                                </li>
                                <li><Link method="post" href={route('logout')} as="button">Logout</Link></li>
                            </ul>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}