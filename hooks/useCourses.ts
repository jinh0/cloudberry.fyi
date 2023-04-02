import { useQuery } from '@tanstack/react-query'
import { CourseType } from '@typing'

function useCourses(initCourses: CourseType[] = []) {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['allcourses'],
    queryFn: async (): Promise<CourseType[]> => {
      const res = await fetch('/course-data.json')
      return await res.json()
    },
    placeholderData: initCourses,
  })

  return { courses, isLoading }
}

export default useCourses
