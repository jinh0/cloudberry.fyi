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

  const { name, email, saved, completed, current } = user.data() as UserType

  return (
    <div>
      <p>
        <span className='font-bold'>Name:</span> {name}
      </p>
      <p>
        <span className='font-bold'>Email:</span> {email}
      </p>

      <p>
        <span className='font-bold'>Saved:</span> {saved && saved.join(', ')}
      </p>

      <p>
        <span className='font-bold'>Completed:</span>{' '}
        {completed && completed.join(', ')}
      </p>

      <p>
        <span className='font-bold'>Current:</span>{' '}
        {current && current.join(', ')}
      </p>
    </div>
  )
}

export default UserInfo
