import SearchContext from '@contexts/SearchContext'
import SearchResult from '@components/home/SearchResult'
import useSearch from '@hooks/useSearch'
import { CourseType } from '@typing'
import SearchBar from './SearchBar'
import Filters from './Filters'

const Search = ({ initCourses }: { initCourses: CourseType[] }) => {
  const search = useSearch()

  return (
    <SearchContext.Provider value={search}>
      <div>
        <SearchBar />
        <Filters />
      </div>

      <SearchResult initCourses={initCourses} />
    </SearchContext.Provider>
  )
}

export default Search
