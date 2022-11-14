import Main from '@components/Main'
import Title from '@components/Title'
import app from '@utils/firebase'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import { collection, doc } from 'firebase/firestore'

const User = () => {
  const auth = getAuth(app)
  const [loggedIn, loading, error] = useAuthState(auth)
  const router = useRouter()

  // const [user] = useDocument(doc(collection(db, 'users'), auth.currentUser.uid))

  // console.log(user)

  // const user = collection('users').auth.currentUser.uid

  if (loading || error) {
    return (
      <Main>
        <div>Loading...</div>
      </Main>
    )
  }

  if (!loggedIn) {
    router.push('/')

    return (
      <Main>
        <div>Loading...</div>
      </Main>
    )
  }

  const signOut = () => {
    auth.signOut()
  }

  return (
    <Main>
      <Title>User Info</Title>

      <div>
        <button onClick={signOut} className="border rounded-full px-6 py-2">
          Sign out
        </button>
      </div>
    </Main>
  )
}

export default User
