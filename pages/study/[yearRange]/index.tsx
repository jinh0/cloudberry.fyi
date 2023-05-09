import Home from '@components/Home'
import prisma from '@db/client'
import { COURSE_YEARS } from '@utils/constants'

export async function getStaticPaths() {
  return {
    paths: COURSE_YEARS.map(year => ({
      params: {
        yearRange: `${year}-${year + 1}`,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({
  params,
}: {
  params: { yearRange: `${number}-${number}` }
}) {
  const { yearRange } = params

  const year = Number(yearRange.split('-')[0])

  const initCourses = await prisma.course.findMany({
    take: 10,
    where: { year },
  })

  return {
    props: {
      initCourses,
      year,
    },
  }
}

export default Home
