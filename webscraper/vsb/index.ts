import prisma from '@db/client'
import { SemesterType } from '@typing'
import { getCourse } from '@utils/vsbScraper'

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export async function getVSBInfo(year: number, semester: SemesterType) {
  const courses = await prisma.course.findMany({
    where: {
      year,
      terms: {
        some: {
          term: semester,
        },
      },
    },
    select: {
      code: true,
    },
    orderBy: {
      code: 'asc',
    },
  })

  // Loop through all courses and get relevant data
  for (let i = 0; i < courses.length; i += 100) {
    await Promise.all(
      courses
        .slice(i, i + 100)
        .map(course => saveCourse(course, year, semester))
    )

    console.log(`Course ${i}`)
  }
}

async function saveCourse(
  course: { code: string },
  year: number,
  semester: SemesterType
) {
  const vsb = await getCourse(course.code as Uppercase<string>, year, semester)

  if (vsb.isOk) {
    await prisma.vsb.upsert({
      create: {
        ...vsb.result,
        year,
        semester,
      },
      update: {
        ...vsb.result,
        year,
        semester,
      },
      where: {
        code_year_semester: {
          code: course.code,
          year,
          semester,
        },
      },
    })
  }

  await sleep(10)
}
