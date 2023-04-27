import Main from '@components/Main'
import { CourseType } from '@typing'
import Saved from '@components/home/Saved'
import CoursesContext from '@contexts/CoursesContext'
import Search from '@components/home/Search'
import useCourses from '@hooks/useCourses'
import YearContext from '@contexts/YearContext'

export default function Home({
  initCourses,
  year,
}: {
  initCourses: CourseType[]
  year: number
}) {
  const { courses, isLoading } = useCourses(initCourses, year)

  return (
    <YearContext.Provider value={year}>
      <CoursesContext.Provider value={{ courses, isLoading }}>
        <Main>
          <div className='w-full flex flex-row'>
            <div className='lg:w-2/3'>
              <Search initCourses={initCourses} />
            </div>
            <Saved />
          </div>
        </Main>
      </CoursesContext.Provider>
    </YearContext.Provider>
  )
}
