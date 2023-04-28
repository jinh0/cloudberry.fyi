import Home from '@components/Home'
import prisma from '@db/client'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { yearRange: '2021-2022' } },
      { params: { yearRange: '2020-2021' } },
    ],
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
