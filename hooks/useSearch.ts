import { useQuery } from '@tanstack/react-query'
import { CourseType, SearchContextType, SemesterOption } from '@typing'
import { Subject } from '@utils/subjects'
import { useEffect, useState } from 'react'
import courses from 'utils/courses'

type Search = {
  query: string
  subjects: Uppercase<string>[]
  semester: string
}

async function getCourses(search: Search) {
  const found = courses.filter(
    course =>
      search.semester
        .split('|')
        .some(sem => course.terms.some(term => term.term === sem)) &&
      (search.subjects.length > 0
        ? search.subjects.some(subject => course.code.startsWith(subject))
        : true) &&
      (course.code
        .toLowerCase()
        .replace('-', ' ')
        .startsWith(search.query.toLowerCase()) ||
        course.name
          .toLowerCase()
          .replace(/\r/g, '')
          .includes(search.query.toLowerCase()))
  )

  return {
    results: found.slice(0, 10),
  }
}

function useSearch(): SearchContextType {
  const [query, setQuery] = useState('')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [semester, setSemester] = useState<SemesterOption>(null)

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
