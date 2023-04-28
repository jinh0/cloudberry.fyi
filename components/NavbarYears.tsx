import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavbarYears({ currentYear }: { currentYear: number }) {
  const years = [2022, 2021, 2020, 2019, 2018]

  const { pathname, query } = useRouter()

  console.log(pathname, query)

  if (
    (pathname.startsWith('/courses/') || pathname.startsWith('/study/')) &&
    query.code &&
    typeof query.code === 'string'
  )
    return (
      <div className='gap-x-4 flex flex-row overflow-scroll py-1 border-b bg-white bg-opacity-60 backdrop-blur-md w-full px-6 lg:px-20'>
        {years.map(year =>
          year === currentYear ? (
            <div key={year} className='font-semibold text-slate-800'>
              <Link
                href={
                  year === 2022
                    ? `/courses/${(query.code as string).toLowerCase()}`
                    : `/study/${year}-${year + 1}/${(
                        query.code as string
                      ).toLowerCase()}`
                }
              >
                {year}-{year + 1}
              </Link>
            </div>
          ) : (
            <div key={year} className='text-slate-600'>
              <Link
                href={
                  year === 2022
                    ? `/courses/${(query.code as string).toLowerCase()}`
                    : `/study/${year}-${year + 1}/${(
                        query.code as string
                      ).toLowerCase()}`
                }
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
