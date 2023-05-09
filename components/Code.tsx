import { displayCode } from '@utils/formatting'

import { useRouter } from 'next/router'
import useUser from '@hooks/useUser'

import { CourseType, SemesterType, VSBCourse } from '@typing'

import Main from '@components/Main'
import VSBData from '@components/course/VSBData'
import Notes from '@components/course/Notes'
import PrereqsOf from '@components/course/PrereqsOf'
import CourseHeading from '@components/course/CourseHeading'
import Overview from '@components/course/Overview'

const Code = ({
  course,
  year,
}: {
  course: CourseType & {
    vsbs: Array<{ year: number; semester: SemesterType; vsb: VSBCourse }>
    prereqsOf: Array<{ code: Lowercase<string>; title: string }>
  }
  year: number
}) => {
  const router = useRouter()
  const { code } = router.query as { code: string }
  const { user } = useUser()

  if (!course.code)
    return (
      <Main year={year} title={`${displayCode(code)} | Cloudberry`}>
        <div>
          Course {displayCode(code)} does not exist for the academic year of{' '}
          {`${year}-${year + 1}`}.
        </div>
      </Main>
    )

  return (
    <Main
      year={year}
      title={`${displayCode(code)} ${course.title} | Cloudberry`}
      content={course.description}
    >
      <div className='flex flex-row w-full'>
        <div className='lg:w-3/5 text-base lg:text-lg'>
          <CourseHeading {...{ course, code, user }} />

          <Overview {...{ course, code }} />
          <Notes notes={course.notes} />
          <PrereqsOf year={year} prereqsOf={course.prereqsOf} />

          <VSBData vsbs={course.vsbs} />
        </div>
      </div>
    </Main>
  )
}
export default Code
