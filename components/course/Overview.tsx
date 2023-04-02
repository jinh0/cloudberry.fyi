import { CourseType } from '@typing'
import { formatDesc } from '@utils/formatting'

const Overview = ({ course, code }: { course: CourseType; code: string }) => {
  return (
    <div className='mt-10'>
      <p className='text-2xl font-medium pb-3 mb-4 border-b'>Overview</p>
      <p>{formatDesc(course.description, code)}</p>
    </div>
  )
}

export default Overview
