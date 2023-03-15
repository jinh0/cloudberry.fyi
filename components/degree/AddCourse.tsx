import SemesterContext from '@contexts/degree/SemesterContext'
import { PlusIcon } from '@heroicons/react/24/solid'
import { useContext } from 'react'
import Button from './Button'

const AddCourse = () => {
  const { semester, year } = useContext(SemesterContext)

  return (
    <Button className='mt-3 w-full'>
      <div>
        <PlusIcon className='w-6 h-6' />
      </div>
      <div>Add a course</div>
    </Button>
  )
}

export default AddCourse
