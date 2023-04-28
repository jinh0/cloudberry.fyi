import prisma from './client'
import { saveFullData, saveHomeData } from './build/fullData'
import { saveLookup } from './build/lookup'
import { savePrereqsOf } from './build/prereqs'
import { saveVSB } from './build/vsb'
import { initDir } from './helper'

main()

async function main() {
  initialize()
  build(2018)
  build(2019)
  build(2020)
  build(2021)
  build(2022)
  saveVSB()
}

function initialize() {
  initDir('public/data')
  initDir('public/data/2022')
  initDir('public/data/2021')
  initDir('public/data/2020')
  initDir('public/data/2019')
  initDir('public/data/2018')
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
