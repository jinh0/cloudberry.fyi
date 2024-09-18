import prisma from '@db/client'
import Home from '@components/Home'
import { CURRENT_YEAR } from '@utils/constants'

export async function getStaticProps() {
  const initCourses = await prisma.course.findMany({
    take: 10,
    where: { year: CURRENT_YEAR },
  })

  return {
    props: {
      initCourses,
      year: CURRENT_YEAR,
    },
  }
}

export default Home
