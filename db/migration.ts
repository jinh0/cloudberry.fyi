import prisma from './client'
import courses from '@utils/courses'

async function migrate() {
  await prisma.$connect()

  await prisma.course.createMany({
    data: courses.map(x => ({
      ...x,
      name: undefined,
      title: x.name,
      year: 2022,
    })),
  })

  await prisma.$disconnect()
}

migrate()
