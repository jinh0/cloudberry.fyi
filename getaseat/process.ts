import { VSBCourse, Safe, WaiterType } from '../typing'
import { getCourse } from '../utils/vsbScraper'
import { getPendingWaiters, updateWaiter } from './db'
import { alertWaiter } from './mail'

export async function processAllPending() {
  const mem = new Map<string, VSBCourse>()

  async function getCachedCourse(code: string): Promise<Safe<VSBCourse>> {
    if (mem.has(code)) return { isOk: true, result: mem.get(code) }

    const course = await getCourse(code as Uppercase<string>)

    if (!course.isOk) return { isOk: false }

    const vsb = course.result
    mem.set(vsb.code, vsb)

    return { isOk: true, result: vsb }
  }

  let pendingWaiters = await getPendingWaiters()

  pendingWaiters.forEach(async waiter => {
    const { code, crn, email } = waiter.data()
    console.log('Email: ', email, 'Code: ', code)

    const course = await getCachedCourse(code)
    if (!course.isOk) return

    const vsb = course.result
    const block = vsb.blocks.find(block => block.crn === crn)
    console.log('Remaining seats: ', block.remainingSeats)
    if (block.remainingSeats > 0) {
      console.log('hello?')
      const { isOk } = await alertWaiter({ code, crn, waiter })
      if (isOk) updateWaiter(waiter.ref)
    }
  })
}
