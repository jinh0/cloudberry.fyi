/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import Main from '@components/Main'
import { useRouter } from 'next/router'
import { CourseType, UserType, VSBCourse } from '@typing'
import Actions from '@components/course/Actions'

import courses from 'utils/courses'
import VSBData from '@components/course/VSBData'
import vsbCourses from '@utils/vsb'
import prereqsOf from '@utils/prereqsOf'
import Semesters from '@components/course/Semesters'
import useUser from '@hooks/useUser'
import ShareButton from '@components/course/ShareButton'
import Notes from '@components/course/Notes'
import PrereqsOf from '@components/course/PrereqsOf'
import subjectsData from '@utils/subjects.json'
import { displayCode, formatDesc } from '@utils/formatting'
import { DocumentSnapshot } from 'firebase/firestore'

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
      title={`${displayCode(code)} ${course.name} | Cloudberry`}
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

const CourseHeading = ({
  course,
  code,
  user,
}: {
  course: CourseType
  code: string
  user: DocumentSnapshot<UserType>
}) => {
  return (
    <div className='space-y-4'>
      <div className='text-2xl md:text-3xl mt-4 flex flex-row items-center'>
        <span>
          <span className='font-semibold mr-2'>{displayCode(code)}</span>
          <span className=''>{course.name}</span>
        </span>
        <ShareButton />
      </div>

      <Semesters terms={course.terms} />

      <div className='text-gray-700 text-base flex flex-row flex-wrap gap-x-2 items-center'>
        <div>
          {String(course.credits)} {course.credits !== 1 ? 'credits' : 'credit'}
        </div>
        <div className='w-1 h-1 rounded-full bg-gray-700'></div>
        <div>{subjectsData[course.code.split('-')[0]]}</div>
        <div className='w-1 h-1 rounded-full bg-gray-700'></div>
        <div>{course.faculty}</div>
      </div>

      {user && <Actions code={code} />}
    </div>
  )
}

const Overview = ({ course, code }) => {
  return (
    <div className='mt-10'>
      <p className='text-2xl font-medium pb-3 mb-4 border-b'>Overview</p>
      <p>{formatDesc(course.description, code)}</p>
    </div>
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

  const prereqsOfData = prereqsOf.find(
    course => course.code.toLowerCase() === params.code.toLowerCase()
  )

  return {
    props: {
      course: {
        ...eCalendarData,
        vsb: vsbData ? vsbData : null,
        prereqsOf: prereqsOfData.prereqOfs,
      },
    },
  }
}

export default Course
