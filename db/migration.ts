import prisma from './client'

async function migrate() {
  await prisma.$connect()

  const vsbs = await prisma.vsb.findMany({
    where: {
      year: 2023
    }
  });

  for (const x of vsbs) {
    console.log(x.code);

    await prisma.vsb.update({
      where: { id: x.id },
      data: {
        blocks: x.blocks.map(block => ({...block, capacity: block.remainingSeats }))
      }
    })
  }

  await prisma.$disconnect()
}

migrate()
