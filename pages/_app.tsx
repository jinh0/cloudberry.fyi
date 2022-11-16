import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '@utils/firebase'
import { doc } from 'firebase/firestore'
import UserContext from '@contexts/UserContext'
import { useDocument } from 'react-firebase-hooks/firestore'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  const [loggedIn] = useAuthState(auth)
  const [user, loading, error] = useDocument(
    loggedIn ? doc(db, 'users', loggedIn.uid) : null
  )

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <Script
          strategy='lazyOnload'
          src='https://www.googletagmanager.com/gtag/js?id=G-4HB680742L'
        ></Script>
        <Script strategy='lazyOnload' id='analytics'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4HB680742L');
          `}
        </Script>
      </Head>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
