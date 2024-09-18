import { BookmarkIcon } from '@heroicons/react/24/solid'
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline'
import useUser from '@hooks/useUser'
import { Children } from '@typing'
import { updateDoc } from 'firebase/firestore'

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

const SaveButton = ({ code }: { code: string }) => {
  const { user, data: userData } = useUser()

  // TODO: Clean up this mess

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

  return (
    <div className='text-base ml-4'>
      {user && userData.saved && userData.saved.find(x => x === code) ? (
        <Button onClick={remove('saved')}>
          <BookmarkIcon className='w-7 h-7 text-red-600' />
        </Button>
      ) : (
        <Button onClick={add('saved')}>
          <BookmarkIconOutline className='w-7 h-7' />
          {/* Save */}
        </Button>
      )}
    </div>
  )
}

export default SaveButton
