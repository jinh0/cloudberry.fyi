import { useContext, useState } from 'react'
import lookup from '@utils/lookup'
import { Combobox } from '@headlessui/react'
import vsbCourses from '@utils/vsb'
import ScheduleContext from '@contexts/ScheduleContext'

const courses = Array.from(lookup.entries()).map(([code, title]) => ({
  code,
  title,
}))

function Search() {
  const [query, setQuery] = useState('')
  const [selectedCourse, setSelected] = useState(null)

  const { scheduleCourses, setCourses } = useContext(ScheduleContext)

  const display = (code: string) => code.replace('-', ' ').toUpperCase()
  const undo = (code: string) => code.replace(' ', '-').toLowerCase()

  const filteredCourses =
    query === ''
      ? courses.slice(0, 10)
      : courses
          .filter(
            x =>
              x.code.replace('-', ' ').startsWith(query.toLowerCase()) ||
              x.title.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 10)

  const onChange = (val: string) => {
    setCourses(scheduleCourses.concat(undo(val)))
    setSelected(val)
  }

  return (
    <div>
      <Combobox value={selectedCourse} onChange={onChange}>
        <Combobox.Input
          className='w-96 border rounded-full py-2 px-6 outline-none'
          autoFocus
          placeholder='Search for a course...'
          onChange={event => setQuery(event.target.value)}
        />
        {filteredCourses.length > 0 ? (
          <Combobox.Options className='border rounded-xl w-fit px-6 mt-2'>
            {filteredCourses.map(course => (
              <Combobox.Option
                key={course.code}
                value={course.code.replace('-', ' ').toUpperCase()}
              >
                <span className='font-semibold'>
                  {course.code.replace('-', ' ').toUpperCase()}:
                </span>{' '}
                {course.title}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        ) : (
          <></>
        )}
      </Combobox>
    </div>
  )
}

export default Search
