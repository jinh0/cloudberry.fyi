import { Course } from '@prisma/client'
import { writeFile } from 'fs/promises'

export async function saveLookup(courses: Course[], year: number) {
  const lookup = {}
  courses.forEach(x => (lookup[x.code] = x.title))

  const file =
    year === 2022 ? 'public/lookup.json' : `public/data/${year}/lookup.json`

  await writeFile(file, JSON.stringify(lookup))
}
