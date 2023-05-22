import Search from '@components/schedule/Search'
import SearchResults from '@components/schedule/SearchResults'
import LookupContext from '@contexts/LookupContext'
import ScheduleContext from '@contexts/ScheduleContext'
import useLookup from '@hooks/useLookup'
import { useState } from 'react'
import Main from '../components/Main'
import { useQuery } from '@tanstack/react-query'
import { VSBFullCourse } from '@typing'
import Timetable from '@components/schedule/Timetable'

const Schedule = () => {
  const [scheduleCourses, setCourses] = useState<VSBFullCourse[]>([])

  return (
    <Main>
      <ScheduleContext.Provider value={{ scheduleCourses, setCourses }}>
        <div className='h-full w-full flex flex-col md:flex-row space-x-8'>
          <div className='w-full md:w-1/2'>
            <div className='mb-2'>Fall 2023</div>
            <Search />
            <SearchResults />
          </div>
          <div className='w-full md:w-1/2 h-full'>
            <Timetable courses={scheduleCourses} />
          </div>
        </div>
      </ScheduleContext.Provider>
    </Main>
  )
}

export default Schedule
