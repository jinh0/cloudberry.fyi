import prisma from './client'
import courses from 'webscraper/data/2022/course-titles.json'

async function migrate() {
  await prisma.$connect()

  console.log(Object.keys(courses).length)

  let x = 0

  Object.keys(courses).forEach(async code => {
    const course = await prisma.vsb.findFirst({
      where: {
        code,
      },
    })

    if (course === null) {
      x++
      console.log(code)
    }
  })

  await prisma.$disconnect()
}

migrate()
