import GoBack from '@components/GoBack'
import Main from '@components/Main'
import Title from '@components/Title'
import { useRouter } from 'next/router'

import courses from '@utils/courses.json'
import { CourseType, UserType } from '@typing'
import Semester from '@components/Semester'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@utils/firebase'
import { useContext } from 'react'
import UserContext from '@contexts/UserContext'
import { doc, DocumentReference, updateDoc } from 'firebase/firestore'

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
  const router = useRouter()
  const { code } = router.query as { code: string }

  const { user } = useContext(UserContext)

  const parse = (code: string) => code?.replace('-', ' ').toUpperCase()
  const saveCourse = async () => {
    if (user) {
      console.log(user.saved)
      await updateDoc(doc(db, 'users', user.id), {
        saved: !user.saved ? [code] : user.saved.concat(code),
      })
    }
  }

  return (
    <Main>
      <GoBack />
      <Title>
        {parse(code)}: {course.name}
        <button onClick={saveCourse}>
          <BookmarkIcon className='w-8 h-8 ml-3 text-gray-400' />
        </button>
      </Title>

      <div className='w-3/5 text-lg'>
        <div className='flex flex-row text-base'>
          {course.terms.map((term, ind) => (
            <Semester sem={term.term} key={ind} />
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
      </div>
    </Main>
  )
}

export default Course
