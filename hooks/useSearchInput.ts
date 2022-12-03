import SearchContext from '@contexts/SearchContext'
import { useState, useContext, useEffect, FormEvent } from 'react'

function useSearchInput() {
  const { search, setSearch } = useContext(SearchContext)
  const [input, setInput] = useState(search ? search.query : '')

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    setSearch({ ...search, query: input })
    localStorage.setItem('search', JSON.stringify({ ...search, query: input }))
  }

  return { input, setInput, onSubmit }
}

export default useSearchInput
