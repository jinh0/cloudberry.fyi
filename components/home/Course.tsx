/**
 * /components/home/Course.tsx: Course display
 */

import { CourseType } from 'typing'
import Link from 'next/link'
import Semester from '@components/Semester'

const Course = ({ course }: { course: CourseType }) => {
  return (
    <div className='border-b py-6 text-lg group'>
      {/* Course Heading: Code + Name */}
      <CourseHeading code={course.code} name={course.name} />

      {/* Semesters */}
      <div className='mb-4'>
        <div className='flex flex-row text-base'>
          {course.terms.map((sem, ind) => (
            <Semester sem={sem} key={ind} />
          ))}
        </div>
      </div>

      {/* Description */}
      <p className='mt-2'>{course.description}</p>

      {/* Prerequisites */}
      <div className='mt-2'>
        {course.prerequisites.length > 0 && (
          <>
            <span className='font-semibold'>Prerequisites: </span>
            <span>{course.prerequisites.join(', ')}</span>
          </>
        )}
      </div>
    </div>
  )
}

const CourseHeading = ({ code, name }) => {
  return (
    <Link href={`/courses/${code.replace(' ', '-').toLowerCase()}`}>
      <div className='mb-4 flex flex-row items-center'>
        <h1 className='text-2xl cursor-pointer w-full'>
          <span className='font-medium'>{code.replace('-', ' ')}: </span>
          <span className='font-medium'>{name}</span>
        </h1>
      </div>
    </Link>
  )
}

export default Course
