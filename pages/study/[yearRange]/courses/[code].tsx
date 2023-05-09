import Code from '@components/Code'
import prisma from '@db/client'
import { getStaticProps } from '@utils/[code].server'

export async function getStaticPaths() {
  const courses = await prisma.course.findMany({ where: { year: 2023 } })

  return {
    paths: courses.map(course => ({
      params: {
        code: course.code,
        yearRange: '2023-2024',
      },
    })),
    fallback: true,
  }
}

export { getStaticProps }

export default Code
