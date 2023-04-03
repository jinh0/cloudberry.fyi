import prisma from './client'

async function migrate() {
  await prisma.$connect()

  await prisma.vsb.updateMany({
    where: {},
    data: {
      year: 2022,
      semester: 'winter',
    },
  })

  await prisma.$disconnect()
}

migrate()
