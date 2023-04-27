/*
 * [code].tsx: Individual course page at /courses/[code]
 */

import Code from '@components/Code'
import prisma from '@db/client'
import { getStaticProps } from '@utils/[code].server'

export async function getStaticPaths() {
  const courses = await prisma.course.findMany({ where: { year: 2022 } })

  return {
    paths: courses.map(({ code }) => ({
      params: { code: code.toLowerCase() },
    })),
    fallback: false,
  }
}

export { getStaticProps }

export default Code
