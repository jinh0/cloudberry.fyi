import { CourseType } from '@typing'
import courseData from './course-data.json'
import { JSDOM } from 'jsdom'
import { appendFileSync, writeFileSync } from 'fs'

const courses = courseData as CourseType[]

async function fetchCourse(code: string): Promise<{
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

  const url = `https://www.mcgill.ca/study/2022-2023/courses/${code}`

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
      if (!link.href.startsWith('/study/2022-2023/courses/')) {
        appendFileSync('errors.txt', `${code},${link.text},${link.href}`)
      } else {
        prerequisites.push(link.href.split('/study/2022-2023/courses/')[1])
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

async function fetchCourses() {
  const updatedCourses = []

  let i = 0
  for (const course of courses) {
    const linked = await fetchCourse(course.code)
    updatedCourses.push({ ...course, ...linked })

    i++

    if (i % 100 == 0) {
      console.log(`Course ${i}`)
      writeFileSync(
        'updated-courses.json',
        JSON.stringify(updatedCourses, null, 2)
      )
    }
  }

  writeFileSync('updated-courses.json', JSON.stringify(updatedCourses, null, 2))
}

fetchCourses()
