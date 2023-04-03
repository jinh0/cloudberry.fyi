import prisma from './client'

async function migrate() {
  await prisma.$connect()

  await prisma.$disconnect()
}

migrate()
