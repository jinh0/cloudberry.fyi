import { readFile } from 'fs/promises'

export async function readJSON(fileName: string) {
  const file = await readFile(fileName)
  return JSON.parse(file.toString('utf8'))
}
