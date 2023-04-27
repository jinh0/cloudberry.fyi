import subjectsData from '@utils/subjects.json'
import Actions from '@components/course/Actions'
import Semesters from '@components/course/Semesters'
import ShareButton from '@components/course/ShareButton'
import { DocumentSnapshot } from 'firebase/firestore'
import { CourseType, UserType } from '@typing'
import { displayCode } from '@utils/formatting'

const CourseHeading = ({
  course,
  code,
  user,
}: {
  course: CourseType
  code: string
  user: DocumentSnapshot<UserType>
}) => {
  return (
    <div className='space-y-4'>
      <div className='text-2xl md:text-3xl mt-4 flex flex-row items-center'>
        <span>
          <span className='font-semibold mr-2'>{displayCode(code)}</span>
          <span className=''>{course.title}</span>
        </span>
        <ShareButton />
      </div>

      <Semesters terms={course.terms} year={course.year} />

      <div className='text-gray-700 text-base flex flex-row flex-wrap gap-x-2 items-center'>
        <div>
          {String(course.credits)} {course.credits !== 1 ? 'credits' : 'credit'}
        </div>
        <div className='w-1 h-1 rounded-full bg-gray-700'></div>
        <div>{subjectsData[course.code.split('-')[0]]}</div>
        <div className='w-1 h-1 rounded-full bg-gray-700'></div>
        <div>{course.faculty}</div>
      </div>

      {user && <Actions code={code} />}
    </div>
  )
}

export default CourseHeading
