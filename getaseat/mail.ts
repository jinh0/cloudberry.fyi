import { WaiterType, Safe } from '@typing'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { createTransport } from 'nodemailer'

let transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'cloudberry.fyi@gmail.com',
    pass: process.env.GMAIL_PASSWORD,
  },
})

export async function alertWaiter({
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
