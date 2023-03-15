import UserContext from '@contexts/UserContext'
import useCourse from '@hooks/useCourse'
import Link from 'next/link'
import { useContext } from 'react'
import CourseCard from './CourseCard'

const UserInfo = () => {
  const { user, loading, error } = useContext(UserContext)

  if (loading) return <div>Loading...</div>
  if (error || !user) return <div>Something went wrong.</div>

  const { name, email, saved, completed, current } = user.data()

  return (
    <div className='flex flex-col'>
      <p>
        <span className='font-bold'>Name:</span> {name}
      </p>
      <p>
        <span className='font-bold'>Email:</span> {email}
      </p>

      <div className='mt-8'>
        <p className='text-2xl mb-4'>Saved Courses</p>

        <div className='flex flex-row gap-x-4 overflow-x-auto snap-x snap-mandatory'>
          {saved && saved.map(code => <CourseCard key={code} code={code} />)}
        </div>
      </div>

      <div className='mt-8'>
        <p className='text-2xl mb-4'>Completed Courses</p>

        <div className='flex flex-row gap-x-4 overflow-x-auto snap-x snap-mandatory'>
          {completed &&
            completed.map(code => <CourseCard key={code} code={code} />)}
        </div>
      </div>

      <div className='mt-8'>
        <p className='text-2xl mb-4'>Currently Taking</p>

        <div className='flex flex-row gap-x-4 overflow-x-auto snap-x snap-mandatory'>
          {current &&
            current.map(code => <CourseCard key={code} code={code} />)}
        </div>
      </div>
    </div>
  )
}

export default UserInfo
