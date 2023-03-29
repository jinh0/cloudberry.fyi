import { writeFile } from 'fs/promises'
import prisma from './client'

async function main() {
  const courses = await prisma.course.findMany({
    orderBy: {
      code: 'asc',
    },
  })

  await writeFile(
    'public/course-data.json',
    JSON.stringify(
      courses.map(x => ({
        code: x.code,
        title: x.title,
        description: x.description,
        terms: x.terms,
      }))
    )
  )
}

main()

export {}
