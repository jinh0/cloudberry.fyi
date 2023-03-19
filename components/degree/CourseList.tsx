import SemesterContext from '@contexts/degree/SemesterContext'
import { TrashIcon } from '@heroicons/react/24/outline'
import { DegreeCourse } from '@typing'
import { displayCode } from '@utils/formatting'
import Link from 'next/link'
import { useContext } from 'react'
import Button from './Button'

const CourseList = () => {
  const { courses, setCourses } = useContext(SemesterContext)

  function onClick(course: DegreeCourse) {
    return () => setCourses(courses.filter(x => x.code !== course.code))
  }

  return (
    <div className='space-y-3'>
      {courses.map(course => (
        <div
          key={course.code}
          className='border px-4 py-2 rounded-xl flex flex-row justify-between group'
        >
          <Link className='w-full' href={`/courses/${course.code}`}>
            <div className='font-semibold'>{displayCode(course.code)}</div>
            <div>{course.title}</div>
          </Link>

          <Button
            className='border-none rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 text-gray-500'
            onClick={onClick(course)}
          >
            <TrashIcon className='  w-6 h-6' />
          </Button>
        </div>
      ))}
    </div>
  )
}

export default CourseList
