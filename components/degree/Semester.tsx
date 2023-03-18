import SemesterContext, {
  SemesterProps,
} from '@contexts/degree/SemesterContext'
import { SemesterType } from '@typing'
import { useState } from 'react'
import AddCourse from './AddCourse'
import CourseList from './CourseList'

function formatTitle(year: number, semester: SemesterType) {
  const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

  const yearFormatted =
    semester === 'winter' || semester === 'summer' ? year + 1 : year
  return `${capitalize(semester)} ${yearFormatted}`
}

const Semester = ({
  year,
  semester,
  courses: initCourses,
}: Omit<SemesterProps, 'setCourses'>) => {
  const [courses, setCourses] = useState(initCourses)

  return (
    <SemesterContext.Provider value={{ year, semester, courses, setCourses }}>
      <div className='w-full'>
        <div className='text-2xl mb-2'>{formatTitle(year, semester)}</div>

        <CourseList />
        <AddCourse />
      </div>
    </SemesterContext.Provider>
  )
}

export default Semester
