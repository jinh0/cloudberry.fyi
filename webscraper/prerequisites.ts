import { JSDOM } from 'jsdom'
import { appendFileSync, writeFileSync } from 'fs'
import { readFile } from 'fs/promises'
import { CourseType } from '@typing'

async function fetchCourse(code: string, year: number): Promise<{
  prerequisites: string[]
  notes: Array<{
    content: string
    links: Array<{ text: string; href: string }>
  }>
}> {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent':
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
  }

  const url = `https://www.mcgill.ca/study/${year}-${year + 1}/courses/${code}`

  const response = await fetch(url, { headers })
  const text = await response.text()
  const dom = new JSDOM(text, { contentType: 'text/html' })
  const doc = dom.window.document

  const catalogNotes = doc.querySelector('.catalog-notes')

  if (!catalogNotes) return { prerequisites: [], notes: [] }

  const bulletPoints = Array.from(catalogNotes.querySelectorAll('li > p'))

  const prerequisites: string[] = []

  const notes = bulletPoints.map(point => {
    const links = Array.from(point.querySelectorAll('a'))
    const parsedLinks = links.map(link => {
      if (!link.href.startsWith(`/study/${year}-${year + 1}/courses/`)) {
        appendFileSync('errors.txt', `${code},${link.text},${link.href}`)
      } else {
        if (point.textContent.startsWith('Prerequisite'))
          prerequisites.push(link.href.split(`/study/${year}-${year + 1}/courses/`)[1])
      }

      return {
        href: link.href,
        text: link.textContent,
      }
    })

    // console.log(parsedLinks)

    return {
      content: point.textContent,
      links: parsedLinks,
    }
  })

  return { prerequisites, notes }
}

async function fetchCourses(year: number) {
  const file = await readFile(`${year}/course-data.json`)
  const courses = JSON.parse(file.toString()) as CourseType[]

  const updatedCourses = []

  let i = 0
  for (const course of courses) {
    const linked = await fetchCourse(course.code, year)
    updatedCourses.push({ ...course, ...linked })

    i++

    if (i % 100 == 0) {
      console.log(`Course ${i}`)
      writeFileSync(
        `${year}/updated-courses.json`,
        JSON.stringify(updatedCourses, null, 2)
      )
    }
  }

  writeFileSync(`${year}/updated-courses.json`, JSON.stringify(updatedCourses, null, 2))
}

fetchCourses(2020)
