import React from 'react'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@/lib/queryClient';
import { usePage } from '@inertiajs/react';
import { getConvoList } from '@/lib/hooks';

const ConvoList = () => {
  return (
    <>
        <QueryClientProvider client={queryClient}>
            <div className='grow rounded-lg overflow-y-scroll flex flex-col items-center'>
                <Convos />
            </div>
        </QueryClientProvider>
    </>
  )
}

const Convos = () => {
    const { data, isLoading, isError, isSuccess } = getConvoList();
    const {props: {convo}} = usePage();
    const convos = [];
    if(isSuccess) {
        data.data.sort((a, b) => {
            return new Date(b.latest_message.created_at) - new Date(a.latest_message.created_at);
        });
        convos.push(...data.data);
    }
    const conversation_id = convo?.id ?? -1;
    return (
        <>
            {convos && convos.map((convo_list) => (
                (<a key={convo_list.conversation_id} href={`/messages/${convo_list.conversation_id}`} className={`flex flex-row min-w-full h-15 gap-x-3 px-2 hover:bg-base-300 py-2 rounded-lg justify-center sm:justify-start ${convo_list.conversation_id == conversation_id ? ' bg-base-200' : ''}`}>
                    <div className=' flex items-center'>
                        <div className="avatar">
                            <div className="w-12 rounded-full">
                                <img src={convo_list.user_data.avatar}/>
                            </div>
                        </div>
                    </div>
                    <div className='items-start pt-2 font-extrabold text-gray-600 hidden sm:block'>
                        {convo_list.user_data.name}
                        <p className=' font-light'>{convo_list.latest_message.message}</p>
                    </div>
                </a>)
            ))}
        </>
    )
}

export default ConvoList