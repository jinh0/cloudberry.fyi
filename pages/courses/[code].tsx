/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import GoBack from '@components/GoBack'
import Main from '@components/Main'
import Title from '@components/Title'
import { useRouter } from 'next/router'
import { CourseType, Safe, UserType, VSBCourse } from '@typing'
import Semester from '@components/Semester'
import { useContext } from 'react'
import UserContext from '@contexts/UserContext'
import Actions from '@components/course/Actions'

import courses from 'utils/courses'
import VSBData from '@components/course/VSBData'
import { getCourse } from '@utils/vsbScraper'
import { useQuery } from '@tanstack/react-query'

export async function getStaticPaths() {
  return {
    paths: courses.map(({ code }) => ({
      params: { code: code.toLowerCase() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { code: string } }) {
  const vsbData = await getCourse(params.code.toUpperCase())

  const eCalendarData = courses.find(
    course => course.code.toLowerCase() === params.code.toLowerCase()
  )

  return {
    props: {
      course: {
        ...eCalendarData,
        vsb: vsbData,
      },
    },
  }
}

const Course = ({
  course,
}: {
  course: CourseType & { vsb: Safe<VSBCourse> }
}) => {
  const router = useRouter()
  const { code } = router.query as { code: string }

  const { user } = useContext(UserContext)
  const userData = user?.data() as UserType

  const format = (code: string) => code?.replace('-', ' ').toUpperCase()

  return (
    <Main title={format(code) + ' | Cloudberry'} content={course.description}>
      <GoBack />
      <Title>
        {format(code)}: {course.name}
      </Title>

      <div className='lg:w-3/5 text-base lg:text-lg'>
        <div className='flex flex-col md:flex-row text-base flex-wrap gap-y-1'>
          {course.terms.map((term, ind) => (
            <Semester key={ind} sem={term} showInstructor={true} />
          ))}
        </div>

        <div className='mt-8'>
          <p className='text-2xl mb-4'>Overview</p>
          <p>{course.description}</p>
        </div>

        {course.prerequisites.length > 0 && (
          <div className='mt-4'>
            <p>
              <span className='font-bold'>Prerequisites: </span>
              {course.prerequisites.join(', ')}
            </p>
          </div>
        )}

        <ul className='list-disc mt-4'>
          {course.extra && course.extra.map((point, idx) => <li>{point}</li>)}
        </ul>

        <VSBData data={course.vsb} />

        {userData && <Actions code={code} />}
      </div>
    </Main>
  )
}

export default Course
