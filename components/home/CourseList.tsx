/**
 * /components/home/CourseList.tsx: Course list component
 */

import { useContext } from 'react'
import Course from './Course'
import { CourseType } from '@typing'
import YearContext from '@contexts/YearContext'

const CourseList = ({
  courses,
}: {
  courses: CourseType[]
  nextCursor: number
}) => {
  const year = useContext(YearContext)

  return (
    <div>
      {courses.map((course, idx) => (
        <Course course={course} year={year} key={idx} />
      ))}
    </div>
  )
}

export default CourseList
