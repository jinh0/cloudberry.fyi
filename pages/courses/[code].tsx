/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import GoBack from '@components/GoBack'
import Main from '@components/Main'
import Title from '@components/Title'
import { useRouter } from 'next/router'
import { CourseType, UserType, VSBCourse } from '@typing'
import { useContext } from 'react'
import UserContext from '@contexts/UserContext'
import Actions from '@components/course/Actions'

import courses from 'utils/courses'
import VSBData from '@components/course/VSBData'
import vsbCourses from '@utils/vsb'
import Semesters from '@components/course/Semesters'
import Extra from '@components/course/Extra'
import useUser from '@hooks/useUser'
import ShareButton from '@components/course/ShareButton'
import Notes from '@components/course/Notes'

const Course = ({ course }: { course: CourseType & { vsb: VSBCourse } }) => {
  const router = useRouter()
  const { code } = router.query as { code: string }
  const { user } = useUser()

  const format = (code: string) => code?.replace('-', ' ').toUpperCase()

  return (
    <Main title={`${format(code)} | Cloudberry`} content={course.description}>
      <GoBack />
      <Title>
        {format(code)}: {course.name}
        <ShareButton />
      </Title>

      <div className='lg:w-3/5 text-base lg:text-lg mt-4'>
        <Semesters terms={course.terms} />

        {user && <Actions code={code} />}

        <div className='mt-10'>
          <p className='text-2xl mb-4'>Overview</p>
          <p>{course.description}</p>
        </div>

        {/* <Extra course={course} /> */}
        <Notes notes={course.notes} />

        <VSBData data={course.vsb} />
      </div>
    </Main>
  )
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
  const vsbData = vsbCourses.find(
    course => course.code.toLowerCase() === params.code.toLowerCase()
  )

  const eCalendarData = courses.find(
    course => course.code.toLowerCase() === params.code.toLowerCase()
  )

  return {
    props: {
      course: {
        ...eCalendarData,
        vsb: vsbData ? vsbData : null,
      },
    },
  }
}

export default Course
