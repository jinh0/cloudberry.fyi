/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import GoBack from '@components/GoBack'
import Main from '@components/Main'
import Title from '@components/Title'
import { useRouter } from 'next/router'
import { CourseType, Safe, UserType, VSBType } from '@typing'
import Semester from '@components/Semester'
import { useContext } from 'react'
import UserContext from '@contexts/UserContext'
import Actions from '@components/course/Actions'

import courses from 'utils/courses'
import VSBData from '@components/course/VSBData'
import { getCourse } from '@utils/vsb_scraper'

async function fetchVSB(code: string): Promise<Safe<VSBType>> {
  try {
    const vsbData = await getCourse(code)
    return { status: true, ...vsbData }
  } catch {
    return { status: false }
  }
}

export async function getStaticPaths() {
  return {
    paths: courses.map(({ code }) => ({
      params: { code: code.toLowerCase() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { code: string } }) {
  const vsbData = await fetchVSB(params.code.toUpperCase())

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
  course: CourseType & { vsb: Safe<VSBType> }
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
        <div className='flex flex-col md:flex-row text-base'>
          {course.terms.map((term, ind) => (
            <Semester key={ind} sem={term} showInstructor={true} />
          ))}
        </div>

        <div className='mt-4'>
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

        <VSBData data={course.vsb} />

        {userData && <Actions code={code} />}
      </div>
    </Main>
  )
}

export default Course
