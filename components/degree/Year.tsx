import Semester from '@components/degree/Semester'
import { DegreeCourse } from '@typing'

const Year = ({ year }: { year: number }) => {
  // Placeholder data
  const courses: DegreeCourse[] = [
    {
      code: 'comp-250',
      title: 'Introduction to Computer Science',
      semester: 'fall',
      year: 2022,
    },
    {
      code: 'comp-206',
      title: 'Introduction to Software Systems',
      semester: 'fall',
      year: 2022,
    },
  ]

  return (
    <div className='flex flex-col md:flex-row gap-y-8 gap-x-8'>
      <Semester year={year} semester='fall' />
      <Semester year={year} semester='winter' />
    </div>
  )
}

export default Year
