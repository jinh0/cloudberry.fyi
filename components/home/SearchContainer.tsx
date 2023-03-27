import SearchContext from '@contexts/SearchContext'
import SearchResult from '@components/home/SearchResult'
import Search from '@components/home/Search'
import useSearch from '@hooks/useSearch'
import { CourseType } from '@typing'

const SearchContainer = ({ initCourses }: { initCourses: CourseType[] }) => {
  const search = useSearch()

  return (
    <SearchContext.Provider value={search}>
      <Search />
      <SearchResult initCourses={initCourses} />
    </SearchContext.Provider>
  )
}

export default SearchContainer
