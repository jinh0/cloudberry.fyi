import Waiter from './waiter'

async function main() {
  const waiter = await Waiter.new({
    uid: 'test',
    email: 'lilan0213@yahoo.com',
    code: 'PSYC-213',
    crn: '6262',
  })
}

main()

export {}
