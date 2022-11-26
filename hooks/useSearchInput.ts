import SearchContext from '@contexts/SearchContext'
import { useState, useContext, useEffect, FormEvent } from 'react'

function useSearchInput() {
  const [input, setInput] = useState('')
  const { setSearch } = useContext(SearchContext)

  useEffect(() => {
    const storedInput = localStorage.getItem('search')

    if (storedInput) setInput(storedInput)
  }, [setInput])

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    setSearch(input)
    localStorage.setItem('search', input)
  }

  return { input, setInput, onSubmit }
}

export default useSearchInput
