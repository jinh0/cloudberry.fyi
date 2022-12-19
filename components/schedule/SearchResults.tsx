import ScheduleContext from '@contexts/ScheduleContext'
import { useContext } from 'react'

const SearchResults = () => {
  const { scheduleCourses } = useContext(ScheduleContext)

  return (
    <div className='mt-4'>
      {scheduleCourses.map(code => (
        <p>{code}</p>
      ))}
    </div>
  )
}

export default SearchResults
