import { SemesterType, VSBCourse } from '@typing'
import { createContext, Dispatch, SetStateAction } from 'react'

const VSBContext = createContext<{
  course: VSBCourse
  comboNum: number
  setComboNum: Dispatch<SetStateAction<number>>
  semester: SemesterType
  setSemester: Dispatch<SetStateAction<SemesterType>>
}>(null)

export default VSBContext
