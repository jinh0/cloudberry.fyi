import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import Fuse from 'fuse.js'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import subjectsData, { Subject } from '@utils/subjects'

const fuse = new Fuse(subjectsData, {
  keys: ['code', 'title'],
  isCaseSensitive: false,
})

const Subjects = ({
  subjects,
  setSubjects,
}: {
  subjects: Subject[]
  setSubjects: Dispatch<SetStateAction<Subject[]>>
}) => {
  return (
    <div className='flex flex-row'>
      {subjects.map((subject, idx) => (
        <div key={idx} className='mr-2'>
          <div className='inline-flex w-full justify-between rounded-full px-4 py-1 border border-transparent bg-violet-100 text-violet-700 focus:outline-none mr-2'>
            <span className='font-bold'>{subject.code}:</span> {subject.title}
            <button
              onClick={() =>
                setSubjects(subjects.filter(x => x.code !== subject.code))
              }
            >
              <XMarkIcon className='w-6 h-6' />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const AutoFilter = () => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState<Subject>(null)
  const [query, setQuery] = useState('')

  const filteredSubjects =
    query === ''
      ? subjectsData.slice(0, 10)
      : fuse.search(query, { limit: 10 }).map(res => res.item)

  useEffect(() => {
    if (selectedSubject) {
      setSubjects(subjects.concat(selectedSubject))
      setSelectedSubject(null)
    }
  }, [selectedSubject])

  return (
    <>
      <div className='relative mr-2'>
        <Combobox
          value={selectedSubject}
          onChange={setSelectedSubject}
          nullable
        >
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
          <Combobox.Options className='absolute bg-white border rounded-xl p-1 mt-3 w-72 h-56 overflow-auto shadow'>
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

      <Subjects subjects={subjects} setSubjects={setSubjects} />
    </>
  )
}

export default AutoFilter
