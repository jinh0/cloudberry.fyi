import app from '@utils/firebase'
import { doc, DocumentData, getFirestore } from 'firebase/firestore'
import { useDocument } from 'react-firebase-hooks/firestore'

type User = {
  name: string
  email: string
}

const UserInfo = ({ uid }: { uid: string }) => {
  const [user, loading, error] = useDocument(
    doc(getFirestore(app), 'users', uid)
  )

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Something went wrong.</div>
  }

  const { name, email } = user.data() as User

  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  )
}

export default UserInfo
