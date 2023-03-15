import SemesterContext from '@contexts/degree/SemesterContext'
import { displayCode } from '@utils/formatting'
import Link from 'next/link'
import { useContext } from 'react'

const CourseList = () => {
  const { courses } = useContext(SemesterContext)

  return (
    <div className='space-y-3'>
      {courses.map(course => (
        <div key={course.code} className='border px-4 py-2 rounded-xl'>
          <Link href={`/courses/${course.code}`}>
            <div className='font-semibold'>{displayCode(course.code)}</div>
            <div>{course.title}</div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default CourseList
