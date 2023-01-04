import SearchContext from '@contexts/SearchContext'
import { useState, useContext, useEffect, FormEvent } from 'react'

function useSearchInput() {
  const { setQuery } = useContext(SearchContext)
  const [input, setInput] = useState('')

  // Load from local storage, if it exists
  useEffect(() => {
    const stored = localStorage.getItem('query')
    setInput(stored ? stored : '')
    setQuery(stored ? stored : '')
  }, [setInput])

  // Submission function
  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    setQuery(input)
    localStorage.setItem('query', input)
  }

  return { input, setInput, onSubmit, setQuery }
}

export default useSearchInput
