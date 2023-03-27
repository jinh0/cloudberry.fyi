import { writeFile } from 'fs/promises'
import prisma from './client'

async function migrate() {
  await prisma.$connect()

  await writeFile(
    '../utils/course-data.json',
    JSON.stringify(await prisma.course.findMany())
  )

  await prisma.$disconnect()
}

migrate()
