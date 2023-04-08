import prisma from '@db/client'
import { getCourse } from '@utils/vsbScraper'
import fs from 'fs'

const sleep = (milliseconds: number) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export async function getVSBInfo(
  year: number,
  semester: 'fall' | 'winter' | 'summer'
) {
  const semNum = {
    fall: '09',
    winter: '01',
    summer: '05',
  }

  const yearSem = `${semester === 'fall' ? year : year + 1}${semNum[semester]}`

  const data = require(`webscraper/data/${year}/course-titles.json`)
  const codes = Object.keys(data)

  // Loop through all courses and get relevant data
  for (let i = 0; i < codes.length; i++) {
    let code = codes[i] as Uppercase<string>
    let course = await getCourse(code, yearSem)

    if (course.isOk) {
      console.log(code, ' fetched')

      await prisma.vsb.upsert({
        create: {
          ...course.result,
          year,
          semester,
        },
        update: {
          ...course.result,
          year,
          semester,
        },
        where: {
          code_year_semester: {
            code,
            year,
            semester,
          },
        },
      })
    }

    await sleep(100)
  }
}
