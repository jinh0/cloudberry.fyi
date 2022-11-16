import {
  DocumentData,
  DocumentSnapshot,
  FirestoreError,
} from 'firebase/firestore'
import { createContext } from 'react'

const UserContext = createContext<{
  user: DocumentSnapshot<DocumentData>
  loading: boolean
  error: FirestoreError
} | null>(null)

export default UserContext
