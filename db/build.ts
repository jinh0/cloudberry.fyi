import prisma from './client'
import { saveFullData, saveHomeData } from './build/fullData'
import { saveLookup } from './build/lookup'
import { savePrereqsOf } from './build/prereqs'

main()

async function main() {
  const courses = await prisma.course.findMany({
    orderBy: {
      code: 'asc',
    },
  })

  saveFullData(courses)
  saveHomeData(courses)
  saveLookup(courses)
  savePrereqsOf(courses)
}

export {}
