import { Course } from '@prisma/client'
import { writeFile } from 'fs/promises'

export async function saveFullData(courses: Course[]) {
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
