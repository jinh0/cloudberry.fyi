import ScheduleContext from '@contexts/ScheduleContext'
import { displayCode } from '@utils/formatting'
import { useContext } from 'react'
import Course from './Course'
import { COURSE_COLORS } from '@utils/colors'

const SearchResults = () => {
  const { scheduleCourses } = useContext(ScheduleContext)

  return (
    <div className='mt-4'>
      {scheduleCourses.map((course, idx) => (
        <Course
          key={course.code}
          course={course}
          palette={COURSE_COLORS[idx % COURSE_COLORS.length]}
        />
      ))}
    </div>
  )
}

export default SearchResults
