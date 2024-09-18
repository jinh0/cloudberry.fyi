import ScheduleContext from '@contexts/ScheduleContext'
import { Autocomplete } from '@mui/joy'
import { useQuery } from '@tanstack/react-query'
import { VSBCourse, VSBFullCourse } from '@typing'
import { COURSE_COLORS } from '@utils/colors'
import { displayCode } from '@utils/formatting'
import { useContext, useState } from 'react'

function Search() {
  const { scheduleCourses, setCourses } = useContext(ScheduleContext)

  const { data, isLoading } = useQuery({
    queryKey: ['vsb', 'fall'],
    queryFn: async () => {
      const res = await fetch('/data/vsb/fall.json')
      const courses = (await res.json()) as unknown as VSBFullCourse[]

      return courses.filter(x => x.code !== 'AAAA-100')
    },
  })

  if (isLoading) return <div>Loading...</div>

  const filterOptions = (
    courses: VSBFullCourse[],
    { inputValue }: { inputValue: string }
  ) => {
    console.log(inputValue)
    return courses
      .filter(
        course =>
          course.code
            .toLowerCase()
            .replace('-', ' ')
            .startsWith(inputValue.toLowerCase()) ||
          course.title
            .toLowerCase()
            .replace(/\r/g, '')
            .includes(inputValue.toLowerCase())
      )
      .slice(0, 10)
  }

  const onChange = (_, val: VSBFullCourse) => {
    if (val && !scheduleCourses.find(x => x.code === val.code))
      setCourses(
        scheduleCourses.concat({
          ...val,
          palette: COURSE_COLORS[scheduleCourses.length % COURSE_COLORS.length],
        })
      )
  }

  return (
    <div>
      <Autocomplete
        onChange={onChange as any}
        options={data}
        clearOnBlur={true}
        clearOnEscape={true}
        filterOptions={filterOptions}
        getOptionLabel={(option: VSBFullCourse) =>
          `${displayCode(option.code)}: ${option.title}`
        }
        placeholder='Choose a course...'
        autoHighlight={true}
      />
    </div>
  )
}

export default Search
