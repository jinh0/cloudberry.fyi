/**
 * /components/home/Course.tsx: Course display
 */

import { CourseType } from 'typing'
import Semester from '@components/Semester'
import NotOffered from '@components/NotOffered'
import CourseHeading from './CourseHeading'

const Course = ({ course }: { course: CourseType }) => {
  return (
    <div
      className={
        'border-b py-6 text-lg group' +
        (course.terms.length === 0 && ' text-gray-700')
      }
    >
      {/* Course Heading: Code + Name */}
      <CourseHeading code={course.code} name={course.name} />

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
      <p className='mt-2'>{course.description}</p>

      {/* Prerequisites */}
      {/* <div className='mt-2'>
        {course.prerequisites.length > 0 && (
          <>
            <span className='font-semibold'>Prerequisites: </span>
            <span>
              {course.prerequisites
                .map(prereq => prereq.toUpperCase().replace('-', ' '))
                .join(', ')}
            </span>
          </>
        )}
      </div> */}
    </div>
  )
}

export default Course
