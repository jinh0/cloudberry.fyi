import Main from '@components/Main'
import { CourseType } from '@typing'
import Saved from '@components/home/Saved'
import prisma from '@db/client'
import CoursesContext from '@contexts/CoursesContext'
import Search from '@components/home/Search'
import useCourses from '@hooks/useCourses'

const Home = ({ initCourses }: { initCourses: CourseType[] }) => {
  const { courses, isLoading } = useCourses(initCourses)

  return (
    <CoursesContext.Provider value={{ courses, isLoading }}>
      <Main>
        <div className='w-full flex flex-row'>
          <div className='lg:w-2/3'>
            {isLoading && <div>Loading...</div>}
            <Search initCourses={initCourses} />
          </div>
          <Saved />
        </div>
      </Main>
    </CoursesContext.Provider>
  )
}

export async function getStaticProps() {
  const initCourses = await prisma.course.findMany({ take: 10 })

  return {
    props: {
      initCourses,
    },
  }
}

export default Home
