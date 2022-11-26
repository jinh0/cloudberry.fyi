import { faPagelines } from '@fortawesome/free-brands-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pill from './Pill'

/**
 * Semester component: pill-shaped label with
 * optional setting to show instructor
 */
const Semester = ({
  sem,
  showInstructor = false,
}: {
  sem: { term: 'fall' | 'winter'; instructors: string[] }
  showInstructor?: boolean
}) => {
  const convert = {
    fall: 'Fall 2022',
    winter: 'Winter 2023',
  }

  return (
    <div className='flex flex-row mb-2 items-center'>
      <Pill
        className={
          sem.term === 'fall'
            ? 'bg-red-50 text-red-600'
            : 'bg-sky-50 text-sky-600'
        }
        hasBorder={false}
      >
        <div className='mr-2'>
          {sem.term === 'fall' ? (
            <FontAwesomeIcon icon={faPagelines} className='w-4 h-4' />
          ) : (
            <FontAwesomeIcon icon={faSnowflake} className='w-4 h-4' />
          )}
        </div>

        <div className={showInstructor ? 'font-semibold' : ''}>
          {convert[sem.term]}{' '}
        </div>

        {showInstructor && (
          <div
            className={
              'ml-2 pl-2 border-l ' +
              (sem.term === 'fall' ? 'border-red-200' : 'border-sky-200')
            }
          >
            {sem.instructors.join('; ')}
          </div>
        )}
      </Pill>
    </div>
  )
}

export default Semester
