import { useQuery } from '@tanstack/react-query'
import { CourseType } from '@typing'
import { useEffect, useState } from 'react'

async function getCourses(search: string) {
  const res = await fetch(`/api/courses?search=${search}`)
  return res.json()
}

function useSearch() {
  const [search, setSearch] = useState('')

  const { data, isLoading, error, refetch } = useQuery<{
    results: CourseType[]
  }>({
    queryKey: ['search', search],
    queryFn: () => getCourses(search),
  })

  useEffect(() => {
    const storedSearch = localStorage.getItem('search')
    if (storedSearch) setSearch(storedSearch)
  }, [setSearch])

  return { search, setSearch, data, isLoading, error, refetch }
}

export default useSearch
