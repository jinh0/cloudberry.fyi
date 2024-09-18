import Code from '@components/Code'
import prisma from '@db/client'
import { getStaticProps } from '@utils/[code].server'
import { CURRENT_YEAR } from '@utils/constants'

export async function getStaticPaths() {
  const courses = await prisma.course.findMany({ where: { year: CURRENT_YEAR } })

  return {
    paths: courses.map(course => ({
      params: {
        code: course.code.toLowerCase(),
        yearRange: `${CURRENT_YEAR}-${CURRENT_YEAR+1}`,
      },
    })),
    fallback: 'blocking',
  }
}

export { getStaticProps }

export default Code
