import { CourseType } from '@typing'
import { createContext } from 'react'

const CoursesContext = createContext<{ courses: CourseType[] }>(null)

export default CoursesContext
