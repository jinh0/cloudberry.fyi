import SearchContext from '@contexts/SearchContext'
import { CourseType } from '@typing'
import { useContext } from 'react'
import CourseList from './CourseList'
import LoadingCourse from './LoadingCourse'

const SearchResult = ({ initCourses }: { initCourses: CourseType[] }) => {
  const { query, subjects, isLoading, error, data } = useContext(SearchContext)

  if (error)
    return <div className='mt-10 text-gray-600'>Something went wrong.</div>

  if (isLoading)
    return (
      <div className='mt-10'>
        <p className='text-gray-600 text-sm pb-4'>Searching...</p>
        <p className='border-b'></p>

        <LoadingCourse />
        <LoadingCourse />
      </div>
    )

  // If search is empty, then return the default course list
  if (query === '' && subjects.length === 0) {
    return (
      <div className='mt-10'>
        <p className='border-b'></p>

        <CourseList courses={initCourses} />
      </div>
    )
  }

  const { results } = data

  return (
    <div className='mt-10'>
      {query && (
        <p className='text-gray-600 text-sm pb-4'>
          Results for <span className='font-semibold'>{query}</span>.
        </p>
      )}
      <p className='border-b'></p>

      <CourseList courses={results} />
    </div>
  )
}

export default SearchResult
