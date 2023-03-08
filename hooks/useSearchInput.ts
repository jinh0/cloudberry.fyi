import SearchContext from '@contexts/SearchContext'
import { useState, useContext, useEffect, FormEvent, ChangeEvent } from 'react'
import subjectsData from '@utils/subjects'

// TODO: query VS input, we don't need both?
// Note: Can only be used in the context of a SearchContext
function useSearchInput() {
  const { query, setQuery, subjects, setSubjects } = useContext(SearchContext)
  const [input, setInput] = useState('')

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

  // Load from local storage, if it exists
  useEffect(() => {
    const stored = localStorage.getItem('query')
    setInput(stored ? stored : '')
    setQuery(stored ? stored : '')
  }, [setInput, setQuery])

  useEffect(() => {
    const words = query.split(' ')
    const subj = words.find(x => x.length > 0 && x[0] === '#')
    const subjIdx = words.indexOf(subj)

    if (subj) {
      const found = subjectsData.find(
        x => x.code.toLowerCase() === subj.slice(1).toLowerCase()
      )
      if (found) {
        setSubjects(Array.from(new Set(subjects.concat(found))))

        const filtered = words
          .map((x, idx) => (subjIdx !== idx ? x : ''))
          .join(' ')
        setInput(filtered)
        setQuery(filtered)
      }
    }
  }, [query])

  return { input, setInput, onSubmit, onChange }
}

export default useSearchInput
