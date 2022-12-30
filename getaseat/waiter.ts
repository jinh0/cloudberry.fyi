import { WaiterType } from '../typing'
import { db } from '../utils/firebase'
import { addDoc, DocumentReference, Timestamp } from 'firebase/firestore'

const Waiter = {
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

    return await addDoc(db.waiters, attrs)
  },
}

export default Waiter
