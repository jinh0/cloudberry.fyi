import { UserType } from '@typing'
import { createContext, Dispatch, SetStateAction } from 'react'

const UserContext = createContext<{
  user: UserType | null
  setUser: Dispatch<SetStateAction<UserType>>
} | null>(null)

export default UserContext
