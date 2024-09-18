import dotenv from 'dotenv'
import { Waiter } from './db'
import { processAllPending } from './process'

dotenv.config()

async function main() {
  console.log(`[${(new Date()).toISOString()}] getaseat started.`)
  processAllPending()
}

main()

export {}
