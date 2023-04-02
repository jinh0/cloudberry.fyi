/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import vsbCourses from '@utils/vsb'
import prereqsOf from 'public/prereqs-of.json'
import courseData from 'public/full-data.json'
import lookup from 'public/lookup.json'

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
import useLookup from '@hooks/useLookup'
import LookupContext from '@contexts/LookupContext'

const Course = ({
  course,
}: {
  course: CourseType & {
    vsb: VSBCourse
    prereqsOf: Array<{ code: Lowercase<string>; title: string }>
  }
}) => {
  const router = useRouter()
  const { code } = router.query as { code: string }
  const { user } = useUser()

  const { lookup, isLoading } = useLookup()

  return (
    <Main
      title={`${displayCode(code)} ${course.title} | Cloudberry`}
      content={course.description}
    >
      <LookupContext.Provider value={{ lookup, isLoading }}>
        <div className='flex flex-row w-full'>
          <div className='lg:w-3/5 text-base lg:text-lg'>
            <CourseHeading {...{ course, code, user }} />

            <Overview {...{ course, code }} />
            <Notes notes={course.notes} />
            <PrereqsOf prereqsOf={course.prereqsOf} />

            <VSBData vsb={course.vsb} />
          </div>
        </div>
      </LookupContext.Provider>
    </Main>
  )
}

const courses = courseData as CourseType[]

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

  const prereqs: Lowercase<string>[] = prereqsOf[params.code.toLowerCase()]

  const prereqPopulated = prereqs.map(x => ({
    code: x,
    title: lookup[x.toUpperCase()],
  }))

  return {
    props: {
      course: {
        ...courseData,
        vsb: vsbData ? vsbData : null,
        prereqsOf: prereqs ? prereqPopulated : [],
      },
    },
  }
}

export default Course
