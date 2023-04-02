import { Course } from '@prisma/client'
import { writeFile } from 'fs/promises'
import prisma from './client'

async function main() {
  const courses = await prisma.course.findMany({
    orderBy: {
      code: 'asc',
    },
  })

  saveFullData(courses)
  saveLookup(courses)
}

async function saveFullData(courses: Course[]) {
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

async function saveLookup(courses: Course[]) {
  const lookup = {}
  courses.forEach(x => (lookup[x.code] = x.title))

  await writeFile('public/lookup.json', JSON.stringify(lookup))
}

main()

export {}
