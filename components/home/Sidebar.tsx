/**
 * /components/home/Saved.tsx: User's saved list component
 */

import UserContext from '@contexts/UserContext'
import { BellIcon, BookmarkIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import SavedCourse from './SavedCourse'
import useWaiting from '@hooks/useWaiting'
import Collapsible from './sidebar/Collapsible'
import Saved from './sidebar/Saved'
import Waiting from './sidebar/Waiting'

const Sidebar = () => {
  const { user, loading, error } = useContext(UserContext)
  const { waitingCourses } = useWaiting(user)

  if (loading || error || !user)
    return <div className='hidden lg:w-1/3 lg:pl-12'></div>

  const { saved } = user.data()

  return (
    <>
      <Waiting courses={waitingCourses} />
      <Saved courses={saved} />
    </>
  )
}

export default Sidebar
