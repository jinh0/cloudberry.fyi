import { UserType } from '@typing'
import app from '@utils/firebase'
import { doc, getFirestore } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'

const UserInfo = ({ uid }: { uid: string }) => {
  const [user, loading, error] = useDocument(
    doc(getFirestore(app), 'users', uid)
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !user) {
    return <div>Something went wrong.</div>
  }

  const { name, email, saved } = user.data() as UserType

  return (
    <div>
      <p>
        <span className='font-bold'>Name:</span> {name}
      </p>
      <p>
        <span className='font-bold'>Email:</span> {email}
      </p>

      <p>{saved && saved.map((x) => <span>{x}</span>)}</p>
    </div>
  )
}

export default UserInfo
