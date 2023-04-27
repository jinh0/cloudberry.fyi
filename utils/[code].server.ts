import prisma from '@db/client'
import { readJSON } from './files'

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
  console.log(course)

  const vsbs = await prisma.vsb.findMany({
    where: {
      code: params.code.toUpperCase(),
      year,
    },
  })

  const prereqsOf = await readJSON(
    year === 2022
      ? 'public/prereqs-of.json'
      : `public/data/${year}/prereqs-of.json`
  )
  const lookup = await readJSON(
    year === 2022 ? 'public/lookup.json' : `public/data/${year}/lookup.json`
  )

  const prereqs: Lowercase<string>[] = prereqsOf[params.code.toLowerCase()]

  const prereqPopulated = prereqs.map(x => ({
    code: x,
    title: lookup[x.toUpperCase()],
  }))

  return {
    props: {
      course: {
        ...course,
        vsbs: vsbs.map(x => ({ semester: x.semester, vsb: x })),
        prereqsOf: prereqs ? prereqPopulated : [],
      },
    },
  }
}
