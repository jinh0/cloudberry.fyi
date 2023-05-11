import VSBContext from '@contexts/course/VSBContext'
import { Listbox } from '@headlessui/react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsUpDownIcon,
} from '@heroicons/react/24/solid'
import { SemesterType } from '@typing'
import { capitalize, displayYear } from '@utils/formatting'
import { useContext } from 'react'

const ScheduleHeader = ({
  year,
  semesters,
}: {
  year: number
  semesters: SemesterType[]
}) => {
  const { course, comboNum, setComboNum, semester, setSemester } =
    useContext(VSBContext)

  return (
    <div className='pb-3 flex flex-row flex-wrap items-center gap-4 border-b'>
      <div className='text-2xl flex items-center mr-2'>
        <span className='font-medium'>Schedule</span>&nbsp;&nbsp;
        <div className='font-light relative hover:bg-gray-100 hover:border-gray-300 rounded-xl transition outline-none'>
          <Listbox value={semester} onChange={setSemester}>
            <Listbox.Button className='border-transparent border px-4 outline-none'>
              <div className='flex flex-row items-center gap-x-3'>
                <div>
                  {capitalize(semester)} {displayYear(year, semester)}
                </div>
                <ArrowsUpDownIcon className='w-6 h-6 text-gray-600' />
              </div>
            </Listbox.Button>
            <Listbox.Options className='absolute top-10 z-10 w-72 bg-white border rounded-xl py-2 text-lg font-normal cursor-pointer shadow-lg outline-none'>
              {semesters.map((sem, idx) => (
                <Listbox.Option
                  value={sem}
                  className='py-2 px-4 hover:bg-blue-50 hover:text-blue-600 outline-none'
                  key={idx}
                >
                  {capitalize(sem)} {displayYear(year, sem)}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>

      {course.blocks.length > 1 && (
        <div className='flex flex-row items-center gap-4'>
          <button
            className='p-2 rounded-full bg-gray-50'
            onClick={() => {
              if (comboNum > 0) setComboNum(comboNum - 1)
              else setComboNum(course.combos.length - 1)
            }}
          >
            <ArrowLeftIcon className='w-4 h-4' />
          </button>
          <div className='text-xl'>
            {comboNum + 1} / {course.combos.length}
          </div>
          <button
            className='p-2 rounded-full bg-gray-50'
            onClick={() => {
              if (comboNum < course.combos.length - 1) setComboNum(comboNum + 1)
              else setComboNum(0)
            }}
          >
            <ArrowRightIcon className='w-4 h-4' />
          </button>
        </div>
      )}
    </div>
  )
}

export default ScheduleHeader
