import { COURSE_YEARS } from '@utils/constants'
import { courseLink } from '@utils/links'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavbarYears({ currentYear }: { currentYear: number }) {
  const { pathname, query } = useRouter()

  if (
    (pathname.startsWith('/courses/') || pathname.startsWith('/study/')) &&
    query.code &&
    typeof query.code === 'string'
  )
    return (
      <div className='gap-x-4 flex flex-row overflow-scroll py-1 border-b bg-white bg-opacity-60 backdrop-blur-md w-full px-6 lg:px-20'>
        {COURSE_YEARS.slice()
          .map(year =>
            year === currentYear ? (
              <div key={year} className='font-semibold text-slate-800'>
                <Link
                  href={courseLink(year, (query.code as string).toLowerCase())}
                >
                  {year}-{year + 1}
                </Link>
              </div>
            ) : (
              <div key={year} className='text-slate-600'>
                <Link
                  href={courseLink(year, (query.code as string).toLowerCase())}
                >
                  {year}-{year + 1}
                </Link>
              </div>
            )
          )}
      </div>
    )

  return <></>
}
