import Main from '@components/Main'
import { CourseType } from '@typing'
import Saved from '@components/home/Saved'
import { initCourses } from 'utils/courses'
import useSearch from '@hooks/useSearch'
import prisma from '@db/client'
import CoursesContext from '@contexts/CoursesContext'
import SearchContainer from '@components/home/SearchContainer'

const Home = ({
  initCourses,
  testCourses,
}: {
  initCourses: CourseType[]
  testCourses: CourseType[]
}) => {
  console.log(testCourses)

  return (
    <CoursesContext.Provider value={{ courses: testCourses }}>
      <Main>
        <div className='w-full flex flex-row'>
          <div className='lg:w-2/3'>
            <SearchContainer initCourses={testCourses} />
          </div>
          <Saved />
        </div>
      </Main>
    </CoursesContext.Provider>
  )
}

export async function getStaticProps() {
  const testCourses = await prisma.course.findMany({ take: 10 })

  return {
    props: {
      initCourses,
      testCourses,
    },
  }
}

export default Home
