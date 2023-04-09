import { CourseType } from '@typing'
import { JSDOM } from 'jsdom'

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '3600',
  'User-Agent':
    'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0',
}

const creditTypes = new Set()

export async function scrapeCourse(
  year: number,
  code: Lowercase<string>
): Promise<Partial<CourseType>> {
  let url = `https://www.mcgill.ca/study/${year}-${year + 1}/courses/${code}`

  const res = await fetch(url, { headers })
  const response = await res.text()

  const dom = new JSDOM(response, { contentType: 'text/html' })
  const doc = dom.window.document

  const { title, credits, creditType } = parseHeading(doc)

  console.log(code, title, credits, creditType)

  parseMeta(doc)

  return {
    code: code.toUpperCase(),
    title,
    credits,
  }
}

function parseHeading(doc: Document) {
  /*

  Code: ^\w+\s+\w+

  */

  let heading = doc.querySelector('#page-title').textContent.trim()
  heading = heading.replaceAll(/\r?\n|\r/g, '')

  const creditsMatch = heading.match(/\(\d+(\.\d+)?\s+(credits?|CE units?)\)/g)
  
  let [credits, creditType] = [0, 'credits']
  if (creditsMatch) {
    if (creditsMatch.length === 1) {
      const creditsStr = creditsMatch[0].replaceAll('(', '').replaceAll(')', '')
      const tokens = creditsStr.split(' ')

      credits = Number(tokens[0])
      creditType = tokens.slice(1).join(' ')

      if (creditType === 'credit')
        creditType = 'credits'

      if (creditType === 'CE unit')
        creditType = 'CE units'

      heading = heading.replaceAll(creditsMatch[0], '')
    }
  }

  // This is under the assumption that the heading is of the following format:
  // The code is the first two words
  // The rest is the course title
  const codeAndTitle = heading
  const tokens = codeAndTitle.split(' ')
  const [code, title] = [`${tokens[0]}-${tokens[1]}`, tokens.slice(2).join(' ').trim()]

  return {
    code,
    title,
    credits,
    creditType,
  }
}

function parseMeta(doc: Document) {
  const meta = doc.querySelector('.meta').textContent.trim()

  // Department:
  // (?<=Offered by: ).*(?=\()

  // Faculty:
  // (?<=Offered by:.*\().*(?=\))

  console.log(meta)
}