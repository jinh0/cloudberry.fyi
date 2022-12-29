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
    <Main title={`${format(code)} | Cloudberry`} content={course.description}>
      <div className='flex flex-row w-full'>
        <div className='lg:w-3/5 text-base lg:text-lg'>
          <GoBack />
          <Title>
            <span>
              {format(code)}: {course.name} ({String(course.credits)}{' '}
              {course.credits !== 1 ? 'credits' : 'credit'})
            </span>
            <ShareButton />
          </Title>

          <Semesters terms={course.terms} />

          {user && <Actions code={code} />}

          <div className='mt-10'>
            <p className='text-2xl mb-4'>Overview</p>
            <p>{course.description}</p>
          </div>

          <Notes notes={course.notes} />

          <PrereqsOf prereqsOf={course.prereqsOf} />

          <VSBData vsb={course.vsb} />

          {/* <ReportForm /> */}
          {/* <div className='mt-10 outline-none outline-0'>
            <Tab.Group>
              <Tab.List>
                <Tab className='outline-none text-xl mr-8'>Overview</Tab>
                <Tab className='outline-none text-xl mr-8'>
                  Winter 2023 Schedule
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className='outline-none'>
                  <div className='mt-10'>
                    <p className='text-2xl mb-4'>Overview</p>
                    <p>{course.description}</p>
                  </div>

                  <Notes notes={course.notes} />
                </Tab.Panel>
                <Tab.Panel className='outline-none'>
                  <VSBData data={course.vsb} />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div> */}
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
