/**
 * @file VSB "block", i.e., section of a course
 */

import {
  MapPinIcon,
  ClipboardIcon,
  UserIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'
import { VSBBlock } from '@typing'

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

export default Block
