import SearchContext from '@contexts/SearchContext'
import { CourseType } from '@typing'
import { useContext } from 'react'
import CourseList from './CourseList'

const SearchResult = ({ initCourses }: { initCourses: CourseType[] }) => {
  const { query, subjects, error, data } = useContext(SearchContext)

  if (error)
    return <div className='mt-10 text-gray-600'>Something went wrong.</div>

  // If search is empty, then return the default course list
  if (query === '' && subjects.length === 0) {
    return (
      <div className='mt-10'>
        <p className='border-b'></p>

        <CourseList courses={initCourses} />
      </div>
    )
  }

  return (
    <div className='mt-10'>
      {query && (
        <p className='text-gray-600 text-sm pb-4'>
          Results for <span className='font-semibold'>{query}</span>.
        </p>
      )}
      <p className='border-b'></p>

      <CourseList courses={data ? data.results : []} />
    </div>
  )
}

export default SearchResult
