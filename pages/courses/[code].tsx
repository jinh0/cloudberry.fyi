/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import GoBack from '@components/GoBack'
import Main from '@components/Main'
import Title from '@components/Title'
import { useRouter } from 'next/router'
import { CourseType, UserType } from '@typing'
import Semester from '@components/Semester'
import { useContext } from 'react'
import UserContext from '@contexts/UserContext'
import Actions from '@components/course/Actions'

import courses from 'utils/courses'

export async function getStaticPaths() {
  return {
    paths: courses.map(({ code }) => ({
      params: { code: code.toLowerCase() },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { code: string } }) {
  return {
    props: {
      course: courses.find(
        course => course.code.toLowerCase() === params.code.toLowerCase()
      ),
    },
  }
}

const Course = ({ course }: { course: CourseType }) => {
  const router = useRouter()
  const { code: rawCode } = router.query as { code: string }

  const { user } = useContext(UserContext)
  const userData = user?.data() as UserType

  const parse = (code: string) => code?.replace('-', ' ').toUpperCase()

  return (
    <Main title={parse(rawCode) + ' | Cloudberry'} content={course.description}>
      <GoBack />
      <Title>
        {parse(rawCode)}: {course.name}
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

        <div className='mt-4'>
          <p>
            <span className='font-bold'>Prerequisites: </span>
            {course.prerequisites.join(', ')}
          </p>
        </div>

        {userData && <Actions code={rawCode} />}
      </div>
    </Main>
  )
}

export default Course
