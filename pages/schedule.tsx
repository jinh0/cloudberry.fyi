import Search from '@components/schedule/Search'
import SearchResults from '@components/schedule/SearchResults'
import ScheduleContext from '@contexts/ScheduleContext'
import { useState } from 'react'
import Main from '../components/Main'

const WeeklyView = () => {
  return <div className='w-full md:w-1/2 border flex-grow'></div>
}

const Scheduler = () => {
  const [blocks, setBlocks] = useState([])
  const [scheduleCourses, setCourses] = useState([])

  return (
    <ScheduleContext.Provider value={{ scheduleCourses, setCourses }}>
      <div className='w-full flex flex-col md:flex-row md:flex-wrap'>
        <div className='w-full md:w-1/2'>
          <Search />
          <SearchResults />
        </div>
        <WeeklyView />
      </div>
    </ScheduleContext.Provider>
  )
}

const Schedule = () => {
  return (
    <Main>
      Coming soon!
      {/* <Scheduler /> */}
    </Main>
  )
}

export default Schedule
