import UserContext from '@contexts/UserContext'
import { useContext } from 'react'

function useUser() {
  const { user } = useContext(UserContext)
  return { user, data: user?.data() }
}

export default useUser
