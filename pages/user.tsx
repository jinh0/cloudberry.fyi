/**
 * user.tsx: User info page
 */

import Main from '@components/Main'
import Title from '@components/Title'
import UserInfo from '@components/user/UserInfo'
import { auth } from '@utils/firebase'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

const SignOut = () => {
  const router = useRouter()

  const signOut = () => {
    auth.signOut()
    router.push('/')
  }

  return (
    <div className='mt-4'>
      <button onClick={signOut} className='border rounded-full px-6 py-2'>
        Sign out
      </button>
    </div>
  )
}

const User = () => {
  const router = useRouter()
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

  // If the user is not logged in, redirect him/her
  if (!loggedIn) {
    router.push('/')
    return <></>
  }

  return (
    <Main>
      <Title>User Info</Title>

      {loggedIn && <UserInfo />}

      <SignOut />
    </Main>
  )
}

export default User
