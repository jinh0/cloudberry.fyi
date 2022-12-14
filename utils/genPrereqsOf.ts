import { CourseType } from '@typing'
import { readFileSync, writeFileSync } from 'fs'

const year = 2022

const file = readFileSync(`${year}/course-data.json`)
const courses = JSON.parse(file.toString()) as CourseType[]

function genPrereqsOf(courses: CourseType[]) {
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

  writeFileSync(`${year}/prereqs-of.json`, JSON.stringify(prereqOfsList, null, 2))

}

export {}
