/**
 * /components/home/CourseList.tsx: Course list component
 */

import Course from './Course'
import { CourseType } from '@typing'

const CourseList = ({
  courses,
}: {
  courses: CourseType[]
  nextCursor: number
}) => {
  return (
    <div>
      {courses.map((course, idx) => (
        <Course course={course} key={idx} />
      ))}
    </div>
  )
}

export default CourseList
