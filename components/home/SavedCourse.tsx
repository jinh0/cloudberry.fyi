import CoursesContext from '@contexts/CoursesContext'
import { CURRENT_YEAR } from '@utils/constants'
import { courseLink } from '@utils/links'
import Link from 'next/link'
import { useContext } from 'react'
import Unsave from './Unsave'

const SavedCourse = ({ code }: { code: Lowercase<string> }) => {
  const { courses, isLoading } = useContext(CoursesContext)

  const format = (code: string) => code.toUpperCase().replace('-', ' ')

  if (isLoading)
    return (
      <div className='border-t border-inherit rounded-lg p-2.5'>
        <div className='w-full bg-gray-100 text-transparent select-none rounded-full animate-pulse'>
          XXX
        </div>
      </div>
    )

  const upperCode = code.toUpperCase()
  const course = courses.find(x => x.code === upperCode)

  if (!course) return <></>

  return (
    <Link href={courseLink(CURRENT_YEAR, code)}>
      <div className='group border-t border-inherit p-2.5'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-lg font-medium'>{format(course.code)}</div>
          <div className='opacity-0 group-hover:opacity-100 transition duration-150'>
            <Unsave code={code} />
          </div>
        </div>
        <div className='text-base font-normal text-gray-700'>
          {course.title}
        </div>
      </div>
    </Link>
  )
}

export default SavedCourse
