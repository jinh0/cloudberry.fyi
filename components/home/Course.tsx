import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faPagelines } from '@fortawesome/free-brands-svg-icons'
import { CourseType } from 'typing'
import Link from 'next/link'
import Semester from '@components/Semester'
import { BookmarkIcon } from '@heroicons/react/24/outline'

const Course = ({ course }: { course: CourseType }) => {
  return (
    <div className='border-b py-6 text-lg group'>
      <div className='mb-4'>
        <Link href={`/courses/${course.code.replace(' ', '-').toLowerCase()}`}>
          <div className='mb-4 flex flex-row items-center'>
            <h1 className='text-2xl cursor-pointer w-full'>
              <span className='font-medium'>{course.code}: </span>
              <span className='font-medium'>{course.name}</span>
            </h1>
          </div>
        </Link>
        {/* <BookmarkIcon className="transition opacity-0 group-hover:opacity-100 group-hover:inline-block w-6 h-6 ml-2 cursor-pointer text-gray-600" /> */}

        <div className='flex flex-row text-base'>
          {course.terms.map((sem, ind) => (
            <Semester sem={sem} key={ind} />
          ))}
        </div>
      </div>

      <p className='mt-2'>{course.description}</p>

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

export default Course
