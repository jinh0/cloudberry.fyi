import app from '@utils/firebase'
import { getAuth, OAuthProvider, signInWithPopup } from 'firebase/auth'

const provider = new OAuthProvider('microsoft.com')
provider.setCustomParameters({
  prompt: 'consent',
})

const Login = () => {
  const auth = getAuth(app)

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => console.log(result.user))
      .catch((error) => console.log('Error', error))
  }

  return (
    <div>
      <p className='text-xl'>Login</p>

      <button onClick={signIn} className='border'>
        Sign in with Microsoft!!!
      </button>
    </div>
  )
}

export default Login
