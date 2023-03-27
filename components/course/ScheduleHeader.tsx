import VSBContext from '@contexts/course/VSBContext'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'

const ScheduleHeader = () => {
  const { course, comboNum, setComboNum } = useContext(VSBContext)

  return (
    <div className='pb-3 flex flex-row flex-wrap items-center gap-4 border-b'>
      <div className='text-2xl flex items-center'>
        <span className='font-medium'>Schedule</span>&nbsp;&nbsp;
        <span className='font-light'>Winter 2023</span>
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
