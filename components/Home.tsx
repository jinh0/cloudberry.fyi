import Main from '@components/Main'
import { CourseType } from '@typing'
import Sidebar from '@components/home/Sidebar'
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
        <Main year={year}>
          <div className='w-full flex flex-row'>
            <div className='lg:w-2/3'>
              <Search initCourses={initCourses} />
            </div>
            <div className='hidden lg:block lg:w-1/3 lg:pl-12'>
              <Sidebar />
            </div>
          </div>
        </Main>
      </CoursesContext.Provider>
    </YearContext.Provider>
  )
}
