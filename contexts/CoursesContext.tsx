import { CourseType } from '@typing'
import { createContext } from 'react'

const CoursesContext = createContext<{
  courses: CourseType[]
  isLoading: boolean
}>(null)

export default CoursesContext
