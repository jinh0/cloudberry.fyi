import { VSBBlock, VSBFullCourse } from '@typing'
import { createContext, Dispatch, SetStateAction } from 'react'

const ScheduleContext = createContext<{
  scheduleCourses: VSBFullCourse[]
  setCourses: Dispatch<SetStateAction<VSBFullCourse[]>>
}>(null)

export default ScheduleContext
