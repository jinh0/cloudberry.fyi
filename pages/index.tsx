import CourseList from '@components/home/CourseList'
import Main from '@components/Main'
import Search from '@components/home/Search'
import SearchContext from '@contexts/SearchContext'
import { useEffect, useState } from 'react'
import { CourseType } from '@typing'
import { useQuery } from '@tanstack/react-query'
import Saved from '@components/home/Saved'

const Home = () => {
  const [search, setSearch] = useState('')

  // TODO: Reorganize getCourses/query
  const getCourses = async () => {
    const res = await fetch(`/api/courses?search=${search}`)
    return res.json()
  }

  const { isLoading, error, data, refetch } = useQuery<{
    status: number
    results: CourseType[]
  }>({
    queryKey: ['search', search],
    queryFn: getCourses,
  })

  useEffect(() => {
    const storedSearch = localStorage.getItem('search')

    if (storedSearch) {
      setSearch(storedSearch)
    }
  }, [setSearch])

  return (
    <Main>
      <div className='w-full flex flex-row'>
        <div className='lg:w-2/3'>
          <SearchContext.Provider
            value={{ search, setSearch, isLoading, error, data, refetch }}
          >
            <Search />
            <CourseList />
          </SearchContext.Provider>
        </div>

        <Saved />
      </div>
    </Main>
  )
}

export default Home
