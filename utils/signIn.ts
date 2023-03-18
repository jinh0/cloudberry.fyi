import { getAuth, OAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore'
import { NextRouter } from 'next/router'
import app from './firebase'

const db = getFirestore(app)
const auth = getAuth(app)

const provider = new OAuthProvider('microsoft.com')
provider.setCustomParameters({
  prompt: 'consent',
  login_hint: 'john.doe@mail.mcgill.ca', // Restricts sign-in's to McGill emails
})

export function signIn(router: NextRouter) {
  signInWithPopup(auth, provider)
    .then(async result => {
      // User is signed in.
      const { user } = result

      // Get document associated with user
      const docRef = await getDoc(doc(db, 'users', user.uid))

      // If document doesn't exist, i.e., first time signing in,
      // create a document for the user
      if (!docRef.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          saved: [],
          completed: [],
          current: [],
          degree: [],
        })
      }

      // Redirect to homepage
      router.push('/')
    })
    .catch(error => {
      // Handle error.
      console.log(error)
    })
}
