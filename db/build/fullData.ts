import { Course } from '@prisma/client'
import { writeFile } from 'fs/promises'

export async function saveFullData(courses: Course[], year: number) {
  const file =
    year === 2022
      ? 'public/full-data.json'
      : `public/data/${year}/full-data.json`

  return await writeFile(file, JSON.stringify(courses))
}

export async function saveHomeData(courses: Course[], year: number) {
  const file =
    year === 2022
      ? 'public/course-data.json'
      : `public/data/${year}/course-data.json`

  await writeFile(
    file,
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
