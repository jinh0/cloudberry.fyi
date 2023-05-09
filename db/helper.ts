import { existsSync, mkdirSync } from 'fs'

export function createDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir)
}
