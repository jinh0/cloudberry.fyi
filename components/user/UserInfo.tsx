import LookupContext from '@contexts/LookupContext'
import UserContext from '@contexts/UserContext'
import useLookup from '@hooks/useLookup'
import { useContext, useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import useWaiting from '@hooks/useWaiting'

const UserInfo = () => {
  const { user, loading, error } = useContext(UserContext)
  const { lookup, isLoading: isLookupLoading } = useLookup()
  const { waitingCourses } = useWaiting(user)

  if (loading) return <div>Loading...</div>
  if (error || !user) return <div>Something went wrong.</div>

  const { name, email } = user.data()

  return (
    <LookupContext.Provider value={{ lookup, isLoading: isLookupLoading }}>
      <div className='flex flex-col'>
        <p>
          <span className='font-bold'>Name:</span> {name}
        </p>
        <p>
          <span className='font-bold'>Email:</span> {email}
        </p>

        {/* <CourseList name='Saved' courses={saved} />
        <CourseList name='Completed' courses={completed} />
        <CourseList name='Currently Taking' courses={current} /> */}

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
