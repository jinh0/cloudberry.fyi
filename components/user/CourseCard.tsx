import Link from 'next/link'
import { displayCode } from '@utils/formatting'
import { useContext } from 'react'
import LookupContext from '@contexts/LookupContext'
import { courseLink } from '@utils/links'
import { CURRENT_YEAR } from '@utils/constants'

const CourseCard = ({ code }: { code: string }) => {
  const { lookup, isLoading } = useContext(LookupContext)

  if (isLoading) {
    return (
      <div className='border rounded-lg p-2 mb-4'>
        <div className='w-full bg-gray-100 text-transparent select-none rounded-full animate-pulse'>
          XXX
        </div>
      </div>
    )
  }

  const title = lookup[code.toUpperCase()]

  return (
    <Link
      href={courseLink(CURRENT_YEAR, code.toLowerCase())}
      className='flex flex-row gap-x-4 '
    >
      <div className='w-60 border rounded-lg p-2 px-4 flex-shrink-0 snap-start'>
        <p className='font-semibold'>{displayCode(code)}</p>
        <p>{title}</p>
      </div>
    </Link>
  )
}

export default CourseCard
