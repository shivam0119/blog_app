"use client"
import { Search } from 'lucide-react'
import { Input } from '../../ui/input'
import React, { useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchAction } from '@/actions/search'

const SearchInput = () => {
    const params = useSearchParams();
    return (
        <form action={searchAction}>
            <div className='relative'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input type='text' defaultValue={params.get('search')||""} name='search' placeholder='Search articles....' className=" pl-10 w-48 focus-visible:ring-1" />
            </div>
        </form>
    )
}

export default SearchInput
