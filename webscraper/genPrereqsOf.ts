import { CourseType } from '@typing'
import { readFileSync, writeFileSync } from 'fs'
import prompt from 'prompt-sync'

const input = prompt()

main()

async function main() {
  const year = Number(input('What year?: '))
  generate(year)
}

function generate(year: number) {
  const file = readFileSync(`${year}/updated-courses.json`)
  const courses = JSON.parse(file.toString()) as CourseType[]

  const prereqsOf = getPrereqs(courses)
  prereqsOf.sort((a, b) => (a.code < b.code ? -1 : 1))
  writeFileSync(`${year}/prereqs-of.json`, JSON.stringify(prereqsOf, null, 2))

  console.log('Done!')
}

function getPrereqs(courses: CourseType[]) {
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

  const prereqOfsList = Array.from(backedges.entries()).map(
    ([code, prereqOfs]) => ({ code, prereqOfs })
  )

  return prereqOfsList
}

export {}
