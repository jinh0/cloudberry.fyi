import { VSBCourse } from '@typing'
import { createContext, Dispatch, SetStateAction } from 'react'

const VSBContext =
  createContext<{
    course: VSBCourse
    comboNum: number
    setComboNum: Dispatch<SetStateAction<number>>
  }>(null)

export default VSBContext
