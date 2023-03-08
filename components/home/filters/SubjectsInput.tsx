import { Combobox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import subjectsData, { Subject } from '@utils/subjects'
import Fuse from 'fuse.js'
import { Dispatch, SetStateAction, useState } from 'react'

const fuse = new Fuse(subjectsData, {
  keys: ['code', 'title'],
  isCaseSensitive: false,
})

const SubjectsInput = ({
  subjects,
  setSubjects,
}: {
  subjects: Subject[]
  setSubjects: Dispatch<SetStateAction<Subject[]>>
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(null)

  const onChange = (selected: Subject) => {
    if (selected) {
      localStorage.setItem(
        'subjects',
        JSON.stringify(subjects.concat(selected))
      )
      setSubjects(subjects.concat(selected))
      setSelectedSubject(null)
    }
  }

  const [query, setQuery] = useState('')

  const filteredSubjects =
    query === ''
      ? subjectsData.slice(0, 10)
      : fuse.search(query, { limit: 10 }).map(res => res.item)

  return (
    <div className='relative mr-2'>
      <Combobox value={selectedSubject} onChange={onChange} nullable>
        <div className='flex flex-row items-start'>
          <Combobox.Input
            onChange={event => setQuery(event.target.value)}
            className='border rounded-full px-4 py-1 outline-none placeholder-gray-600 w-48'
            autoCorrect='off'
            autoComplete='off'
            placeholder='Subject Code'
            displayValue={(item: Subject) => item && item.code}
          />

          <Combobox.Button className='absolute flex items-center right-0 inset-y-0 pr-4'>
            <ChevronDownIcon className='w-6 h-6 text-gray-500' />
          </Combobox.Button>
        </div>

        <Combobox.Options className='absolute bg-white border rounded-xl p-1 mt-2 w-72 h-56 overflow-auto shadow'>
          {filteredSubjects.map(({ code, title }, idx) => (
            <Combobox.Option key={idx} value={{ code, title }}>
              {({ selected, active }) => (
                <div
                  className={
                    'cursor-pointer hover:bg-violet-500 hover:text-white p-2 rounded-xl' +
                    (!selected && active ? ' bg-violet-500 text-white' : '')
                  }
                >
                  <span className='font-bold mr-1'>{code}</span> {title}
                </div>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  )
}

export default SubjectsInput
