import UserContext from '@contexts/UserContext'
import useCourse from '@hooks/useCourse'
import { UserType } from '@typing'
import { useContext } from 'react'

const CourseCard = ({ code }: { code: string }) => {
  const format = (code: string) => code?.replace('-', ' ').toUpperCase()

  const { data, isLoading } = useCourse(code)

  if (isLoading) {
    return (
      <div className='border rounded-lg p-2 mb-4'>
        <div className='w-full bg-gray-100 text-transparent select-none rounded-full animate-pulse'>
          XXX
        </div>
      </div>
    )
  }

  const course = data.result

  return (
    <div className='w-60 border rounded-lg p-2 px-4 flex-shrink-0 snap-start'>
      <p className='font-semibold'>{format(course.code)}</p>
      <p className=''>{course.name}</p>
    </div>
  )
}

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
          {saved && saved.map(code => <CourseCard code={code} />)}
        </div>
      </div>

      <div className='mt-8'>
        <p className='text-2xl mb-4'>Completed Courses</p>

        <div className='flex flex-row gap-x-4 overflow-x-auto snap-x snap-mandatory'>
          {completed && completed.map(code => <CourseCard code={code} />)}
        </div>
      </div>

      <div className='mt-8'>
        <p className='text-2xl mb-4'>Currently Taking</p>

        <div className='flex flex-row gap-x-4 overflow-x-auto snap-x snap-mandatory'>
          {current && current.map(code => <CourseCard code={code} />)}
        </div>
      </div>
    </div>
  )
}

export default UserInfo
