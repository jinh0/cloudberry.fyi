import { BellIcon } from '@heroicons/react/24/outline'
import Collapsible from './Collapsible'
import { WaiterType } from '@typing'

const Waiting = ({ courses }: { courses: WaiterType[] }) => {
  return (
    <Collapsible
      header={
        <>
          <BellIcon className='w-7 h-7 mr-3' />
          <span>Waiting Courses</span>
        </>
      }
    >
      {courses.length === 0 ? (
        <>Nothing</>
      ) : (
        courses.map((course, idx) => <div key={idx}>{course.code}</div>)
      )}
    </Collapsible>
  )
}

export default Waiting
