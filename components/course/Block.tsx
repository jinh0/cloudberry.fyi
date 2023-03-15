/**
 * @file VSB "block", i.e., section of a course
 */

import {
  MapPinIcon,
  ClipboardIcon,
  UserIcon,
  UserPlusIcon,
  UserGroupIcon,
  CheckIcon,
} from '@heroicons/react/24/outline'
import { Tooltip } from '@mantine/core'
import { VSBBlock } from '@typing'
import { NUM_TO_DAY } from '@utils/vsb'
import { useEffect, useState } from 'react'
import GetASeat from './GetASeat'

const Block = ({ code, block }: { code: string; block: VSBBlock }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false)
    }, 275)
    return () => clearTimeout(timeout)
  }, [copied])

  const copyText = text => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className='mb-8'>
      <p className='mb-4 flex flex-row items-center'>
        <span className='text-xl font-medium mr-3'>{block.display}</span>
        <span className='text-lg text-gray-700'>
          {block.teachers.join('; ')}
        </span>

        {block.remainingSeats <= 0 && <GetASeat code={code} block={block} />}
      </p>
      <div className='flex flex-row items-center flex-wrap mb-4 text-base lg:text-lg gap-y-2'>
        <div className='flex flex-row items-center text-gray-800 pr-3 mr-3 border-r'>
          <MapPinIcon className='w-5 h-5 mr-2' />

          <div className=''>
            {block.locations.length === 1 && block.locations[0] === ''
              ? 'No Location'
              : block.locations.join('; ')}
          </div>
        </div>
        <div
          className='flex flex-row items-center text-gray-800 pr-3 mr-3 border-r'
          onClick={() => {
            copyText(block.crn)
            setCopied(true)
          }}
        >
          <Tooltip
            label={copied ? 'Copied!' : 'Copy CRN'}
            color='dark'
            withArrow
            arrowPosition='center'
          >
            <button className='border-none rounded-md w-35 h-8 leading-8 hover:bg-slate-100 0 px-2 -mx-2'>
              <div>
                {copied ? (
                  <div className='border-none rounded flex items-center'>
                    <CheckIcon className='w-5 h-5 mr-2 text-green-700' />
                    CRN: {block.crn}
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <ClipboardIcon className='w-5 h-5 mr-2' />
                    CRN: {block.crn}
                  </div>
                )}
              </div>
            </button>
          </Tooltip>
        </div>

        {block.remainingSeats > 0 && (
          <div className='flex flex-row items-center text-gray-800 pr-3 mr-3 border-r last:border-none'>
            <UserIcon className='w-5 h-5 mr-2' />
            <div>Remaining: {block.remainingSeats}</div>
          </div>
        )}

        {block.remainingSeats === 0 && (
          <div className='flex flex-row items-center text-red-700 pr-3 mr-3 border-r last:border-none'>
            <UserIcon className='w-5 h-5 mr-2' />
            <div>Remaining: {block.remainingSeats}</div>
          </div>
        )}

        {block.remainingSeats < 0 && (
          <div className='flex flex-row items-center text-red-700 pr-3 mr-3 border-r last:border-none'>
            <UserGroupIcon className='w-5 h-5 mr-2' />
            <div>Full: +{-block.remainingSeats}</div>
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

      <div className='mt-4'>
        {block.schedule.map((timeblock, idx) => (
          <div key={idx}>
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

export default Block
