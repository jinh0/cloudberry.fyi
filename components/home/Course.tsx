/**
 * /components/home/Course.tsx: Course display
 */

import { CourseType } from 'typing'
import Semester from '@components/Semester'
import NotOffered from '@components/NotOffered'
import CourseHeading from './CourseHeading'
import { formatDesc, linkCode } from '@utils/formatting'
import Link from 'next/link'
import { courseLink } from '@utils/links'

const Course = ({ course, year }: { course: CourseType; year: number }) => {
  return (
    <Link href={courseLink(year, course.code.toLowerCase())}>
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
              course.terms.map((sem, ind) => (
                <Semester key={ind} sem={sem} year={year} />
              ))
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
