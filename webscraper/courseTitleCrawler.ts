/**
 * @file Web scraper that goes through eCalendar to
 *   retrieve all the course codes for a specified year.
 *
 * @author McGill Enhanced
 * @author Jinho Yoon
 */

import fs from 'fs'
import { load } from 'cheerio'
import prompt from 'prompt-sync'

const input = prompt()


// DISCLAIMER: You need to make the year folder before running the script

async function main() {
  const year = Number(input("What year?: "))

  const data = await getCourses(year)
  saveCourseData(year, data)
}

main()

async function saveCourseData(year: number, data: Record<string, string>) {
  fs.writeFile(
    `${year}/course-titles.json`,
    JSON.stringify(data, null, 4),
    err => {
      if (!err) {
        console.log('Saved all data in output-coursetitles.json')
      } else {
        console.error('Error occurred while trying to save the output file')
      }
    }
  )
}

async function getCourses(year: number): Promise<Record<string, string>> {
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
    $('a').each((index, value) => {
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

    if (!success)
      return [false, results]

    return [true, results]
  } catch (err) {
    console.error('An error occurred while trying to retrieve a page')
    return [false, null]
  }
}
