import { existsSync } from 'fs'
import { appendFile, mkdir, readFile, writeFile } from 'fs/promises'
import { crawlCourseTitles, saveTitleData } from './titleCrawler'
import { getVSBInfo } from './vsb'
import { scrapeCourse } from './general'
import prisma from '@db/client'

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
      if (args.length < 4) break

      if (args[4] !== 'summer' && args[4] !== 'winter' && args[4] !== 'fall')
        break

      await getVSBInfo(year, args[4])
      break
    case 'general':
      if (args.length > 4) {
        const code = args[4]

        const data = await scrapeCourse(year, code.toLowerCase())

        console.log(
          `Link: https://www.mcgill.ca/study/${year}-${
            year + 1
          }/courses/${code}`
        )
        console.log(JSON.stringify(data, null, 2))

        return
      }

      if (!existsSync(`webscraper/data/${year}/course-titles.json`))
        return console.log('Error: course title data does not exist.')

      const f = await readFile(`webscraper/data/${year}/course-titles.json`)
      const courseTitles: Record<Uppercase<string>, string> = JSON.parse(
        f.toString()
      )

      const codes = Object.entries(courseTitles).map(x => x[0])

      for (let i = 0; i < codes.length; i += 100) {
        console.log(`Course ${i}: ${codes[i]}`)

        const list = codes
          .slice(i, i + 100)
          .map(code => saveCourse(year, code.toLowerCase()))

        await Promise.all(list)
      }

      break
  }

  console.log('Webscraper finished.')
}

async function saveCourse(year: number, code: string) {
  try {
    const data = await scrapeCourse(year, code.toLowerCase())

    await prisma.course.upsert({
      where: {
        code_year: {
          code: code.toUpperCase(),
          year,
        },
      },
      create: {
        ...data,
        year,
      },
      update: {
        ...data,
        year,
      },
    })

    // console.log('done', code)
  } catch (err) {
    await log(`${code},${year},${err.message}`)
  }
}

async function log(err: string) {
  await appendFile('error.txt', err + '\n')
}

export {}
