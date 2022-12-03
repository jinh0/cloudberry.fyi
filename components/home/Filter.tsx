import { Transition } from '@headlessui/react'
import { BookmarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

const Filter = ({ name, options }: { name: string; options: string[] }) => {
  const [opened, setOpened] = useState(false)

  return (
    <div className='relative inline-block text-left mr-2 outline-none'>
      <div>
        <button
          onClick={() => setOpened(!opened)}
          className='inline-flex w-full justify-between rounded-full border bg-white px-4 py-1 text-gray-700 focus:outline-none mr-2'
        >
          {name}
          <ChevronDownIcon className='w-6 h-6' />
        </button>
      </div>
    </div>
  )
}

const Toggle = ({ name }: { name: string }) => {
  return (
    <div className='rounded-lg flex justify-center items-center'>{name}</div>
  )
}

export default Filter
