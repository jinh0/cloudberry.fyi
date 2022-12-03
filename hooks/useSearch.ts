import { useQuery } from '@tanstack/react-query'
import { CourseType, Search } from '@typing'
import { useEffect, useState } from 'react'

async function getCourses(search: Search) {
  const res = await fetch(
    `/api/courses?search=${search.query}&subjects=${search.subjects.join(',')}`
  )
  return res.json()
}

function useSearch() {
  const [search, setSearch] = useState({ query: '', subjects: [] })

  const { data, isLoading, error, refetch } = useQuery<{
    results: CourseType[]
  }>({
    queryKey: ['search', search],
    queryFn: () => getCourses(search),
  })

  useEffect(() => {
    const storedSearch = localStorage.getItem('search')
    if (storedSearch) {
      try {
        setSearch(JSON.parse(storedSearch))
      } catch (err) {
        localStorage.setItem(
          'search',
          JSON.stringify({
            query: '',
            subjects: [],
          })
        )
      }
    }
  }, [setSearch])

  return { search, setSearch, data, isLoading, error, refetch }
}

export default useSearch
