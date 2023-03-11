import lookup from '@utils/lookup'
import Link from 'next/link'
import { useState } from 'react'

const PrereqsOf = ({ prereqsOf }: { prereqsOf: string[] }) => {
  const [opened, setOpened] = useState(false)
  const format = (code: string) => code.replace('-', ' ').toUpperCase()

  if (prereqsOf.length <= 0) return <></>

  return (
    <>
      <div className='mt-4'>
        This course is a prerequisite for{' '}
        <span
          className='underline cursor-pointer'
          onClick={() => setOpened(!opened)}
        >
          {prereqsOf.length} {prereqsOf.length > 1 ? 'courses' : 'course'}
        </span>
        .
      </div>

      {opened && (
        <ul className='mt-2 flex flex-col gap-y-2 pl-6 list-disc'>
          {prereqsOf.map(code => (
            <li key={code} className='w-fit'>
              <Link href={`/courses/${code}`}>
                <>
                  <span className='font-semibold'>{format(code)}</span>{' '}
                  {lookup.get(code)}
                </>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default PrereqsOf
