import prisma from '@db/client'
import { getCourse } from '@utils/vsbScraper'

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export async function getVSBInfo(
  year: number,
  semester: 'fall' | 'winter' | 'summer'
) {
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
  })

  // Loop through all courses and get relevant data
  for (const course of courses) {
    const vsb = await getCourse(
      course.code as Uppercase<string>,
      year,
      semester
    )

    if (vsb.isOk) {
      console.log(course.code, ' fetched')

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
}
