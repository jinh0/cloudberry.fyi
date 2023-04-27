import { faPagelines } from '@fortawesome/free-brands-svg-icons'
import {
  faSnowflake,
  faSun,
  faUmbrellaBeach,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pill from './Pill'

/**
 * Semester component: pill-shaped label with
 * optional setting to show instructor
 */
const Semester = ({
  sem,
  showInstructor = false,
  year,
}: {
  sem: { term: 'fall' | 'winter' | 'summer'; instructors: string[] }
  showInstructor?: boolean
  year: number
}) => {
  const convert = {
    fall: `Fall ${year}`,
    winter: `Winter ${year + 1}`,
    summer: `Summer ${year + 1}`,
  }

  // TODO: Just combine all color, icon, and border into one dictionary
  const color = (term: 'fall' | 'winter' | 'summer') => {
    const lookup = {
      fall: 'bg-red-50 text-red-600',
      winter: 'bg-sky-50 text-sky-600',
      summer: 'bg-orange-50 text-orange-600',
    }

    return lookup[term]
  }

  const icon = (term: 'fall' | 'winter' | 'summer') => {
    const lookup = {
      fall: <FontAwesomeIcon icon={faPagelines} className='w-4 h-4' />,
      winter: <FontAwesomeIcon icon={faSnowflake} className='w-4 h-4' />,
      summer: <FontAwesomeIcon icon={faSun} className='w-4 h-4' />,
    }

    return lookup[term]
  }

  const border = (term: 'fall' | 'winter' | 'summer') => {
    const lookup = {
      fall: 'border-red-200',
      winter: 'border-sky-200',
      summer: 'border-orange-200',
    }

    return lookup[term]
  }

  return (
    <div className='flex flex-row flex-wrap items-center'>
      <Pill className={color(sem.term)} hasBorder={false}>
        <div className='mr-2'>{icon(sem.term)}</div>

        <div
          className={
            showInstructor
              ? 'font-semibold pr-2 mr-2 border-r ' + border(sem.term)
              : ''
          }
        >
          {convert[sem.term]}{' '}
        </div>

        {showInstructor && (
          <div className={'' + border(sem.term)}>
            {sem.instructors.length > 0
              ? sem.instructors.join('; ')
              : 'No instructors assigned'}
          </div>
        )}
      </Pill>
    </div>
  )
}

export default Semester
