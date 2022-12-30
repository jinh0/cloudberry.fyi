import dotenv from 'dotenv'
import { Waiter } from './db'
import { processAllPending } from './process'

dotenv.config()

async function main() {
  processAllPending()

  // await Waiter.new({
  //   uid: 'jDmhJrn5rRVz8Za2rlkFqATZkfy2',
  //   email: 'lilan.forsyth@mail.mcgill.ca',
  //   code: 'PSYC-213',
  //   crn: '4648',
  // })
}

main()

export {}
