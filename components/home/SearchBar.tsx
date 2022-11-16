import { useContext, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchContext from '@contexts/SearchContext'

const SearchBar = () => {
  const { query, setQuery } = useContext(SearchContext)

  return (
    <form className='w-full md:w-2/3 mb-2 text-xl md:text-3xl py-2 flex flex-row items-center text-gray-600'>
      <MagnifyingGlassIcon className='w-6 h-6 mr-2 text-gray-400' />
      <input
        className='outline-none w-full px-2 text-black'
        placeholder='Search for a course...'
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}

export default SearchBar
