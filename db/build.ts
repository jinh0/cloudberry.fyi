import prisma from './client'
import { saveFullData, saveHomeData } from './build/fullData'
import { saveLookup } from './build/lookup'
import { savePrereqsOf } from './build/prereqs'
import { saveVSB } from './build/vsb'
import { createDir } from './helper'
import { COURSE_YEARS, CURRENT_YEAR } from '@utils/constants'
import { writeFile } from 'fs/promises'
import { SemesterType } from '@typing'

main()

async function main() {
  createDir('public/data')
  createDir('public/data/vsb')

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

  await saveVSBData(CURRENT_YEAR)
}

async function saveVSBData(year: number) {
  async function getSemester(semester: SemesterType) {
    const vsbCourses = await prisma.vsb.findMany({
      where: { year, semester },
      orderBy: { code: 'asc' },
    })

    const courses = await prisma.course.findMany({
      where: { year },
    })

    return vsbCourses.map(course => ({
      ...course,
      id: null,
      title: courses.find(x => x.code === course.code).title,
      description: courses.find(x => x.code === course.code).description,
    }))
  }

  await writeFile(
    'public/data/vsb/fall.json',
    JSON.stringify(await getSemester('fall'))
  )

  await writeFile(
    'public/data/vsb/winter.json',
    JSON.stringify(await getSemester('winter'))
  )

  await writeFile(
    'public/data/vsb/summer.json',
    JSON.stringify(await getSemester('summer'))
  )
}

export {}
