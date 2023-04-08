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
  // console.log(url)

  const res = await fetch(url, { headers })
  const response = await res.text()

  const dom = new JSDOM(response, { contentType: 'text/html' })
  const doc = dom.window.document

  const { title, credits, creditType } = parseHeading(doc)

  console.log(code, title, credits, creditType)

  return {
    code: code.toUpperCase(),
    title,
    credits,
  }
}

function parseHeading(doc: Document) {
  const heading = doc.querySelector('#page-title').textContent.trim()

  // This is under the assumption that the heading is of the following format:
  // The code is the first two words
  // Credits are at the end in parentheses "(3 credits)"
  // The rest is the course title
  const [codeAndTitle, _, ...rest] = heading.split('(').map(x => x.trim())

  if (rest.length > 0) {
    console.log("there's an issue", heading)
    throw new Error()
  }

  const tokens = codeAndTitle.split(' ')
  const [code, title] = [`${tokens[0]}-${tokens[1]}`, tokens.slice(2).join(' ')]

  let [credits, creditType] = [0, 'credits']

  const creditsMatch = heading.match(/\(\d+(\.\d+)?\s+credit[a-z]*\)/g)

  if (creditsMatch && creditsMatch.length > 0) {
    const creditsTokens = creditsMatch.slice(1, -1).join('').split(' ')
    credits = Number(creditsTokens[0])
    creditType = creditsTokens[1]
  }

  creditTypes.add(creditType)

  return {
    code,
    title,
    credits,
    creditType,
  }
}
