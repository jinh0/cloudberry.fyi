import { faPagelines } from '@fortawesome/free-brands-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Semester = ({ sem }: { sem: 'fall' | 'winter' }) => {
  const convert = {
    fall: 'Fall 2022',
    winter: 'Winter 2023',
  }

  return (
    <div
      className={
        'flex flex-row items-center px-4 py-1 rounded-full mr-2 ' +
        (sem === 'fall' ? 'bg-red-50 text-red-600' : 'bg-sky-50 text-sky-600')
      }
    >
      <div className="mr-2">
        {sem === 'fall' ? (
          <FontAwesomeIcon icon={faPagelines} className="w-4 h-4" />
        ) : (
          <FontAwesomeIcon icon={faSnowflake} className="w-4 h-4" />
        )}
      </div>
      <div>{convert[sem]}</div>
    </div>
  )
}

export default Semester
