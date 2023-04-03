import prisma from '@db/client'
import { writeFile } from 'fs/promises'

export async function saveVSB() {
  const vsbs = await prisma.vsb.findMany()

  await writeFile('public/vsb-data.json', JSON.stringify(vsbs))
}
