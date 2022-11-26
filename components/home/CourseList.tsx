/**
 * /components/home/CourseList.tsx: Course list component
 */

import Course from './Course'
import { useContext } from 'react'
import SearchContext from '@contexts/SearchContext'
import { CourseType } from '@typing'
import LoadingCourse from './LoadingCourse'

const CourseList = ({ initCourses }: { initCourses: CourseType[] }) => {
  const { search, isLoading, error, data } = useContext(SearchContext)

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

  if (search === '') {
    return (
      <div className='mt-10'>
        <p className='border-b'></p>
        {initCourses.map((item, ind) => (
          <Course course={item} key={ind} />
        ))}
      </div>
    )
  }

  const { results } = data

  return (
    <div className='mt-10'>
      <p className='text-gray-600 text-sm pb-4'>
        {search && (
          <>
            Results for <span className='font-semibold'>{search}</span>.
          </>
        )}
      </p>
      <p className='border-b'></p>

      {results.map((item, ind) => (
        <Course course={item} key={ind} />
      ))}
    </div>
  )
}

export default CourseList
