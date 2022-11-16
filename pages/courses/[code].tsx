/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import GoBack from '@components/GoBack'
import Main from '@components/Main'
import Title from '@components/Title'
import { useRouter } from 'next/router'
import { Children, CourseType, UserType } from '@typing'
import Semester from '@components/Semester'
import { BookmarkIcon, CheckBadgeIcon } from '@heroicons/react/24/outline'
import {
  BookmarkIcon as BookmarkSolidIcon,
  CheckBadgeIcon as CheckBadgeSolidIcon,
} from '@heroicons/react/24/solid'
import { db } from '@utils/firebase'
import { useContext } from 'react'
import UserContext from '@contexts/UserContext'
import { doc, updateDoc } from 'firebase/firestore'

// TODO: Better method of storing data
import courses from '@utils/courses.json'

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

const Button = ({
  children,
  onClick,
  isOn = false,
}: {
  children: Children
  onClick: any
  isOn?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      className={
        'flex flex-row gap-2 items-center text-gray-500 pr-4 py-1.5 transition duration-100 select-none ' +
        (isOn ? 'bg-gray-50' : '')
      }
    >
      {children}
    </button>
  )
}

const Course = ({ course }: { course: CourseType }) => {
  const router = useRouter()
  const { code: rawCode } = router.query as { code: string }

  const { user } = useContext(UserContext)
  const userData = user?.data() as UserType

  const parse = (code: string) => code?.replace('-', ' ').toUpperCase()
  const saveCourse = async () => {
    if (user) {
      await updateDoc(user.ref, {
        saved: !userData.saved
          ? [rawCode]
          : [...new Set(userData.saved.concat(rawCode))],
      })
    }
  }

  const unsaveCourse = async () => {
    if (user) {
      await updateDoc(user.ref, {
        saved: !userData.saved
          ? []
          : [...new Set(userData.saved.filter((x) => x !== rawCode))],
      })
    }
  }

  const completeCourse = async () => {
    if (user) {
      await updateDoc(doc(db, 'users', user.id), {
        completed: !userData.completed
          ? [rawCode]
          : [...new Set(userData.completed.concat(rawCode))],
      })
    }
  }

  const uncompleteCourse = async () => {
    if (user) {
      await updateDoc(doc(db, 'users', user.id), {
        completed: !userData.completed
          ? []
          : [...new Set(userData.completed.filter((x) => x !== rawCode))],
      })
    }
  }

  return (
    <Main>
      <GoBack />
      <Title>
        {parse(rawCode)}: {course.name}
      </Title>

      <div className='lg:w-3/5 text-lg'>
        <div className='flex flex-col md:flex-row text-base'>
          {course.terms.map((term, ind) => (
            <Semester key={ind} sem={term.term} showInstructor={true} />
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

        {userData && (
          <div className='mt-4'>
            <div className='flex flex-row'>
              {userData.saved && userData.saved.find((x) => x === rawCode) ? (
                <Button onClick={unsaveCourse}>
                  <BookmarkSolidIcon className='w-6 h-6 text-red-600' />
                  <div className='text-red-600'>Saved</div>
                </Button>
              ) : (
                <Button onClick={saveCourse}>
                  <BookmarkIcon className='w-6 h-6' />
                  Save
                </Button>
              )}

              {userData.completed &&
              userData.completed.find((x) => x === rawCode) ? (
                <Button onClick={uncompleteCourse}>
                  <CheckBadgeSolidIcon className='w-6 h-6 text-green-600' />
                  <div className='text-green-600'>Completed</div>
                </Button>
              ) : (
                <Button onClick={completeCourse}>
                  <CheckBadgeIcon className='w-6 h-6' />
                  Completed
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export default Course
