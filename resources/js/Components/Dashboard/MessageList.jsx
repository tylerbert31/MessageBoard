import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import React, { useState } from 'react'
import { sendNewMessage } from '@/lib/hooks';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const MessageList = ({convo}) => {
    const {receiver} = convo;
    
  return (
    <>
        <Head title={receiver.first_name ?? receiver.name} />
        <NavbarReceiver receiver={receiver} />
        
        <div className='grow bg-base-200 m-3 !mt-0 rounded-lg overflow-y-scroll pl-3'>
            <div className=''>
                <Chats convo={convo}/>
                <Chats convo={convo}/>
                <Chats convo={convo}/>
                <Chats convo={convo}/>
                <Chats convo={convo}/>
            </div>
        </div>

        <div className='w-full h-20'>
            <QueryClientProvider client={queryClient}>
                <MessageInput convo={convo}/>
            </QueryClientProvider>
        </div>
    </>
  )
}

const MessageInput = ({convo}) => {
    
    const [message, setMessage] = useState('');
    const clearMessage = () => {
        setMessage('');
    }

    const { isPending, mutate } = sendNewMessage(convo.id, message, clearMessage);
    const sendMessage = (e) => {
        e.preventDefault();
        if(!message) return;
        mutate();
    }


    return (
        <form onSubmit={sendMessage} className='w-full h-16 flex flex-row py-2 px-3 items-center'>
            <input required name="message"
                type="text"
                className='w-full h-full input input-bordered rounded-full'
                placeholder='Type a message...'
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            {!isPending && (
                <button className='btn ml-2 rounded-full' disabled={isPending}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
    
                </button>
            )}
        </form>
    )
}

const NavbarReceiver = ({receiver}) => {
    return (
        <>
            <div className='w-full h-16 flex flex-row-reverse p-2 items-center'>
                <div className="dropdown dropdown-end z-[99] mr-1">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar my-auto">
                        <div className="w-12 h-full rounded-full flex items-center border-2 border-gray-300">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={receiver.avatar} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between" href="#">Profile
                            </a>
                        </li>
                    </ul>
                </div>

            <h2 className=' mx-4'>{receiver.name}</h2>
            </div>
        </>
    )
}

const Chats = ({convo}) => {
    const {props: {auth: {user}}} = usePage();
    const user_id = user.id;
    
    return (
        <>
            <div className="chat chat-start">
                <div className="chat-bubble">
                    It's over Anakin
                </div>
            </div>
            <div className="chat chat-end">
                <div className="chat-bubble">You underestimate my power!</div>
            </div>
        </>
    )
}

export default MessageList