import UserContext from '@contexts/UserContext'
import { UserType } from '@typing'
import { useContext } from 'react'

const UserInfo = () => {
  const { user, loading, error } = useContext(UserContext)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !user) {
    return <div>Something went wrong.</div>
  }

  const { name, email, saved, completed } = user.data() as UserType

  return (
    <div>
      <p>
        <span className='font-bold'>Name:</span> {name}
      </p>
      <p>
        <span className='font-bold'>Email:</span> {email}
      </p>

      <p>
        <span className='font-bold'>Saved:</span>{' '}
        {saved && saved.map((x) => <span>{x}</span>)}
      </p>

      <p>
        <span className='font-bold'>Completed:</span>{' '}
        {completed && completed.map((x) => <span>{x}</span>)}
      </p>
    </div>
  )
}

export default UserInfo
