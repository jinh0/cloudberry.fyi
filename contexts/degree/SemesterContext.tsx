import { SemesterType, DegreeCourse } from '@typing'
import { createContext } from 'react'

export type SemesterProps = {
  year: number
  semester: SemesterType
  courses: DegreeCourse[]
}

const SemesterContext = createContext<SemesterProps>(null)

export default SemesterContext
