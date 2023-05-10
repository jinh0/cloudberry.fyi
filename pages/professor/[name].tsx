import Main from '@components/Main'
import prisma from '@db/client'
import { CourseType } from '@typing'
import { capitalize } from '@utils/formatting'

export async function getStaticPaths() {
  const courses = await prisma.course.findMany({
    where: {
      year: 2022,
    },
    select: {
      terms: true,
    },
  })

  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }: { params: { name: string } }) {
  const [first, last] = params.name.split('-')
  const courses = await prisma.course.findMany({
    where: {
      terms: {
        some: {
          instructors: {
            has: `${capitalize(last)}, ${capitalize(first)}`,
          },
        },
      },
    },
  })

  return {
    props: {
      name: params.name,
      courses,
    },
  }
}

export default function Professor({
  name,
  courses,
}: {
  name: string
  courses: CourseType[]
}) {
  const years = Array.from(new Set(courses.map(course => course.year)))

  const [first, last] = name.split('-')
  const formattedName = `${capitalize(last)}, ${capitalize(first)}`

  return (
    <Main title='Professor | Cloudberry'>
      <div>
        Professor{' '}
        {name
          .split('-')
          .map(x => capitalize(x))
          .join(' ')}
      </div>
      <div>
        {years.map(year => {
          return (
            <div key={year} className='mt-4'>
              <div className='font-bold'>
                Year {year} - {year + 1}
              </div>
              <div>
                {courses
                  .filter(course => course.year === year)
                  .map((course, idx) => (
                    <div key={idx} className='space-x-2'>
                      <span>{course.code}</span>

                      <span>
                        {course.terms
                          .filter(term =>
                            term.instructors.includes(formattedName)
                          )
                          .map(term => term.term)
                          .join(', ')}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )
        })}
      </div>
    </Main>
  )
}
