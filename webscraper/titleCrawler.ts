/**
 * @file Web scraper that goes through eCalendar to
 *   retrieve all the course codes for a specified year.
 *
 * Original code written by: McGill Enhanced
 * Modified for cloudberry by: Jinho Yoon
 */

import { load } from 'cheerio'
import { writeFile } from 'fs/promises'

export async function saveTitleData(
  year: number,
  data: Record<string, string>
) {
  await writeFile(
    `webscraper/data/${year}/course-titles.json`,
    JSON.stringify(data)
  )
}

export async function crawlCourseTitles(
  year: number
): Promise<Record<string, string>> {
  let results = {}

  // Go over all pages listing McGill courses
  let pageIndex = 0
  while (true) {
    const [success, page] = await retrievePage(year, pageIndex)

    if (!success) break

    results = { ...results, ...page }
    pageIndex++
  }

  console.log('Done! Final page index: ' + pageIndex)

  return results
}

async function retrievePage(
  year: number,
  pageIndex: number
): Promise<[boolean, Record<string, string>]> {
  const url = `http://www.mcgill.ca/study/${year}-${
    year + 1
  }/courses/search?page=`

  console.log('Getting ' + url + pageIndex)

  const response = await fetch(url + pageIndex)
  try {
    const text = await response.text()

    const $ = load(text)
    const results = {}

    let success = false

    // Find all links that match the course URL
    $('a').each((_, value) => {
      const el = $(value)
      const url = el.attr('href')
      if (url) {
        const urlMatch = url.match(/courses\/([a-zA-Z0-9]+-[a-zA-Z0-9]+)/)
        if (urlMatch) {
          const urlCourseName = urlMatch[1].toUpperCase()
          results[urlCourseName] = el.text().replaceAll('\n', '')

          success = true
        }
      }
    })

    if (!success) return [false, results]

    return [true, results]
  } catch (err) {
    console.error('An error occurred while trying to retrieve a page')
    return [false, null]
  }
}
