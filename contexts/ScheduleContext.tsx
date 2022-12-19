import { VSBBlock } from '@typing'
import { createContext, Dispatch, SetStateAction } from 'react'

const ScheduleContext = createContext<{
  scheduleCourses: string[]
  setCourses: Dispatch<SetStateAction<string[]>>
  blocks?: VSBBlock[]
  setBlocks?: Dispatch<SetStateAction<VSBBlock[]>>
}>(null)

export default ScheduleContext
