/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import GoBack from '@components/GoBack'
import Main from '@components/Main'
import Title from '@components/Title'
import { useRouter } from 'next/router'
import { CourseType, VSBCourse } from '@typing'
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

const Course = ({
  course,
}: {
  course: CourseType & { vsb: VSBCourse; prereqsOf: string[] }
}) => {
  const router = useRouter()
  const { code } = router.query as { code: string }
  const { user } = useUser()

  const format = (code: string) => code?.replace('-', ' ').toUpperCase()

  return (
    <Main
      title={`${format(code)} ${course.name} | Cloudberry`}
      content={course.description}
    >
      <div className='flex flex-row w-full'>
        <div className='lg:w-3/5 text-base lg:text-lg'>
          <div className='space-y-4'>
            <div className='text-2xl md:text-3xl mt-4 flex flex-row items-center'>
              <span>
                <span className='font-semibold mr-2'>{format(code)}</span>
                <span>{course.name}</span>
              </span>
              <ShareButton />
            </div>
            <Semesters terms={course.terms} />
            <div className='text-gray-700 text-base flex flex-row gap-x-2 items-center'>
              <div>
                {String(course.credits)}{' '}
                {course.credits !== 1 ? 'credits' : 'credit'}
                {user && <Actions code={code} />}
              </div>
              <div className='w-1 h-1 rounded-full bg-gray-700'></div>
              <div>{subjectsData[course.code.split('-')[0]]}</div>
              <div className='w-1 h-1 rounded-full bg-gray-700'></div>
              <div>Faculty of Science</div>
            </div>
          </div>
          <div className='mt-10'>
            <p className='text-2xl font-medium pb-3 mb-4 border-b'>Overview</p>
            <p>{course.description}</p>
          </div>
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
