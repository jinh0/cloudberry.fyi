/**
 * user.tsx: User info page
 */

import Main from '@components/Main'
import Title from '@components/Title'
import SignOut from '@components/user/SignOut'
import UserInfo from '@components/user/UserInfo'
import LookupContext from '@contexts/LookupContext'
import { auth } from '@utils/firebase'
import { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth'

const User = () => {
  const [loggedIn, loading, error] = useAuthState(auth)
  const router = useRouter()

  if (loading || error) {
    return (
      <Main>
        {loading && <div>Loading...</div>}
        {error && <div>Something went wrong.</div>}
      </Main>
    )
  }

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
