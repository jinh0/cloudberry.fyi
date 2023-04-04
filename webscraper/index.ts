import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { crawlCourseTitles, saveTitleData } from './titleCrawler'
import { getVSBInfo } from './vsb'

main(2022)

async function main(year: number) {
  // Make sure the data can be saved
  if (!existsSync('webscraper/data')) await mkdir('webscraper/data')
  if (!existsSync(`webscraper/data/${year}`))
    await mkdir(`webscraper/data/${year}`)

  if (!existsSync(`webscraper/data/${year}/course-titles.json`)) {
    // Fetch course titles
    const titles = await crawlCourseTitles(year)
    await saveTitleData(year, titles)
  } else {
    console.log('Course titles already exist. Not scraping them.')
  }

  getVSBInfo(year, 'summer')
}

export {}
