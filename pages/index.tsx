import Main from '@components/Main'
import Search from '@components/home/Search'
import SearchContext from '@contexts/SearchContext'
import { CourseType } from '@typing'
import Saved from '@components/home/Saved'
import { initCourses } from 'utils/courses'
import useSearch from '@hooks/useSearch'
import SearchResult from '@components/home/SearchResult'
import prisma from '@db/client'

const Home = ({
  initCourses,
  testCourses,
}: {
  initCourses: CourseType[]
  testCourses: CourseType[]
}) => {
  console.log(testCourses)

  const search = useSearch()

  return (
    <Main>
      <div className='w-full flex flex-row'>
        <div className='lg:w-2/3'>
          <SearchContext.Provider value={search}>
            <Search />
            <SearchResult initCourses={initCourses} />
          </SearchContext.Provider>
        </div>
        <Saved />
      </div>
    </Main>
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
