/**
 * /utils/firebase.ts:
 * Firebase app instance + auth + database
 */

import { UserType, WaiterType } from '@typing'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  collection,
  CollectionReference,
  getFirestore,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDDDqI5v2qKMPuo5lQ_BnP6hEyWboEsCrc',
  authDomain: 'cloudberry-15856.firebaseapp.com',
  projectId: 'cloudberry-15856',
  storageBucket: 'cloudberry-15856.appspot.com',
  messagingSenderId: '605064968074',
  appId: '1:605064968074:web:603747bbca2c7476e3ba73',
  measurementId: 'G-R55ZBG9Z88',
}

const app = initializeApp(firebaseConfig)

export const firestore = getFirestore(app)

export const db = {
  users: collection(firestore, 'users') as CollectionReference<UserType>,
  waiters: collection(firestore, 'waiters') as CollectionReference<WaiterType>,
}
export const auth = getAuth(app)

export default app
