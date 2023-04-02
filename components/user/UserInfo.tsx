import LookupContext from '@contexts/LookupContext'
import UserContext from '@contexts/UserContext'
import useLookup from '@hooks/useLookup'
import { db } from '@utils/firebase'
import { getDocs, query, where } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import CourseList from './CourseList'

const UserInfo = () => {
  const { user, loading, error } = useContext(UserContext)
  const [waitingCourses, setWaitingCourses] = useState([])
  const { lookup, isLoading: isLookupLoading } = useLookup()

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

  if (loading) return <div>Loading...</div>
  if (error || !user) return <div>Something went wrong.</div>

  const { name, email, saved, completed, current } = user.data()

  return (
    <LookupContext.Provider value={{ lookup, isLoading: isLookupLoading }}>
      <div className='flex flex-col'>
        <p>
          <span className='font-bold'>Name:</span> {name}
        </p>
        <p>
          <span className='font-bold'>Email:</span> {email}
        </p>

        <CourseList name='Saved' courses={saved} />
        <CourseList name='Completed' courses={completed} />
        <CourseList name='Currently Taking' courses={current} />

        <div className='mt-8'>
          <p className='text-2xl mb-4'>Waitlisted Courses</p>
          <div className='flex flex-row gap-x-4 overflow-x-auto snap-x snap-mandatory'>
            {waitingCourses &&
              waitingCourses.map(course => (
                <CourseCard key={course.id} code={course.code} />
              ))}
          </div>
        </div>
      </div>
    </LookupContext.Provider>
  )
}

export default UserInfo
