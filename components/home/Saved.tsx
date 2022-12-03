/**
 * /components/home/Saved.tsx: User's saved list component
 */

import UserContext from '@contexts/UserContext'
import { useQuery } from '@tanstack/react-query'
import { CourseType, UserType } from '@typing'
import Link from 'next/link'
import { useContext } from 'react'
import Unsave from './Unsave'

const Saved = () => {
  const { user, loading, error } = useContext(UserContext)

  if (loading || error || !user) {
    return <div className='hidden lg:w-1/3 lg:pl-12'></div>
  }

  const { saved } = user.data() as UserType

  return (
    <div className='hidden lg:block lg:w-1/3 lg:pl-12'>
      <div className='text-2xl font-medium flex flex-row items-center mb-4'>
        <div>Your Saved Courses</div>
      </div>

      <div>
        {saved.map((code, idx) => (
          <SavedCourse code={code} key={idx} />
        ))}
      </div>
    </div>
  )
}

const SavedCourse = ({ code }) => {
  const getCourse = async () => {
    const res = await fetch(`/api/courses/${code}`)
    return res.json()
  }

  const format = (code: string) => code.toUpperCase().replace('-', ' ')

  const { isLoading, data } = useQuery<{ status: number; result: CourseType }>({
    queryKey: [`${code}`],
    queryFn: getCourse,
  })

  if (isLoading)
    return (
      <div className='border border-inherit rounded-lg p-2 mb-4'>
        <div className='w-full bg-gray-100 text-transparent select-none rounded-full animate-pulse'>
          XXX
        </div>
      </div>
    )

  return (
    <Link href={`/courses/${code}`}>
      <div className='group border border-inherit rounded-lg p-2 mb-4'>
        <div className='flex flex-row items-center justify-between'>
          <div className='text-lg font-medium'>{format(data.result.code)}</div>
          <div className='opacity-0 group-hover:opacity-100 transition duration-150'>
            <Unsave code={code} />
          </div>
        </div>
        <div className='text-base font-normal text-gray-700'>
          {data.result.name}
        </div>
      </div>
    </Link>
  )
}

export default Saved
