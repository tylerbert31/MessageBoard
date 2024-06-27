import React from 'react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSearchPeople } from '@/lib/hooks';

const queryClient = new QueryClient();

const SearchResult = (search) => {
  return (
    <>
        <QueryClientProvider client={queryClient}>
            <SearchResultsData search={search} />
        </QueryClientProvider>
    </>
  )
}

const SearchResultsData = (search) => {
    const { data, isLoading, isSuccess, isError, error } = useSearchPeople(search);
    if(isError){
        console.log(error);
    }
    return (
        <>
            {isLoading && !data && <CardLoading />}
            {isSuccess && data &&  (
                <>
                    {data.data.map((person) => (
                        <Card key={person.id} person={person} />
                    ))}
                </>
            )}
        </>
    )
}

const Card = ({person}) => {
    return (
        <>
            <a href={`/chat/${person.id}`} className='flex flex-row w-full h-15 gap-x-3 px-2 hover:bg-base-300 py-2 rounded-lg justify-center sm:justify-start'>
                <div className=' flex items-center'>
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={person.avatar} />
                        </div>
                    </div>
                </div>
                <div className='items-start pt-2 font-bold text-gray-600 hidden sm:block'>
                    {person.name}
                </div>
            </a>
        </>
    )
}

const CardLoading = () => {
    return (
        <>
            {Array.from({length: 3}).map((_, i) => (
                <div key={i} className='flex flex-row w-full h-15 gap-x-3 px-2 hover:bg-base-300 py-2 rounded-lg'>
                <div className=' flex items-center'>
                    <div className="avatar">
                        <div className="skeleton w-12 rounded-full">
                        </div>
                    </div>
                </div>
                <div className='items-start mt-2 pt-2 font-bold text-gray-600 h-4 skeleton w-32'>
                </div>
            </div>
            ))}
        </>
    )
}
export default SearchResult