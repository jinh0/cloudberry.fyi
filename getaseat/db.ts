import { WaiterType } from '../typing'
import { initializeApp, cert } from 'firebase-admin/app'
import {
  CollectionReference,
  DocumentReference,
  getFirestore,
  Timestamp,
} from 'firebase-admin/firestore'

const serviceAccount = require('./serviceAccountKey.json')
const app = initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore(app)
const waiters = db.collection('waiters') as CollectionReference<WaiterType>

export async function getPendingWaiters() {
  return await waiters.where('status', '==', 'pending').get()
}

export async function updateWaiter(waiter: DocumentReference<WaiterType>) {
  console.log('Update waiter!')
  await waiter.update({
    status: 'completed',
    ftime: Timestamp.now(),
  })
}

export const Waiter = {
  async new({
    uid,
    email,
    code,
    crn,
  }: Partial<WaiterType>): Promise<DocumentReference<WaiterType>> {
    const attrs: WaiterType = {
      uid,
      email,
      code,
      crn,
      status: 'pending',
      ctime: Timestamp.now(),
      ftime: null,
    }

    return await waiters.add(attrs)
  },
}
