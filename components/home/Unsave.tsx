import UserContext from '@contexts/UserContext'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { UserType } from '@typing'
import { updateDoc } from 'firebase/firestore'
import { useContext } from 'react'

/**
 * Unsaves courses from home page
 */

const Unsave = ({ code }: { code: string }) => {
  const { user, loading, error } = useContext(UserContext)

  if (loading || error || !user) {
    return <div className='hidden lg:w-1/3 lg:pl-12'></div>
  }

  const removeFromSavedCourses = async (): Promise<void> => {
    const { saved } = user.data() as UserType

    await updateDoc(user.ref, {
      saved: saved.filter(savedCode => savedCode !== code),
    })
  }

  const dontGo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <button
      className='border-none rounded px-1 py-1 flex flex-row items-center transition duration-100'
      onClick={event => {
        removeFromSavedCourses()
        dontGo(event)
      }}
    >
      <div className=''>
        <XMarkIcon className='w-5 h-5 text-gray-500' />
      </div>
    </button>
  )
}

export default Unsave
