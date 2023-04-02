/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import courses from '@utils/courses'
import vsbCourses from '@utils/vsb'
import prereqsOf from 'public/prereqs-of.json'

import { displayCode } from '@utils/formatting'

import { useRouter } from 'next/router'
import useUser from '@hooks/useUser'

import { CourseType, VSBCourse } from '@typing'

import Main from '@components/Main'
import VSBData from '@components/course/VSBData'
import Notes from '@components/course/Notes'
import PrereqsOf from '@components/course/PrereqsOf'
import CourseHeading from '@components/course/CourseHeading'
import Overview from '@components/course/Overview'

const Course = ({
  course,
}: {
  course: CourseType & { vsb: VSBCourse; prereqsOf: string[] }
}) => {
  const router = useRouter()
  const { code } = router.query as { code: string }
  const { user } = useUser()

  return (
    <Main
      title={`${displayCode(code)} ${course.title} | Cloudberry`}
      content={course.description}
    >
      <div className='flex flex-row w-full'>
        <div className='lg:w-3/5 text-base lg:text-lg'>
          <CourseHeading {...{ course, code, user }} />

          <Overview {...{ course, code }} />
          <Notes notes={course.notes} />
          <PrereqsOf prereqsOf={course.prereqsOf} />

          <VSBData vsb={course.vsb} />
        </div>
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

  const courseData = courses.find(
    course => course.code.toLowerCase() === params.code.toLowerCase()
  )

  const prereqsOfData = prereqsOf[params.code.toLowerCase()]

  return {
    props: {
      course: {
        ...courseData,
        vsb: vsbData ? vsbData : null,
        prereqsOf: prereqsOfData ? prereqsOfData : [],
      },
    },
  }
}

export default Course
