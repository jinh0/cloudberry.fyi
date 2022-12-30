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
        <div className='mt-2 flex flex-col gap-y-2'>
          {prereqsOf.map(code => (
            <div key={code} className='hover:underline w-fit'>
              <Link href={`/courses/${code}`}>
                <>
                  <span className='font-semibold'>{format(code)}:</span>{' '}
                  {lookup.get(code)}
                </>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default PrereqsOf
