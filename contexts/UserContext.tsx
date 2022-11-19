/**
 * @file User data context
 */

import {
  DocumentData,
  DocumentSnapshot,
  FirestoreError,
} from 'firebase/firestore'
import { createContext } from 'react'

/**
 * Context containing Firebase user data
 */
const UserContext = createContext<{
  user: DocumentSnapshot<DocumentData>
  loading: boolean
  error: FirestoreError
} | null>(null)

export default UserContext
