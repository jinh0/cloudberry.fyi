import prisma from '@db/client'

export function getPaths(year: number) {
  return async () => {
    const courses = await prisma.course.findMany({ where: { year } })
    return {
      paths: courses.map(({ code }) => ({
        params: { code: code.toLowerCase(), yearRange: `${year}-${year + 1}` },
      })),
      fallback: false,
    }
  }
}

export async function getStaticProps({
  params,
}: {
  params: { code: string; yearRange?: string }
}) {
  const year = params.yearRange ? Number(params.yearRange.split('-')[0]) : 2022

  const course = await prisma.course.findUnique({
    where: {
      code_year: {
        code: params.code.toUpperCase(),
        year,
      },
    },
  })

  const vsbs = await prisma.vsb.findMany({
    where: {
      code: params.code.toUpperCase(),
      year,
    },
  })

  const prereqs = await prisma.course.findMany({
    where: {
      year,
      prerequisites: {
        has: params.code.toLowerCase(),
      },
    },
    select: {
      code: true,
      title: true,
    },
  })

  return {
    props: {
      year,
      course: {
        ...course,
        vsbs: vsbs.map(x => ({ semester: x.semester, vsb: x })),
        prereqsOf: prereqs.map(x => ({
          code: x.code.toLowerCase(),
          title: x.title,
        })),
      },
    },
  }
}
