import SearchContext from '@contexts/SearchContext'
import { useState, useContext, useEffect, FormEvent, ChangeEvent } from 'react'

function useSearchInput() {
  const { setQuery } = useContext(SearchContext)
  const [input, setInput] = useState('')

  // Load from local storage, if it exists
  useEffect(() => {
    const stored = localStorage.getItem('query')
    setInput(stored ? stored : '')
    setQuery(stored ? stored : '')
  }, [setInput, setQuery])

  // Submission function
  const onSubmit = (evt: FormEvent) => {
    evt.preventDefault()

    setQuery(input)
    localStorage.setItem('query', input)
  }

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInput(evt.target.value)
    setQuery(evt.target.value)
    localStorage.setItem('query', evt.target.value)
  }

  return { input, setInput, onSubmit, onChange }
}

export default useSearchInput
