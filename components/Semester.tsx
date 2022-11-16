import { faPagelines } from '@fortawesome/free-brands-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Semester = ({
  sem,
  showInstructor = false,
}: {
  sem: 'fall' | 'winter'
  showInstructor?: boolean
}) => {
  const convert = {
    fall: 'Fall 2022',
    winter: 'Winter 2023',
  }

  return (
    <div className='flex flex-row mb-2 items-center'>
      <div
        className={
          'flex flex-row w-fit items-center px-4 py-1 rounded-full mr-2 ' +
          (sem === 'fall' ? 'bg-red-50 text-red-600' : 'bg-sky-50 text-sky-600')
        }
      >
        <div className='mr-2'>
          {sem === 'fall' ? (
            <FontAwesomeIcon icon={faPagelines} className='w-4 h-4' />
          ) : (
            <FontAwesomeIcon icon={faSnowflake} className='w-4 h-4' />
          )}
        </div>
        <div className={showInstructor && 'font-semibold'}>{convert[sem]} </div>
        {showInstructor && (
          <div
            className={
              'ml-2 pl-2 border-l ' +
              (sem === 'fall' ? 'border-red-200' : 'border-sky-200')
            }
          >
            Joseph Vybihal
          </div>
        )}
      </div>
    </div>
  )
}

export default Semester
