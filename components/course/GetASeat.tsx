import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import useUser from '@hooks/useUser'
import { load } from '@lyrasearch/lyra'
import { VSBBlock } from '@typing'
import { db, firestore } from '@utils/firebase'
import { addDoc, deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'

function GetASeat({ code, block }: { code: string; block: VSBBlock }) {
  const { user, data } = useUser()

  const [waiter, loading] = useDocument(
    user ? doc(db.waiters, `${user.id}-${code}`) : null
  )

  const [waiting, setWaiting] = useState(false)

  useEffect(() => {
    setWaiting(
      waiter && waiter?.exists() && waiter?.data().status === 'pending'
    )
  }, [waiter])

  const submit = async () => {
    if (user) {
      await setDoc(doc(db.waiters, `${user.id}-${code}`), {
        uid: user.id,
        email: data.email,
        code: code.toUpperCase(),
        crn: block.crn as `${number}`,
        status: 'pending',
        ctime: Timestamp.now(),
        ftime: null,
      })
    }
  }

  const unsubmit = async () => {
    if (user) {
      await deleteDoc(doc(db.waiters, `${user.id}-${code}`))
    }
  }

  const handleClick = () => {
    if (waiting) {
      unsubmit()
      setWaiting(false)
    } else {
      submit()
      setWaiting(true)
    }
  }

  // TODO: SHOW EVEN IF THERE IS NO USER
  if (!user || loading) {
    return <></>
  }

  return (
    <>
      <button onClick={handleClick}>
        {waiting ? (
          <div className='rounded-full ml-4 px-3 py-1 transition border border-transparent text-yellow-600 bg-yellow-100 flex flex-row items-center'>
            <BellAlertIcon className='w-6 h-6' />
            <div className='ml-2'>Waiting</div>
          </div>
        ) : (
          <div className='rounded-full ml-4 px-3 py-1 transition border border-yellow-600 hover:bg-yellow-100 text-yellow-600 flex flex-row items-center'>
            <BellIcon className='w-6 h-6' />
            <div className='ml-2'>Get a Seat!</div>
          </div>
        )}
      </button>
    </>
  )
}

export default GetASeat
