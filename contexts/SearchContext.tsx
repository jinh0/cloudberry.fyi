/**
 * @file Search context for homepage
 */

import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query'
import { CourseType, Search } from '@typing'
import { Subject } from '@utils/subjects'
import { createContext, Dispatch, SetStateAction } from 'react'

/**
 * Context containing search string, fetch data, etc.
 */
const SearchContext = createContext<{
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  subjects: Subject[]
  setSubjects: Dispatch<SetStateAction<Subject[]>>
  isLoading: boolean
  error: unknown
  data: { results: CourseType[] }
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<{ results: CourseType[] }, unknown>>
} | null>(null)
export default SearchContext
