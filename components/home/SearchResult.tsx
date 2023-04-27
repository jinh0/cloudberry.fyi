import SearchContext from '@contexts/SearchContext'
import { CourseType } from '@typing'
import { useContext } from 'react'
import CourseList from './CourseList'

const SearchResult = ({ initCourses }: { initCourses: CourseType[] }) => {
  const { query, subjects, error, data, fetchNextPage, hasNextPage } =
    useContext(SearchContext)

  if (error)
    return <div className='mt-10 text-gray-600'>Something went wrong.</div>

  return (
    <div className='mt-10'>
      {query && (
        <p className='text-gray-600 text-sm pb-4'>
          Found {data && data.pages.flatMap(x => x.numOfResults)[0]} results for{' '}
          <span className='font-semibold'>{query.trim()}</span>.
        </p>
      )}
      <p className='border-b'></p>

      <CourseList
        courses={data ? data.pages.flatMap(x => x.results) : []}
        nextCursor={data ? Math.max(...data.pages.map(x => x.nextCursor)) : 1}
      />

      {hasNextPage && (
        <button
          className='w-full mt-4 border rounded-xl py-2 text-gray-600 hover:bg-gray-50 transition border-dashed'
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
        >
          Load more courses...
        </button>
      )}
    </div>
  )
}

export default SearchResult
