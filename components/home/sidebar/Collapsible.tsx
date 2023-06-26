import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

const Collapsible = ({ header, children }) => {
  return (
    <Disclosure defaultOpen={true}>
      {({ open }) => (
        <>
          <Disclosure.Button className='w-full flex flex-row justify-between items-center text-2xl font-medium py-2 transition'>
            <div className='flex flex-row items-center'>{header}</div>

            {open ? (
              <div className=''>
                <ChevronUpIcon className='w-6 h-6' />
              </div>
            ) : (
              <div className=''>
                <ChevronDownIcon className='w-6 h-6' />
              </div>
            )}
          </Disclosure.Button>

          <Disclosure.Panel>{children}</Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Collapsible
