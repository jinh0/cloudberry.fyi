import { Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

const Filter = ({ name, options }: { name: string; options: string[] }) => {
  const [opened, setOpened] = useState(false)

  return (
    <div className='relative inline-block text-left mr-2 outline-none'>
      <div>
        <button
          onClick={() => setOpened(!opened)}
          className='inline-flex w-full justify-center rounded-full border bg-white px-3 py-1 text-gray-700 focus:outline-none mr-2'
        >
          {name}
          <ChevronDownIcon className='w-6 h-6 ml-2' />
        </button>
      </div>

      {/* <Transition
        as={Fragment}
        show={opened}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-2xl border bg-white shadow-lg outline-none">
          <div className="py-1 outline-none">
            <span className={'text-gray-700' + 'block px-4 py-2 text-sm'}>
              Computer Science
            </span>
          </div>
        </div>
      </Transition> */}
    </div>
    // <div className="relative">
    //   <button
    //     onClick={toggle}
    //     className="px-3 py-1 rounded-full mr-2 border flex flex-row justify-between text-gray-700"
    //   >
    //     <p>{name}</p>
    //     <ChevronDownIcon className="w-6 h-6 ml-2" />
    //   </button>
    //   <div
    //     className={
    //       'bg-white absolute px-3 py-1 border mt-2 rounded-2xl ' +
    //       (opened ? 'animate-fadeIn' : 'hidden')
    //     }
    //   >
    //     <div>Computer Science</div>
    //   </div>
    // </div>
  )
}

const Filters = () => {
  return (
    <div className='flex flex-row'>
      <Filter name='Subject' options={[]} />
      <Filter name='Semester' options={[]} />
    </div>
  )
}

export default Filters
