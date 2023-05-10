/**
 * /components/home/Saved.tsx: User's saved list component
 */

import CoursesContext from '@contexts/CoursesContext'
import UserContext from '@contexts/UserContext'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useContext } from 'react'
import Unsave from './Unsave'
import { range } from '@utils/formatting'
import { CURRENT_YEAR } from '@utils/constants'
import { courseLink } from '@utils/links'

const Saved = () => {
  const { user, loading, error } = useContext(UserContext)

  if (loading || error || !user) {
    return <div className='hidden lg:w-1/3 lg:pl-12'></div>
  }

  const { saved } = user.data()

  return (
    <div className='hidden lg:block lg:w-1/3 lg:pl-12'>
      <div className='text-2xl font-medium flex flex-row items-center mb-4'>
        <div className='flex flex-row items-center'>
          <BookmarkIcon className='w-7 h-7 mr-1.5' />
          <span>Saved Courses</span>
        </div>
      </div>

      <div>
        {saved.map((code, idx) => (
          <SavedCourse code={code as Lowercase<string>} key={idx} />
        ))}
      </div>
    </div>
  )
}

const SavedCourse = ({ code }: { code: Lowercase<string> }) => {
  const { courses, isLoading } = useContext(CoursesContext)

  const format = (code: string) => code.toUpperCase().replace('-', ' ')

  if (isLoading)
    return (
      <div className='border border-inherit rounded-lg p-2 mb-4'>
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
      <div className='group border border-inherit rounded-lg p-2 mb-4'>
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

export default Saved
