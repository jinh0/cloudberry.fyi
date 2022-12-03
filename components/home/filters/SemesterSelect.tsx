import { useState, Fragment } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const people = [
  { id: 0, name: 'All Semesters' },
  { id: 1, name: 'Fall 2022' },
  { id: 2, name: 'Winter 2023' },
  { id: 3, name: 'Not Offered' },
]

const SemesterSelect = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <div className='relative mr-2'>
      <Listbox value={selectedPerson} onChange={setSelectedPerson}>
        <div className='flex flex-row items-start'>
          <Listbox.Button
            className='border rounded-full px-4 py-1 outline-none placeholder-gray-600 w-fit flex flex-row items-start text-gray-600'
            placeholder='Semester'
          >
            {selectedPerson.name}
          </Listbox.Button>
        </div>

        <Listbox.Options className='absolute bg-white border rounded-xl py-2 mt-2 w-72 overflow-auto shadow outline-none'>
          {people.map(person => (
            /* Use the `active` state to conditionally style the active option. */
            /* Use the `selected` state to conditionally style the selected option. */
            <Listbox.Option key={person.id} value={person} as={Fragment}>
              {({ active, selected }) => (
                <div
                  className={
                    'px-4 py-2 flex flex-row items-center outline-none ' +
                    `${
                      active
                        ? 'cursor-pointer bg-yellow-50 text-yellow-700'
                        : 'bg-white text-black'
                    }`
                  }
                >
                  {/*
                    {selected && <CheckIcon className='w-4 h-4 mr-2' />}
                  */}
                  <span>{person.name}</span>
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
