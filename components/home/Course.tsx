/**
 * /components/home/Course.tsx: Course display
 */

import { CourseType } from 'typing'
import Semester from '@components/Semester'
import NotOffered from '@components/NotOffered'
import CourseHeading from './CourseHeading'
import { formatDesc, linkCode } from '@utils/formatting'
import Link from 'next/link'

const Course = ({ course, year }: { course: CourseType; year: number }) => {
  const link =
    year === 2022
      ? `/courses/${linkCode(course.code)}`
      : `/study/${year}-${year + 1}/courses/${linkCode(course.code)}`

  return (
    <Link href={link}>
      <div
        className={
          'border-b py-6 text-lg group ' +
          (course.terms.length === 0 && ' text-gray-700')
        }
      >
        {/* Course Heading: Code + Name */}
        <CourseHeading code={course.code} name={course.title} />

        {/* Semesters */}
        <div className='mb-4'>
          <div className='flex flex-row text-base flex-wrap'>
            {course.terms.length > 0 ? (
              course.terms.map((sem, ind) => <Semester sem={sem} key={ind} />)
            ) : (
              <NotOffered />
            )}
          </div>
        </div>

        {/* Description */}
        <p className='mt-2'>{formatDesc(course.description, course.code)}</p>
      </div>
    </Link>
  )
}

export default Course
