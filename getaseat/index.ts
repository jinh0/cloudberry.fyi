import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'
import { getCourse } from '../utils/vsbScraper'
import { db } from '../utils/firebase'
import {
  getDocs,
  query,
  QueryDocumentSnapshot,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { Safe, VSBCourse, WaiterType } from '../typing'

dotenv.config()

let transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'cloudberry.fyi@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
})

processAllPending()

async function processAllPending() {
  const mem = new Map<string, VSBCourse>()

  async function getCachedCourse(code: string): Promise<Safe<VSBCourse>> {
    if (mem.has(code)) return { isOk: true, result: mem.get(code) }

    const course = await getCourse(code as Uppercase<string>)

    if (!course.isOk) return { isOk: false }

    const vsb = course.result
    mem.set(vsb.code, vsb)

    return { isOk: true, result: vsb }
  }

  let pendingWaiters = await getDocs(
    query(db.waiters, where('status', '==', 'pending'))
  )

  pendingWaiters.forEach(async waiter => {
    const { code, crn } = waiter.data()
    const course = await getCachedCourse(code)
    if (!course.isOk) return

    const vsb = course.result
    const block = vsb.blocks.find(block => block.crn === crn)
    if (block && block.remainingSeats > 0) {
      const { isOk } = await alertWaiter({ code, crn, waiter })
      if (isOk) updateWaiter(waiter)
    }
  })
}

async function alertWaiter({
  code,
  crn,
  waiter,
}: {
  code: string
  crn: string
  waiter: QueryDocumentSnapshot<WaiterType>
}): Promise<Safe<void>> {
  const display = (code: string) => code.replace('-', ' ')

  const { email } = waiter.data()

  try {
    await transporter.sendMail({
      from: 'cloudberry.fyi@gmail.com',
      to: email,
      subject: `${display(
        code
      )} (CRN: ${crn}) has an available seat. Register now.`,
      text: `Hi! You requested an alert for when ${display(
        code
      )} has an availability. Have a good day.`,
    })

    return { isOk: true, result: null }
  } catch {
    return { isOk: false }
  }
}

async function updateWaiter(waiter: QueryDocumentSnapshot<WaiterType>) {
  await updateDoc(waiter.ref, {
    status: 'completed',
    ftime: Timestamp.now(),
  })
}

export {}
