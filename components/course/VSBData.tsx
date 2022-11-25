import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClipboardIcon,
  MapIcon,
  MapPinIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'
import { VSBBlock, VSBCourse } from '@typing'
import { useState } from 'react'

const VSBData = ({ data }: { data: VSBCourse }) => {
  const [idx, setIdx] = useState(0)

  if (!data) return <></>

  const course = data

  if (!course.blocks || course.blocks.length === 0) return <></>

  return (
    <div className='mt-8 mb-4'>
      <div className='mb-6 flex flex-row items-center gap-4'>
        <div className='text-2xl flex items-center'>Schedule</div>
        <div className='flex flex-row items-center gap-4'>
          <button
            className='p-2 rounded-xl bg-gray-100'
            onClick={() => {
              if (idx > 0) setIdx(idx - 1)
            }}
          >
            <ArrowLeftIcon className='w-4 h-4' />
          </button>
          <div className='text-xl'>
            {idx + 1} of {course.combos.length}
          </div>
          <button
            className='p-2 rounded-xl bg-gray-100'
            onClick={() => {
              if (idx < course.combos.length - 1) setIdx(idx + 1)
            }}
          >
            <ArrowRightIcon className='w-4 h-4' />
          </button>
        </div>
      </div>

      <div>
        {course.blocks
          .filter(block => course.combos[idx].includes(block.crn))
          .map(block => (
            <Block block={block} />
          ))}
      </div>
    </div>
  )
}

const Block = ({ block }: { block: VSBBlock }) => {
  return (
    <div className='mb-8'>
      <p className='mb-4 flex flex-row items-center'>
        <span className='text-xl font-semibold mr-3'>{block.display}</span>
        <span className='text-lg text-gray-700'>
          {block.teachers.join('; ')}
        </span>
      </p>
      <div className='flex flex-row items-center flex-wrap mb-4 text-base lg:text-lg gap-y-2'>
        <div className='flex flex-row items-center text-gray-800 pr-3 mr-3 border-r'>
          <MapPinIcon className='w-5 h-5 mr-2' />
          <div>{block.locations.join('; ')}</div>
        </div>
        <div className='flex flex-row items-center text-gray-800 pr-3 mr-3 border-r'>
          <ClipboardIcon className='w-5 h-5 mr-2' />
          <div>CRN: {block.crn}</div>
        </div>
        {block.remainingSeats > 0 ? (
          <div className='flex flex-row items-center text-gray-800 pr-3 mr-3 border-r last:border-none'>
            <UserIcon className='w-5 h-5 mr-2' />
            <div>Remaining: {block.remainingSeats}</div>
          </div>
        ) : (
          <div className='flex flex-row items-center text-red-700 pr-3 mr-3 border-r last:border-none'>
            <UserIcon className='w-5 h-5 mr-2' />
            <div>Remaining: {block.remainingSeats}</div>
          </div>
        )}
        {block.waitlistCap > 0 && (
          <div className='flex flex-row items-center mr-4 text-gray-800'>
            <UserPlusIcon className='w-5 h-5 mr-2' />
            <div>
              Waitlist: {block.waitlistCap - block.waitlistRem} /{' '}
              {block.waitlistCap}
            </div>
          </div>
        )}
      </div>
      {/* <p className='mb-2'>{block.teachers.join('; ')}</p> */}

      <div className='mt-4'>
        {block.schedule.map(timeblock => (
          <div>
            <span className='font-medium'>{NUM_TO_DAY[timeblock.day]}:</span>{' '}
            {minToStr(timeblock.t1)} - {minToStr(timeblock.t2)}
          </div>
        ))}
      </div>
    </div>
  )
}

const minToStr = (time: number) => {
  const hours = Math.floor(time / 60)
  const minutes = time % 60

  return `${hours > 12 ? hours % 12 : hours}:${
    minutes < 10 ? '0' + String(minutes) : minutes
  } ${hours >= 12 ? 'PM' : 'AM'}`
}

const NUM_TO_DAY = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
}

export default VSBData
