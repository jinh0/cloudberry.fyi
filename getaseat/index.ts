import dotenv from 'dotenv'
import { Waiter } from './db'
import { processAllPending } from './process'

dotenv.config()

async function main() {
  // await Waiter.new({
  // uid: 'jDmhJrn5rRVz8Za2rlkFqATZkfy2',
  // email: 'lilan.forsyth@mail.mcgill.ca',
  // code: 'PSYC-212',
  // crn: '4647',
  // })

  processAllPending()
}

main()

export {}
