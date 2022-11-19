import { FormEvent, useContext, useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import SearchContext from '@contexts/SearchContext'

const SearchBar = () => {
  const { setSearch } = useContext(SearchContext)
  const [query, setQuery] = useState('')

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    setSearch(query)
  }

  return (
    <form
      className='mb-2 text-xl md:text-3xl py-2 flex flex-row items-center text-gray-600'
      onSubmit={handleSubmit}
    >
      <MagnifyingGlassIcon className='w-6 h-6 mr-2 text-gray-400' />
      <input
        className='outline-none w-full px-2 text-black'
        placeholder='Search for a course...'
        autoFocus
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </form>
  )
}

export default SearchBar
