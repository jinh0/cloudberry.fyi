import UserContext from '@contexts/UserContext'
import {
  BookmarkIcon,
  CheckBadgeIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import {
  BookmarkIcon as BookmarkSolidIcon,
  CheckBadgeIcon as CheckBadgeSolidIcon,
  PencilIcon as PencilSolidIcon,
} from '@heroicons/react/24/solid'
import { updateDoc } from 'firebase/firestore'
import { Children, UserType } from '@typing'
import { useContext } from 'react'

const Button = ({
  children,
  onClick,
  isOn = false,
}: {
  children: Children
  onClick: any
  isOn?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      className={
        'flex flex-row gap-2 items-center text-gray-500 pr-4 py-1.5 transition duration-100 select-none ' +
        (isOn ? 'bg-gray-50' : '')
      }
    >
      {children}
    </button>
  )
}

const Actions = ({ code }: { code: string }) => {
  const { user } = useContext(UserContext)
  const userData = user?.data() as UserType

  // I like currying
  const add = (key: 'saved' | 'completed' | 'current') => async () => {
    if (user) {
      const data = {
        [key]: !userData[key]
          ? [code]
          : [...new Set(userData[key].concat(code))],
      }

      await updateDoc(user.ref, data)
    }
  }

  const remove = (key: 'saved' | 'completed' | 'current') => async () => {
    if (user) {
      const data = {
        [key]: !userData[key]
          ? []
          : [...new Set(userData[key].filter(x => x !== code))],
      }

      await updateDoc(user.ref, data)
    }
  }

  const complete = async () => {
    if (user) {
      const { current, completed } = userData
      if (current && current.find(x => x === code)) {
        await updateDoc(user.ref, {
          completed: !completed ? [code] : [...new Set(completed.concat(code))],
          current: [...new Set(current.filter(x => x !== code))],
        })

        return
      }

      await updateDoc(user.ref, {
        completed: !completed ? [code] : [...new Set(completed.concat(code))],
      })
    }
  }

  const addCurrent = async () => {
    if (user) {
      const { current, completed } = userData
      if (completed && completed.find(x => x === code)) {
        await updateDoc(user.ref, {
          current: !current ? [code] : [...new Set(current.concat(code))],
          completed: [...new Set(completed.filter(x => x !== code))],
        })

        return
      }

      await updateDoc(user.ref, {
        current: !current ? [code] : [...new Set(current.concat(code))],
      })
    }
  }

  return (
    <div className='mt-4'>
      <div className='flex flex-row gap-1'>
        {userData.saved && userData.saved.find(x => x === code) ? (
          <Button onClick={remove('saved')}>
            <BookmarkSolidIcon className='w-6 h-6 text-red-600' />
            <div className='text-red-600'>Saved</div>
          </Button>
        ) : (
          <Button onClick={add('saved')}>
            <BookmarkIcon className='w-6 h-6' />
            Save
          </Button>
        )}

        {userData.completed && userData.completed.find(x => x === code) ? (
          <Button onClick={remove('completed')}>
            <CheckBadgeSolidIcon className='w-6 h-6 text-green-600' />
            <div className='text-green-600'>Completed</div>
          </Button>
        ) : (
          <Button onClick={complete}>
            <CheckBadgeIcon className='w-6 h-6' />
            Completed
          </Button>
        )}

        {userData.current && userData.current.find(x => x === code) ? (
          <Button onClick={remove('current')}>
            <PencilSolidIcon className='w-6 h-6 text-blue-600' />
            <div className='text-blue-600'>Currently Taking</div>
          </Button>
        ) : (
          <Button onClick={addCurrent}>
            <PencilIcon className='w-6 h-6' />
            Currently Taking
          </Button>
        )}
      </div>
    </div>
  )
}

export default Actions
