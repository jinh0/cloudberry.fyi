import { existsSync } from 'fs'
import { mkdir, readFile, writeFile } from 'fs/promises'
import { crawlCourseTitles, saveTitleData } from './titleCrawler'
import { getVSBInfo } from './vsb'
import { scrapeCourse } from './general'

const helpText = `
usage: tsx webscraper [year] [option]
option: 'titles' | 'vsb' | 'general'
`

main()

async function main() {
  const args = process.argv

  if (args.length < 3)
    return console.log('webscraper: requires 2 arguments or call with `--help`')

  if (args[2] === '--help') return console.log(helpText)

  if (args.length <= 3) return console.log('webscraper: requires 2 arguments')

  const year = Number(args[2])

  if (Number.isNaN(year))
    return console.log('webscraper: 1st argument must be the year')

  const option = args[3]

  if (!['titles', 'vsb', 'general'].includes(option))
    return console.log('Wrong option.')

  // Make sure the data can be saved
  if (!existsSync('webscraper/data')) await mkdir('webscraper/data')
  if (!existsSync(`webscraper/data/${year}`))
    await mkdir(`webscraper/data/${year}`)

  switch (option as 'titles' | 'vsb' | 'general') {
    case 'titles':
      // Fetch course titles
      const titles = await crawlCourseTitles(year)
      await saveTitleData(year, titles)
      break
    case 'vsb':
      if (!existsSync(`webscraper/data/${year}/course-titles.json`))
        return console.log('Error: course title data does not exist.')

      getVSBInfo(year, 'summer')
      break
    case 'general':
      if (args.length > 4) {
        const code = args[4]

        const data = await scrapeCourse(year, code.toLowerCase())

        console.log(JSON.stringify(data, null, 2))

        return
      }

      if (!existsSync(`webscraper/data/${year}/course-titles.json`))
        return console.log('Error: course title data does not exist.')

      const f = await readFile(`webscraper/data/${year}/course-titles.json`)
      const courseTitles: Record<Uppercase<string>, string> = JSON.parse(
        f.toString()
      )

      for (const [code, _] of Object.entries(courseTitles)) {
        const data = await scrapeCourse(year, code.toLowerCase())

        console.log(JSON.stringify(data, null, 2))

        await new Promise(r => setTimeout(r, 10))
      }

      break
  }

  console.log('Webscraper finished.')
}

export {}
