import { UserType, WaiterType } from '@typing'
import { db } from '@utils/firebase'
import { query, where, getDocs, DocumentSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useWaiting = (
  user: DocumentSnapshot<UserType> | null
): { waitingCourses: WaiterType[] } => {
  const [waitingCourses, setWaitingCourses] = useState([])

  useEffect(() => {
    if (user) {
      const queryCourses = query(db.waiters, where('uid', '==', user.id))

      getDocs(queryCourses).then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setWaitingCourses(data.filter(course => course.status === 'pending'))
      })
    }
  }, [user])

  return {
    waitingCourses,
  }
}

export default useWaiting
