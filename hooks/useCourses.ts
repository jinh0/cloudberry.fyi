import { useQuery } from '@tanstack/react-query'
import { CourseType } from '@typing'

function useCourses(initCourses: CourseType[] = [], year: number) {
  const { data: courses, isLoading } = useQuery({
    queryKey: ['allcourses'],
    queryFn: async (): Promise<CourseType[]> => {
      const file =
        year === 2022 ? '/course-data.json' : `/data/${year}/course-data.json`

      const res = await fetch(file)
      return await res.json()
    },
    placeholderData: initCourses,
  })

  return { courses, isLoading }
}

export default useCourses
