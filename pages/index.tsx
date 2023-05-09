import prisma from '@db/client'
import Home from '@components/Home'

export async function getStaticProps() {
  const initCourses = await prisma.course.findMany({
    take: 10,
    where: { year: 2023 },
  })

  return {
    props: {
      initCourses,
      year: 2023,
    },
  }
}

export default Home
