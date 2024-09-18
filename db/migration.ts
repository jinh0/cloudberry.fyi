import { CURRENT_YEAR } from '@utils/constants';
import prisma from './client'

async function migrate() {
  await prisma.$connect()

  const vsbs = await prisma.vsb.findMany({
    where: {
      year: CURRENT_YEAR
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
