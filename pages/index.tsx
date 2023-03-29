import Main from '@components/Main'
import { CourseType } from '@typing'
import Saved from '@components/home/Saved'
import prisma from '@db/client'
import CoursesContext from '@contexts/CoursesContext'
import Search from '@components/home/Search'
import { useQuery } from '@tanstack/react-query'

const Home = ({ initCourses }: { initCourses: CourseType[] }) => {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['allcourses'],
    queryFn: async (): Promise<CourseType[]> => {
      const res = await fetch('/course-data.json')
      return await res.json()
    },
    placeholderData: initCourses,
  })

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
