import prisma from './client'
import { saveFullData, saveHomeData } from './build/fullData'
import { saveLookup } from './build/lookup'
import { savePrereqsOf } from './build/prereqs'
import { saveVSB } from './build/vsb'
import { createDir } from './helper'
import { COURSE_YEARS } from '@utils/constants'

main()

async function main() {
  createDir('public/data')

  COURSE_YEARS.forEach(async year => {
    createDir(`public/data/${year}`)
    await build(year)
  })

  saveVSB()
}

async function build(year: number) {
  const courses = await prisma.course.findMany({
    where: { year },
    orderBy: { code: 'asc' },
  })

  await saveFullData(courses, year)
  await saveHomeData(courses, year)
  await saveLookup(courses, year)
  await savePrereqsOf(courses, year)
}

export {}
