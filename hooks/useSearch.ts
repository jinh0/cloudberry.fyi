import { useQuery } from '@tanstack/react-query'
import { CourseType, SearchContextType, SemesterOption } from '@typing'
import { Subject } from '@utils/subjects'
import { useEffect, useState } from 'react'

type Search = {
  query: string
  subjects: string[]
  semester: string
}

async function getCourses(search: Search) {
  const data = await fetch(
    `/api/courses?search=${search.query}&subjects=${search.subjects.join(
      ','
    )}&semester=${search.semester}`
  )
  return data.json()
}

function useSearch(): SearchContextType {
  const [query, setQuery] = useState('')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [semester, setSemester] = useState<SemesterOption>(null)

  // console.log({ query, subjects, semester: semester ? semester.id : -1 })

  const { data, isLoading, error, refetch } = useQuery<{
    results: CourseType[]
  }>({
    queryKey: [
      'search',
      { query, subjects, semester: semester ? semester.id : -1 },
    ],
    queryFn: () =>
      getCourses({
        query,
        semester: semester ? semester.value : 'fall|winter',
        subjects: subjects.map(x => x.code),
      }),
  })

  // Refetch course data when any part of the search changes
  useEffect(() => {
    refetch()
  }, [subjects, query, semester])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('subjects')
      const parsed = JSON.parse(stored)

      if (parsed) setSubjects(parsed)
    } catch {}
  }, [])

  return {
    query,
    setQuery,
    subjects,
    setSubjects,
    semester,
    setSemester,
    data,
    isLoading,
    error,
    refetch,
  }
}

export default useSearch
