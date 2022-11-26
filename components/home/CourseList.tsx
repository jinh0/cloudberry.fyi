/**
 * /components/home/CourseList.tsx: Course list component
 */

import Course from './Course'
import { CourseType } from '@typing'

const CourseList = ({ courses }: { courses: CourseType[] }) => {
  return (
    <div>
      {courses.map((course, idx) => (
        <Course course={course} key={idx} />
      ))}
    </div>
  )
}

export default CourseList
