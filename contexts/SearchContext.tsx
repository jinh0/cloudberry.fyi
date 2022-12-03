/**
 * @file Search context for homepage
 */

import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query'
import { CourseType, Search } from '@typing'
import { createContext, Dispatch, SetStateAction } from 'react'

/**
 * Context containing search string, fetch data, etc.
 */
const SearchContext = createContext<{
  search: Search
  setSearch: Dispatch<SetStateAction<Search>>
  isLoading: boolean
  error: unknown
  data: { results: CourseType[] }
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<{ results: CourseType[] }, unknown>>
} | null>(null)
export default SearchContext
