import { Dispatch, SetStateAction } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Subject } from '@utils/subjects'

const SelectedSubjects = ({
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

export default SelectedSubjects
