import { createContext, Dispatch, SetStateAction } from 'react'

const SearchContext = createContext<{
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}>(null)
export default SearchContext
