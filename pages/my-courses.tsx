/**
 * my-courses.tsx: Page to view user's courses (NOT MYCOURSES)
 * TODO: is this even worth it?
 */

import Main from '@components/Main'
import Title from '@components/Title'
import UserContext from '@contexts/UserContext'
import { UserType } from '@typing'
import { auth } from '@utils/firebase'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

const MyCourses = () => {
  const router = useRouter()

  const [loggedIn] = useAuthState(auth)
  const { user, loading, error } = useContext(UserContext)

  if (loading) return <Main>Loading...</Main>

  if (!loggedIn) {
    router.push('/signin')
    return <Main>You must be logged in!</Main>
  }

  if (error) return <Main>Something went wrong!</Main>

  const userData = user.data() as UserType
  const { saved, completed } = userData

  return (
    <Main>
      <Title>Saved</Title>
    </Main>
  )
}

export default MyCourses
