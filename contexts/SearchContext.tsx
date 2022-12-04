/**
 * @file Search context for homepage
 */

import { SearchContextType } from '@typing'
import { createContext } from 'react'

/**
 * Context containing search string, fetch data, etc.
 */
const SearchContext = createContext<SearchContextType | null>(null)
export default SearchContext
