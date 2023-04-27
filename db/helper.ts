import { existsSync, mkdirSync } from 'fs'

export function initDir(dir: string) {
  if (!existsSync(dir)) mkdirSync(dir)
}
