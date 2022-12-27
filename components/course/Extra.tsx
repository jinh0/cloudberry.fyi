import { CourseType } from '@typing'

const Extra = ({ course }: { course: CourseType }) => {
  return (
    <ul className='list-disc mt-4 pl-6'>
      {/* {course.extra &&
        course.extra.map((point, idx) => (
          <li className='mb-1' key={idx}>
            {point}
          </li>
        ))} */}
    </ul>
  )
}

export default Extra
