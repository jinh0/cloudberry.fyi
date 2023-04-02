import { Course } from '@prisma/client'
import { writeFile } from 'fs/promises'

export async function savePrereqsOf(courses: Course[]) {
  const prereqsOf = generateList(courses)
  await writeFile('public/prereqs-of.json', JSON.stringify(prereqsOf))
}

function generateList(courses: Course[]) {
  const backedges = new Map<string, string[]>(
    courses.map(({ code }) => [code.toLowerCase(), []])
  )

  courses.forEach(course => {
    course.prerequisites.forEach(prereq => {
      const current = backedges.has(prereq) ? backedges.get(prereq) : []
      const added = current.concat(course.code.toLowerCase())
      backedges.set(prereq, added)
    })
  })

  const res = {}
  Array.from(backedges.entries()).forEach(
    ([code, prereqOfs]) => (res[code] = prereqOfs)
  )

  return res
}
