import { useQuery } from '@tanstack/react-query'
import { CourseType, Search } from '@typing'
import { Subject } from '@utils/subjects'
import { useEffect, useState } from 'react'

async function getCourses(search: Search) {
  const res = await fetch(
    `/api/courses?search=${search.query}&subjects=${search.subjects.join(',')}`
  )
  return res.json()
}

function useSearch() {
  const [query, setQuery] = useState('')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const { data, isLoading, error, refetch } = useQuery<{
    results: CourseType[]
  }>({
    queryKey: ['search'],
    queryFn: () => getCourses({ query, subjects: subjects.map(x => x.code) }),
  })

  useEffect(() => {
    refetch()
  }, [subjects, query])

  return {
    query,
    setQuery,
    subjects,
    setSubjects,
    data,
    isLoading,
    error,
    refetch,
  }
}

export default useSearch
