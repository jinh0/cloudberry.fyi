import { SemesterType, DegreeCourse } from '@typing'
import { createContext, Dispatch, SetStateAction } from 'react'

export type SemesterProps = {
  year: number
  semester: SemesterType
  courses: DegreeCourse[]
  setCourses: Dispatch<SetStateAction<DegreeCourse[]>>
}

const SemesterContext = createContext<SemesterProps>(null)

export default SemesterContext
