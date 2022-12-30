/**
 * @file User data context
 */

import { UserType } from '@typing'
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
  user: DocumentSnapshot<UserType>
  loading: boolean
  error: FirestoreError
} | null>(null)

export default UserContext
