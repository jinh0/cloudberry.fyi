import { Term } from '@prisma/client'
import { CourseType, Note, Maybe, SemesterType } from '@typing'
import { capitalize } from '@utils/formatting'
import { JSDOM } from 'jsdom'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '3600',
  'User-Agent':
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
}

export async function scrapeCourse(
  year: number,
  code: string
): Promise<CourseType> {
  let url = `https://www.mcgill.ca/study/${year}-${year + 1}/courses/${code}`

  const res = await fetch(url, { headers })
  const response = await res.text()

  const dom = new JSDOM(response, { contentType: 'text/html' })
  const doc = dom.window.document

  const { title, credits, creditType } = parseHeading(doc)
  const { department, faculty } = parseMeta(doc)
  const description = parseDescr(doc)
  const terms = parseTerms(doc)
  const instructors = parseInstructors(doc, terms)
  const notes = parseNotes(doc)
  const prerequisites = parsePrerequisites(doc, year)

  return {
    code: code.toUpperCase() as Uppercase<string>,
    year,
    title,
    credits,
    creditType,
    department,
    prerequisites,
    faculty,
    description,
    terms: instructors,
    notes,
  }
}

function parsePrerequisites(doc: Document, year: number): string[] {
  return Maybe.from(doc)
    .map(doc => doc.querySelector('.catalog-notes'))
    .map(list => Array.from(list.querySelectorAll('li')))
    .map(points =>
      points.find(point => point.textContent.startsWith('Prerequisite'))
    )
    .map(point => Array.from(point.querySelectorAll('a')))
    .map(links =>
      links
        .map(link =>
          link.href.startsWith(`/study/${year}-${year + 1}/courses/`)
            ? link.href.split(`/study/${year}-${year + 1}/courses/`)[1]
            : null
        )
        .filter(link => link)
    )
    .val([])
}

function parseNotes(doc: Document): Note[] {
  return Maybe.from(doc)
    .map(doc => doc.querySelector('.catalog-notes'))
    .map(list => Array.from(list.querySelectorAll('li')))
    .map(points =>
      points.map(li => ({
        content: li.textContent.trim(),
        links: Array.from(li.querySelectorAll('a')).map(({ href, text }) => ({
          href,
          text,
        })),
      }))
    )
    .val([])
}

function parseInstructors(doc: Document, terms: SemesterType[]) {
  let instructors = doc
    .querySelector('.node-catalog > .content > .catalog-instructors')
    ?.textContent.trim()
    .slice('Instructors:'.length)
    .trim()

  const result: Term[] = []

  for (const term of terms) {
    const exp = new RegExp(`.*(?=\(${capitalize(term)}\))`, 'g')
    const replaceExp = new RegExp(`.*\(${capitalize(term)}\)`, 'g')
    const match = instructors.match(exp)

    if (!match) {
      result.push({
        term,
        instructors: [],
      })

      continue
    }

    instructors = instructors.replace(replaceExp, '').slice(1).trim()

    const termInstructors = match[0]
      .slice(0, -1)
      .split(';')
      .map(x => x.trim())

    result.push({
      term,
      instructors: termInstructors,
    })
  }

  return result
}

function parseTerms(doc: Document) {
  const termsString = doc
    .querySelector('.node-catalog > .content > .catalog-terms')
    ?.textContent.trim()
    .toLowerCase()

  if (!termsString) return []

  const terms: Array<SemesterType> = ['fall', 'winter', 'summer']

  return terms.filter(x => termsString.includes(x))
}

function parseDescr(doc: Document) {
  const descr = doc.querySelector('.node-catalog > .content > p')

  if (!descr || descr.className !== '') return ''

  return descr.textContent.trim().replaceAll(/\r?\n|\r/g, '')
}

function parseHeading(doc: Document): {
  code: string
  title: string
  credits: number
  creditType: 'ce-unit' | 'credit'
} {
  let heading = doc
    .querySelector('#page-title')
    .textContent.trim()
    .replaceAll(/\r?\n|\r/g, '')

  const creditStr = heading.match(/\(\d+(\.\d+)?\s+(credits?|CE units?)\)/g)

  let [credits, creditType] = [0, 'credits']
  if (creditStr) {
    let tokens = creditStr[0].slice(1, -1).split(' ')

    credits = Number(tokens[0])
    creditType = tokens.slice(1).join(' ')

    heading = heading.replaceAll(creditStr[0], '')
  }

  // This is under the assumption that the heading is of the following format:
  // The code is the first two words
  // The rest is the course title
  const codeAndTitle = heading
  const tokens = codeAndTitle.split(' ')
  const [code, title] = [
    `${tokens[0]}-${tokens[1]}`,
    tokens.slice(2).join(' ').trim(),
  ]

  const finalCreditType = creditType === 'CE units' ? 'ce-unit' : 'credit'

  return {
    code,
    title,
    credits,
    creditType: finalCreditType,
  }
}

function parseMeta(doc: Document) {
  const meta = doc.querySelector('.meta').textContent.trim()

  // Department:
  // (?<=Offered by: ).*(?=\()

  // Faculty:
  // (?<=Offered by:.*\().*(?=\))

  // From my testing, there is ALWAYS a department / faculty pair

  const department = meta.match(/(?<=Offered by: ).*(?=\()/g)[0].trim()
  const faculty = meta.match(/(?<=Offered by:.*\().*(?=\))/g)[0].trim()

  return {
    department,
    faculty,
  }
}
