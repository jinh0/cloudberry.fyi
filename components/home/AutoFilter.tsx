import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import subjectsData from '@utils/subjects.json'
import { Combobox } from '@headlessui/react'
import Fuse from 'fuse.js'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'

type Course = {
  code: string
  title: string
}

const subjects: Course[] = Object.entries(
  subjectsData as Record<string, string>
).map(([code, title]) => ({ code, title }))

const fuse = new Fuse(subjects, {
  keys: ['code', 'title'],
  isCaseSensitive: false,
})

const Subjects = ({
  subjects,
  setSubjects,
}: {
  subjects: Course[]
  setSubjects: Dispatch<SetStateAction<Course[]>>
}) => {
  return (
    <div className='flex flex-row'>
      {subjects.map((subject, idx) => (
        <div key={idx} className='mr-2'>
          <div className='inline-flex w-full justify-between rounded-full px-4 py-1 border border-transparent bg-violet-100 text-violet-700 focus:outline-none mr-2'>
            {subject.code}: {subject.title}
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
  const [opened, setOpened] = useState(false)
  const [subjects, setSubjects] = useState<Course[]>([])
  const [selectedSubject, setSelectedSubject] = useState<Course>(null)
  const [query, setQuery] = useState('')

  const filteredSubjects =
    query === ''
      ? subjects.slice(0, 10)
      : fuse.search(query, { limit: 10 }).map(res => res.item)

  useEffect(() => {
    setOpened(false)

    if (selectedSubject) {
      setSubjects(subjects.concat(selectedSubject))
      setSelectedSubject(null)
    }
  }, [selectedSubject])

  if (!opened) {
    return (
      <>
        <div className='relative inline-block text-left mr-2 outline-none'>
          <div>
            <button
              onClick={() => {
                setSelectedSubject(null)
                setOpened(!opened)
              }}
              className='inline-flex w-full justify-between rounded-full border bg-white px-4 py-1 text-gray-700 focus:outline-none mr-2'
            >
              Subject
              <ChevronDownIcon className='w-6 h-6' />
            </button>
          </div>
        </div>

        <Subjects subjects={subjects} setSubjects={setSubjects} />
      </>
    )
  }
  console.log('asdf')

  return (
    <>
      <div className='relative mr-2'>
        <Combobox
          value={selectedSubject}
          onChange={setSelectedSubject}
          nullable
        >
          {({ activeOption }) => (
            <>
              <Combobox.Input
                onChange={event => setQuery(event.target.value)}
                onBlur={() => {
                  if (query === '') {
                    console.log('wtf')
                    setOpened(false)
                  }
                }}
                className='border rounded-full px-4 py-1 w-fit outline-none'
                autoFocus={true}
                autoCorrect='off'
                autoComplete='off'
                placeholder='Subject Code'
                displayValue={(item: Course) => item && item.code}
              />
              <Combobox.Options className='absolute bg-white border rounded-xl p-1 mt-3 w-96 h-56 overflow-auto'>
                {filteredSubjects.map(({ code, title }, idx) => (
                  <Combobox.Option
                    key={idx}
                    value={{ code, title }}
                    onClick={() => {
                      setSelectedSubject({ code, title })
                      setQuery('')
                    }}
                  >
                    {() => (
                      <div className='cursor-pointer hover:bg-violet-500 hover:text-white p-2 rounded-xl'>
                        <span className='font-bold mr-1'>{code}</span> {title}
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </>
          )}
        </Combobox>
      </div>

      <Subjects subjects={subjects} setSubjects={setSubjects} />
    </>
  )
}

export default AutoFilter
