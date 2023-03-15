import SemesterContext, {
  SemesterProps,
} from '@contexts/degree/SemesterContext'
import { SemesterType } from '@typing'
import AddCourse from './AddCourse'
import CourseList from './CourseList'
import Margin from './Margin'

const Semester = ({ year, semester, courses }: SemesterProps) => {
  const formatTitle = (year: number, semester: SemesterType) => {
    const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

    const yearFormatted =
      semester === 'winter' || semester === 'summer' ? year + 1 : year
    return `${capitalize(semester)} ${yearFormatted}`
  }

  return (
    <SemesterContext.Provider value={{ year, semester, courses }}>
      <div className='w-full'>
        <div className='text-2xl mb-2'>{formatTitle(year, semester)}</div>
        <CourseList />
        <AddCourse />
      </div>
    </SemesterContext.Provider>
  )
}

export default Semester
