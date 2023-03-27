import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { CourseType, SearchContextType, SemesterOption } from '@typing'
import { Subject } from '@utils/subjects'
import { useEffect, useState } from 'react'

const courses = []

type Search = {
  query: string
  subjects: Uppercase<string>[]
  semester: string
  pageParam: number
}

async function getCourses(search: Search) {
  console.log(search.semester)
  const found = courses.filter(
    course =>
      // TODO: Clean up this mess
      (course.terms.length === 0 ||
        search.semester
          .split('|')
          .some(sem => course.terms.some(term => term.term === sem))) &&
      (search.subjects.length > 0
        ? search.subjects.some(subject => course.code.startsWith(subject))
        : true) &&
      (course.code
        .toLowerCase()
        .replace('-', ' ')
        .startsWith(search.query.toLowerCase()) ||
        course.title
          .toLowerCase()
          .replace(/\r/g, '')
          .includes(search.query.toLowerCase()) ||
        course.terms.some(term =>
          term.instructors.some(teacher => teacher.includes(search.query))
        ))
  )
  console.log(found.length, search.pageParam + 10)

  return {
    numOfResults: found.length,
    results: found.slice(search.pageParam, search.pageParam + 10),
    nextCursor:
      found.length <= search.pageParam + 10 ? undefined : search.pageParam + 10,
  }
}

function useSearch(): SearchContextType {
  const [query, setQuery] = useState('')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [semester, setSemester] = useState<SemesterOption>(null)
  const [prevData, setPrevData] = useState(null)

  const { data, isLoading, error, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [
        'search',
        { query, subjects, semester: semester ? semester.id : -1 },
      ],
      queryFn: ({ pageParam = 0 }) =>
        getCourses({
          query,
          pageParam,
          semester: semester ? semester.value : 'fall|winter',
          subjects: subjects.map(x => x.code),
        }),
      getNextPageParam: (lastPage, _) => lastPage.nextCursor,
      placeholderData: prevData,
    })

  useEffect(() => {
    if (data) setPrevData(data)
  }, [data])

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
    fetchNextPage,
    hasNextPage,
  }
}

export default useSearch
