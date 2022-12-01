import { CourseType } from '@typing'
import { writeFileSync } from 'fs'
import courseData from './course-data.json'

const courses = courseData as CourseType[]

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

writeFileSync('prereqs-of.json', JSON.stringify(prereqOfsList, null, 2))

export {}
