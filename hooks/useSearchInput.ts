import SearchContext from '@contexts/SearchContext'
import { useState, useContext, useEffect, FormEvent } from 'react'

function useSearchInput() {
  const { setQuery } = useContext(SearchContext)
  const [input, setInput] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('query')
    setInput(stored ? stored : '')
  }, [setInput])

  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    setQuery(input)
    localStorage.setItem('query', input)
  }

  return { input, setInput, onSubmit }
}

export default useSearchInput
