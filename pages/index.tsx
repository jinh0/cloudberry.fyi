import CourseList from '@components/home/CourseList'
import Main from '@components/Main'
import Search from '@components/home/Search'
import SearchContext from '@contexts/SearchContext'
import { useEffect, useState } from 'react'
import { CourseType } from '@typing'
import { useQuery } from '@tanstack/react-query'
import Saved from '@components/home/Saved'
import { initCourses } from 'utils/courses'

const Home = ({ initCourses }: { initCourses: CourseType[] }) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const storedSearch = localStorage.getItem('search')
    if (storedSearch) setSearch(storedSearch)
  }, [setSearch])

  const { isLoading, error, data, refetch } = useQuery<{
    results: CourseType[]
  }>({
    queryKey: ['search', search],
    queryFn: () => getCourses(search),
  })

  return (
    <Main>
      <div className='w-full flex flex-row'>
        <div className='lg:w-2/3'>
          <SearchContext.Provider
            value={{ search, setSearch, isLoading, error, data, refetch }}
          >
            <Search />
            <CourseList initCourses={initCourses} />
          </SearchContext.Provider>
        </div>

        <Saved />
      </div>
    </Main>
  )
}

const getCourses = async (search: string) => {
  const res = await fetch(`/api/courses?search=${search}`)
  return res.json()
}

export async function getStaticProps() {
  return {
    props: {
      initCourses,
    },
  }
}

export default Home
