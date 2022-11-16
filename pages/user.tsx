import Main from '@components/Main'
import Title from '@components/Title'
import UserInfo from '@components/user/UserInfo'
import app from '@utils/firebase'
import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

const User = () => {
  const router = useRouter()
  const auth = getAuth(app)
  const [loggedIn, loading, error] = useAuthState(auth)

  if (loading) {
    return (
      <Main>
        <div>Loading...</div>
      </Main>
    )
  }

  if (error) {
    return (
      <Main>
        <div>Something went wrong.</div>
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
    router.push('/')
  }

  return (
    <Main>
      <Title>User Info</Title>

      {loggedIn && <UserInfo />}

      <div className='mt-4'>
        <button onClick={signOut} className='border rounded-full px-6 py-2'>
          Sign out
        </button>
      </div>
    </Main>
  )
}

export default User
