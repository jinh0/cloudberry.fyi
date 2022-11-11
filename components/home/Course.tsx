import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faPagelines } from '@fortawesome/free-brands-svg-icons'
import { CourseType } from 'typing'
import Link from 'next/link'
import Semester from '@components/Semester'

const Course = ({ course }: { course: CourseType }) => {
  return (
    <div className="border-b py-6 text-lg">
      <div className="mb-4">
        <Link href={`/courses/${course.code.replace(' ', '-').toLowerCase()}`}>
          <h1 className="text-2xl mb-4 cursor-pointer">
            <span className="font-medium">{course.code}: </span>
            <span className="font-medium">{course.name}</span>
          </h1>
        </Link>

        <div className="flex flex-row text-base">
          {course.terms.map((sem, ind) => (
            <Semester sem={sem.term} key={ind} />
          ))}
        </div>
      </div>

      <p className="mt-2">{course.description}</p>

      <div className="mt-2">
        {course.prerequisites.length > 0 && (
          <>
            <span className="font-semibold">Prerequisites: </span>
            <span>{course.prerequisites.join(', ')}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default Course
