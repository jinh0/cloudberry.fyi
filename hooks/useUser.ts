import UserContext from '@contexts/UserContext'
import { UserType } from '@typing'
import { useContext } from 'react'

function useUser() {
  const { user } = useContext(UserContext)
  return { user, data: user?.data() as UserType }
}

export default useUser
