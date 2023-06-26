import { BookmarkIcon } from '@heroicons/react/24/outline'
import SavedCourse from '../SavedCourse'
import Collapsible from './Collapsible'

const Saved = ({ courses }: { courses: string[] }) => {
  return (
    <Collapsible
      header={
        <>
          <BookmarkIcon className='w-7 h-7 mr-3' />
          <span>Saved Courses</span>
        </>
      }
    >
      {courses.map((code, idx) => (
        <SavedCourse code={code as Lowercase<string>} key={idx} />
      ))}
    </Collapsible>
  )
}

export default Saved
