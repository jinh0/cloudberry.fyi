// TODO: Cleanup

import { useState, Fragment, useEffect, useContext } from 'react'
import { Listbox } from '@headlessui/react'
import { faPagelines } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { faSnowflake, faSun } from '@fortawesome/free-solid-svg-icons'
import { XCircleIcon } from '@heroicons/react/24/outline'
import SearchContext from '@contexts/SearchContext'

const semesters = [
  { id: 0, name: 'All Semesters', value: 'fall|winter' },
  { id: 1, name: 'Fall 2022', value: 'fall' },
  { id: 2, name: 'Winter 2023', value: 'winter' },
  { id: 3, name: 'Summer 2023', value: 'summer' },
]

const classNames = (...args: string[]) => args.join(' ')

const semesterStyles = {
  0: (
    <Listbox.Button
      className={classNames(
        'border rounded-full px-4 py-1 outline-none placeholder-gray-600 w-fit flex flex-row items-start text-gray-600 whitespace-nowrap',
        'flex flex-row items-center'
      )}
    >
      All Semesters
      <ChevronDownIcon className='w-6 h-6 ml-4' />
    </Listbox.Button>
  ),
  1: (
    <Listbox.Button
      className={classNames(
        'border border-red-50 rounded-full px-4 py-1 outline-none placeholder-gray-600 w-fit flex flex-row items-start text-red-600 bg-red-50',
        'flex flex-row items-center'
      )}
    >
      <FontAwesomeIcon icon={faPagelines} className='w-4 h-4 mr-2' />
      Fall 2022
      <ChevronDownIcon className='w-6 h-6 ml-4' />
    </Listbox.Button>
  ),
  2: (
    <Listbox.Button
      className={classNames(
        'border border-sky-50 rounded-full px-4 py-1 outline-none placeholder-gray-600 w-fit flex flex-row items-start text-sky-600 bg-sky-50',
        'flex flex-row items-center'
      )}
    >
      <FontAwesomeIcon icon={faSnowflake} className='w-4 h-4 mr-2' />
      Winter 2023
      <ChevronDownIcon className='w-6 h-6 ml-4' />
    </Listbox.Button>
  ),
  3: (
    <Listbox.Button
      className={classNames(
        'border border-orange-50 rounded-full px-4 py-1 outline-none placeholder-gray-600 w-fit flex flex-row items-start text-orange-600 bg-orange-50',
        'flex flex-row items-center'
      )}
    >
      <FontAwesomeIcon icon={faSun} className='w-4 h-4 mr-2' />
      Summer 2023
      <ChevronDownIcon className='w-6 h-6 ml-4' />
    </Listbox.Button>
  ),
  // 4: (
  //   <Listbox.Button
  //     className={classNames(
  //       'border rounded-full px-4 py-1 outline-none placeholder-gray-600 w-fit flex flex-row items-start text-gray-600',
  //       'flex flex-row items-center'
  //     )}
  //   >
  //     <XCircleIcon className='w-5 h-5 mr-2' />
  //     Not Offered
  //     <ChevronDownIcon className='w-6 h-6 ml-4' />
  //   </Listbox.Button>
  // ),
}

const SemesterSelect = () => {
  const { semester, setSemester } = useContext(SearchContext)

  return (
    <div className='relative mr-2 z-10'>
      <Listbox value={semester} onChange={setSemester}>
        <div className='flex flex-row  items-start'>
          {semester && semesterStyles[semester.id]}
          {!semester && (
            <Listbox.Button
              className={classNames(
                'border rounded-full px-4 py-1 outline-none placeholder-gray-600 w-fit flex flex-row items-start text-gray-600 whitespace-nowrap',
                'flex flex-row items-center'
              )}
            >
              All Semesters
              <ChevronDownIcon className='w-6 h-6 ml-4' />
            </Listbox.Button>
          )}
        </div>

        <Listbox.Options className='absolute bg-white border rounded-xl py-2 mt-2 w-72 overflow-auto shadow outline-none'>
          {semesters.map(option => (
            /* Use the `active` state to conditionally style the active option. */
            /* Use the `selected` state to conditionally style the selected option. */
            <Listbox.Option key={option.id} value={option} as={Fragment}>
              {({ active, selected }) => (
                <div
                  className={classNames(
                    'px-4 py-2 flex flex-row items-center outline-none cursor-pointer hover:bg-yellow-50 hover:text-yellow-800',
                    `${active ? '' : 'bg-white text-black'}`,
                    selected || (semester === null && option.id === 0)
                      ? 'bg-yellow-50 text-yellow-800'
                      : ''
                  )}
                >
                  {selected || (semester === null && option.id === 0) ? (
                    <CheckIcon className='w-4 h-4 mr-2 text-orange-400' />
                  ) : (
                    <span className='w-4 mr-2'></span>
                  )}

                  <span>{option.name}</span>
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

export default SemesterSelect
