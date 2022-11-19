/**
 * @file Search context for homepage
 */

import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query'
import { CourseType } from '@typing'
import { createContext, Dispatch, SetStateAction } from 'react'

/**
 * Context containing search string, fetch data, etc.
 */
const SearchContext = createContext<{
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  isLoading: boolean
  error: unknown
  data: { status: number; results: CourseType[] }
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<
    QueryObserverResult<
      {
        status: number
        results: CourseType[]
      },
      unknown
    >
  >
} | null>(null)
export default SearchContext
