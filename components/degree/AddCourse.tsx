import SemesterContext from '@contexts/degree/SemesterContext'
import { PlusIcon } from '@heroicons/react/24/solid'
import { Autocomplete } from '@mui/joy'
import { useContext, useState } from 'react'
import Button from './Button'

import { displayCode } from '@utils/formatting'
import LookupContext from '@contexts/LookupContext'

type CourseOption = { code: string; title: string }

const AddCourse = () => {
  const [opened, setOpened] = useState(false)

  const {
    courses: courseList,
    setCourses,
    semester,
    year,
  } = useContext(SemesterContext)

  const { lookup, isLoading } = useContext(LookupContext)

  if (isLoading) return <></>

  const courses = Array.from(Object.entries(lookup)).map(
    ([code, title]: [Uppercase<string>, string]) => ({
      code,
      title,
    })
  )

  function filterOptions(options: CourseOption[], { inputValue }) {
    return inputValue === ''
      ? options.slice(0, 10)
      : options
          .filter(
            x =>
              x.code.replace('-', ' ').startsWith(inputValue.toLowerCase()) ||
              x.title.toLowerCase().includes(inputValue.toLowerCase())
          )
          .slice(0, 10)
  }

  function handleSelection(_, val) {
    let course = val as unknown as CourseOption

    setCourses(
      courseList
        .filter(x => x.code !== course.code)
        .concat({ ...course, year, semester })
    )
    setOpened(false)
  }

  return (
    <div className='mt-3'>
      {opened ? (
        <Autocomplete
          openOnFocus={true}
          onChange={handleSelection}
          onBlur={() => setOpened(false)}
          autoFocus={true}
          placeholder='Add a course...'
          options={courses}
          filterOptions={filterOptions}
          getOptionLabel={(option: CourseOption) =>
            `${displayCode(option.code)}: ${option.title}`
          }
          autoHighlight={true}
          className='p-1'
        />
      ) : (
        <Button className='w-full' onClick={() => setOpened(true)}>
          <div>
            <PlusIcon className='w-6 h-6' />
          </div>
          <div>Add a course</div>
        </Button>
      )}
    </div>
  )
}

export default AddCourse
