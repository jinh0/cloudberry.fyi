import GoBack from '@components/GoBack'
import Main from '@components/Main'
import Title from '@components/Title'
import { useRouter } from 'next/router'

import courses from '@utils/courses.json'
import { CourseType } from '@typing'
import Semester from '@components/Semester'
import { TEMPORARY_REDIRECT_STATUS } from 'next/dist/shared/lib/constants'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { code: 'comp-330' } },
      { params: { code: 'comp-250' } },
      { params: { code: 'math-235' } },
    ],
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }: { params: { code: string } }) {
  return {
    // Passed to the page component as props
    props: { course: courses[params.code] },
  }
}

const Course = ({ course }: { course: CourseType }) => {
  // console.log(courses)
  const router = useRouter()
  const { code } = router.query as { code: string }

  const parse = (code: string) => code?.replace('-', ' ').toUpperCase()

  return (
    <Main>
      <GoBack />
      <Title>
        {parse(code)}: {course.name}
      </Title>

      <div className="w-3/5 text-lg">
        <div className="flex flex-row text-base">
          {course.terms.map((term, ind) => (
            <Semester sem={term.term} key={ind} />
          ))}
        </div>

        <div className="mt-4">
          <p>{course.description}</p>
        </div>

        <div className="mt-4">
          <p>
            <span className="font-bold">Prerequisites: </span>
            {course.prerequisites.join(', ')}
          </p>
        </div>
      </div>
    </Main>
  )
}

export default Course
