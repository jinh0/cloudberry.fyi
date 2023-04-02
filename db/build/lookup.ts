import { Course } from '@prisma/client'
import { writeFile } from 'fs/promises'

export async function saveLookup(courses: Course[]) {
  const lookup = {}
  courses.forEach(x => (lookup[x.code] = x.title))

  await writeFile('public/lookup.json', JSON.stringify(lookup))
}
