import SemesterContext, {
  SemesterProps,
} from '@contexts/degree/SemesterContext'
import useUser from '@hooks/useUser'
import { SemesterType } from '@typing'
import { updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import AddCourse from './AddCourse'
import CourseList from './CourseList'

function formatTitle(year: number, semester: SemesterType) {
  const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

  const yearFormatted =
    semester === 'winter' || semester === 'summer' ? year + 1 : year
  return `${capitalize(semester)} ${yearFormatted}`
}

const Semester = ({
  year,
  semester,
}: {
  year: number
  semester: SemesterType
}) => {
  const { user } = useUser()

  const [courses, setCourses] = useState(
    user.data().degree.filter(x => x.year === year && x.semester === semester)
  )

  useEffect(() => {
    const { degree } = user.data()

    updateDoc(user.ref, {
      degree: degree
        .filter(x => x.year !== year || x.semester !== semester)
        .concat(courses),
    })
  }, [courses])

  return (
    <SemesterContext.Provider value={{ year, semester, courses, setCourses }}>
      <div className='w-full'>
        <div className='text-2xl mb-2'>{formatTitle(year, semester)}</div>

        <CourseList />
        <AddCourse />
      </div>
    </SemesterContext.Provider>
  )
}

export default Semester
