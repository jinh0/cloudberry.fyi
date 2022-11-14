import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { UserType } from '@typing'
import { auth, db } from '@utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import UserContext from '@contexts/UserContext'

export default function App({ Component, pageProps }: AppProps) {
  // Global User Context:
  // Since querying for the user document depends on the
  // auth state, we have to use this roundabout asynchronous
  // call using useEffect.
  //
  // TL;DR user data context for all pages
  const [user, setUser] = useState<UserType>(null)
  const [loggedIn] = useAuthState(auth)

  useEffect(() => {
    const getUser = async (uid: string) => {
      const ref = await getDoc(doc(db, 'users', uid))
      setUser({ ...ref.data(), id: ref.id } as UserType)
    }

    if (loggedIn) {
      getUser(loggedIn.uid)
    }
  }, [loggedIn])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
