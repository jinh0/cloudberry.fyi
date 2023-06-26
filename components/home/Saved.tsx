/**
 * /components/home/Saved.tsx: User's saved list component
 */

import CoursesContext from '@contexts/CoursesContext'
import UserContext from '@contexts/UserContext'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useContext, useState } from 'react'
import Unsave from './Unsave'
import { range } from '@utils/formatting'
import { CURRENT_YEAR } from '@utils/constants'
import { courseLink } from '@utils/links'
import { Collapse } from '@mantine/core'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid'

function useCollapsible(begin: boolean) {
  const [opened, setOpened] = useState(begin)
  const toggle = () => setOpened(!opened)

  return { opened, toggle }
}

const Saved = () => {
  const { user, loading, error } = useContext(UserContext)

  if (loading || error || !user) {
    return <div className='hidden lg:w-1/3 lg:pl-12'></div>
  }

  const { saved } = user.data()

  return (
    <div className='hidden lg:block lg:w-1/3 lg:pl-12'>
      <Disclosure defaultOpen={true}>
        {({ open }) => (
          <>
            <Disclosure.Button className='w-full flex flex-row items-center text-2xl font-medium py-2 mb-2 transition'>
              <div className='flex flex-row w-full justify-between items-center'>
                <div className='flex flex-row items-center'>
                  <BookmarkIcon className='w-7 h-7 mr-3' />
                  <span>Saved Courses</span>
                </div>
                {open ? (
                  <div className=''>
                    <ChevronUpIcon className='w-6 h-6' />
                  </div>
                ) : (
                  <div className=''>
                    <ChevronDownIcon className='w-6 h-6' />
                  </div>
                )}
              </div>
            </Disclosure.Button>
            <Disclosure.Panel>
              {saved.map((code, idx) => (
                <SavedCourse code={code as Lowercase<string>} key={idx} />
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

const SavedCourse = ({ code }: { code: Lowercase<string> }) => {
  const { courses, isLoading } = useContext(CoursesContext)

  const format = (code: string) => code.toUpperCase().replace('-', ' ')

  if (isLoading)
    return (
      <div className='border border-inherit rounded-lg p-2 mb-3'>
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
      <div className='group border border-inherit rounded-lg p-2 mb-3'>
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
